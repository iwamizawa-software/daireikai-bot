(async function () {

  var LIMIT = 60 * 60 * 1000;
  var VERSION = 1;
  
  var seasonData = await Bot.loadAsync('daireikaiSeason') || [];
  
  var userDataMap = await Bot.loadAsync('daireikai') || {};
  var getUserData = id => userDataMap[id] || (userDataMap[id] = {id, tamashii: 0});
  
  var userRank;
  var sortRank = () => userRank = Object.values(userDataMap).filter(d => d.tamashii !== undefined).sort((a, b) => b.tamashii - a.tamashii);
  sortRank();
  
  var bc = window.daireikaiChannel || new BroadcastChannel('daireikai');
  window.daireikaiChannel = bc;
  bc.onmessage = event => {
    var rankChanged;
    event.data?.forEach?.(userData => {
      var oldData = userDataMap[userData.id];
      userDataMap[userData.id] = userData;
      if (oldData?.tamashii !== userData.tamashii)
        rankChanged = true;
    });
    if (rankChanged)
      sortRank();
  };
  
  var onTamashiiChange = () => {
    sortRank();
    Bot.saveAsync('daireikai', userDataMap);
  };
  
  var kuji = userData => {
    var r = Bot.kuji(...daireikaiKujiArguments.slice());
    var point = r.shift();
    Bot.comment(`${userData.shortName}[${r[Math.floor(Math.random() * r.length)]}](${(point >= 0 ? '+' : '') + point}) (残り${userData.count})`);
    userData.tamashii += point;
    onTamashiiChange();
  };
  var rank = userData => {
    var n = userRank.indexOf(userData) + 1;
    Bot.comment(`${userData.name}(${userData.tamashii})のランクは${n <= 0 ? '圏外' : n + '位'}です (残り${userData.count})`);
  };
  var ranking = userData => Bot.comment('タマシイTOP3:' + userRank.slice(0, 3).map(d => `${d.shortName}(${d.tamashii})`).join(', ') + ` (残り${userData.count})`);
  var nanni = (userData, {n}) => Bot.comment(`第${n}位は${userRank[--n] ? `${userRank[n].name}(${userRank[n].tamashii})です` : 'いません'} (残り${userData.count})`);
  var season = (userData, {n}) => Bot.comment(`シーズン${n}タマシイTOP5:` + seasonData[n].slice(0, 5).map(d => `${d.shortName}(${d.tamashii})`).join(', ') + ` (残り${userData.count})`);
  
  var kyuusai = async userData => {
    Bot.comment(`みんと「${userData.shortName}の魂(${userData.tamashii})を僕のｶｳﾝｾﾘﾝｸﾞでｱｾﾝｼｮﾝする？」10秒以内 数字回答 1.する 2.しない`);
    bc.postMessage([userData]);
    var ans = +(await listenTo(/^[12]$/, userData.id, 10000, true));
    if (ans === 1) {
      userData.tamashii = 0;
      Bot.comment(`${userData.shortName}はｱｾﾝｼｮﾝした(0にリセット) (残り${userData.count})`);
    } else if (ans === 2) {
      var add = Math.floor(Math.random() * -userData.tamashii * 2);
      userData.tamashii += add;
      Bot.comment(`${userData.shortName}は自分を信じた(+${add}) (残り${userData.count})`);
    } else {
      Bot.comment(`時間切れ ${userData.shortName}は決断できなかった (残り${userData.count})`);
      return;
    }
    onTamashiiChange();
  };
  
  var poker = async userData => {
    userData.count--;
    var bet = 1;
    var maxBet = Math.min(userData.tamashii, 50);
    Bot.comment(`BETする${userData.shortName}の魂を1～${maxBet}の間で10秒以内に回答`);
    bc.postMessage([userData]);
    bet = Math.min(maxBet, +(await listenTo(/^[1-9]\d*$/, userData.id, 10000, true)));
    if (!bet) {
      Bot.comment(`時間切れ ${userData.shortName}は決断できなかった (残り${userData.count})`);
      return;
    }
    userData.tamashii -= bet;
    var deck = Cards(1).shuffle();
    var hand = deck.draw(5);
    Bot.comment(hand.toCardStrings().map(s => '[' + s + ']').join(' ') + ' 30秒以内 残す札を数字で指定 0で全捨て');
    bc.postMessage([userData]);
    var input = (await listenTo(/^[0-5]+$/, userData.id, 30000, true)) || '';
    var hold = input.includes('0') ? '' : input.replace(/[12345]/g, n => n - 1);
    var remove = '01234'.split('').filter(n => !hold.includes(n));
    hand.removeAt(remove).append(deck.draw(remove.length));
    var handRank = hand.getHandRank() || 'はずれ';
    var add = {
      'ファイブカード': 1000,
      'ロイヤルフラッシュ': 500,
      'ストレートフラッシュ': 100,
      'フォーカード': 20,
      'フルハウス': 10,
      'フラッシュ': 8,
      'ストレート': 5,
      'スリーカード': 3,
      'ツーペア': 2,
      'ワンペア': 1,
      'はずれ': 0
    }[handRank] * bet;
    Bot.comment(hand.toCardStrings().map(s => '[' + s + ']').join(' ') + ` ${handRank}(+${add}) (残り${userData.count})`);
    userData.tamashii += add;
    onTamashiiChange();
  };
  
  var seminar = userData => {
    var text = seminarContents[Math.floor(Math.random() * seminarContents.length)];
    var tax = Math.floor(userData.tamashii / 2);
    userData.tamashii -= tax;
    Bot.comment(`${userData.shortName}は魂の半分を支払い、みんと主催${text}セミナーを受講した　利益は4位以下に分配された(${-tax}) (残り${userData.count})`);
    var end = userRank.findIndex(userData => userData.tamashii <= 0);
    if (end < 0)
      end = userRank.length;
    var length = end - 3;
    if (length > 0) {
      var add = Math.floor(tax / length);
      var recipients = userRank.slice(3, end);
      recipients.forEach(d => d.tamashii += add);
      bc.postMessage(recipients);
    }
    onTamashiiChange();
  };
  
  var ebumi = async userData => {
    var fumie = fumieContents[Math.floor(Math.random() * fumieContents.length)];
    Bot.comment(`江戸幕府は絵踏みを実施した 30秒以内に ${fumie} と発言しなければ魂が半分となる`);
    bc.postMessage([userData]);
    if (await listenTo(fumie, userData.id, 30000)) {
      Bot.comment(`${userData.shortName}は保身に走った(+0) (残り${userData.count})`);
    } else {
      var add = -Math.floor(userData.tamashii / 2);
      Bot.comment(`${userData.shortName}は名誉を保った(${add}) (残り${userData.count})`);
      userData.tamashii += add;
      onTamashiiChange();
    }
  };
  
  var yokubari = async userData => {
    userData.count++;
    Bot.comment('全員参加可 BOTに暗号化を使い40秒以内に1～100で好きな数を発言');
    Bot.comment('その数を得点とする 但し1番大きい数の人は-1倍 1番小さい数の人は-3倍');
    var players = [];
    var startTime = Date.now();
    while (true) {
      var timeout = 40000 - Date.now() + startTime;
      if (timeout <= 0)
        break;
      var user = await listenTo(/^🔒(?:[1-9]\d?|100)$/, '', timeout, true, true);
      if (!user)
        break;
      var playerData = getUserData(user.kuro || user.shiro);
      if (players.some(p => p.data === playerData))
        continue;
      if (playerData.count >= 2) {
        playerData.count -= 2;
        Bot.stat('参加 ' + playerData.shortName);
        bc.postMessage([playerData]);
        players.push({data: playerData, n: +user.cmt.slice(2)});
      } else {
        Bot.stat('×残2未満 ' + playerData.shortName);
      }
    }
    Bot.stat('通常');
    if (!players.length) {
      Bot.comment('誰も参加しなかった 言い出しっぺの残りは0になった');
      userData.count = 0;
      return;
    }
    var offset = [1, 51][Math.floor(Math.random() * 2)];
    while (players.length < 4)
      players.push({data: {shortName: 'bot'}, n: Math.floor(Math.random() * 50) + offset});
    players.sort((a, b) => b.n - a.n);
    for (var i = 1; i < players.length && players[0].n === players[i].n; i++)
      players[i].n *= -1;
    players[0].n *= -1;
    var last = players.at(-1);
    if (last.n > 0) {
      for (var i = players.length - 2; i >= 0 && last.n === players[i].n; i--)
        players[i].n *= -3;
      last.n *= -3;
    }
    Bot.comment('結果:' + players.map(p => `${p.data.shortName}(${p.n})`).join(''));
    players = players.filter(p => p.data.id);
    players.forEach(p => p.data.tamashii += p.n);
    bc.postMessage(players.map(p => p.data));
    onTamashiiChange();
  };

  on('COM', async user => {
  
    var rejectResponse = reason => Bot.stat('×' + user.id.slice(0, 3) + ' ' + reason);
  
    if (denyList.has(user.shiro) || denyList.has(user.kuro)) {
      rejectResponse('魂BOT出禁');
      return;
    }
    
    var cmt = Bot.normalize(user.cmt);
    var game;
    if (/^(?:ぽーかー|poker)$/i.test(cmt))
      game = poker;
    else if (/^(?:欲|よく)[張ば]りげーむ$/i.test(cmt))
      game = yokubari;
    else if (/^(?:大霊界|だいれいかい|魂|たましい)の?(?:籤|くじ)$/.test(cmt))
      game = kuji;
    else if (/^(?:大霊界|だいれいかい|魂|たましい)の?らんく$/.test(cmt))
      game = rank;
    else if (/^(?:大霊界|だいれいかい|魂|たましい)の?らんきんぐ$/.test(cmt))
      game = ranking;
    else if (/^(?:大霊界|だいれいかい|魂|たましい)の?(?:第|だい)?([1-9]\d*)(?:位|い)は?(?:だれ|誰)?\??$/.test(cmt)) {
      game = nanni;
      var options = {n: RegExp.$1};
    } else if (/^(?:大霊界|だいれいかい|魂|たましい)の?しーずん(\d+)$/.test(cmt)) {
      var n = RegExp.$1;
      if (!seasonData[n]) {
        rejectResponse(`シーズン${n}無し`);
        return;
      }
      game = season;
      var options = {n};
    } else
      return;

    var userData = getUserData(user.kuro || user.shiro);
    var time = Math.floor(Date.now() / LIMIT);
    if (userData.time !== time) {
      userData.time = time;
      userData.count = 4;
    } else if (userData.count <= 0) {
      rejectResponse('残0');
      return;
    }

    if (game === poker) {
      if (userData.tamashii <= 5) {
        rejectResponse('魂5以下');
        return;
      } else if (userData.count < 2) {
        rejectResponse('残2未満');
        return;
      }
    } else if (game === yokubari && userData.count < 2) {
      rejectResponse('残2未満');
      return;
    }

    Bot.stat('通常');
    userData.count--;
    userData.shortName = user.name.replace(/◇.{6}$/, '');
    userData.name = userData.shortName + (user.kuro || user.shiro);

    if (Math.random() < 0.1) {
      if (userData.tamashii < -5)
        game = kyuusai;
      else if (userRank[0] === userData)
        game = seminar;
      else if (userData.tamashii > 0 && userRank.slice(1, 3).includes(userData))
        game = ebumi;
    }
    await game(userData, options);
    bc.postMessage([userData]);
    
  });

  on('COM', async user => {
  
    if (!['SOW9cAv7B2', 'bbbbbbbbB.'].includes(user.trip))
      return;

    var command = user.cmt.split(/\s+/);
    
    switch (command[0]) {
      case 'BOT再起動':
        Bot();
        break;
      case 'BOTリロード':
        location.reload();
        break;
      case 'BOT通常':
        Bot.stat('通常');
        break;
      case '魂バージョン':
        Bot.stat(VERSION);
        break;
      case '魂出禁':
        denyList.add(command[1]);
        Bot.stat('出禁完了');
        break;
      case '魂出禁解除':
        Bot.stat(denyList.delete(command[1]) ? '解除完了' : '出禁リストにない');
        break;
      case '魂不正':
        var userData = getUserData(command[1]);
        userData[command[2]] = +command[3];
        onTamashiiChange();
        bc.postMessage([userData]);
        Bot.stat('不正完了');
        break;
    }
    
  });

})();
