(async function () {

  var LIMIT = 60 * 60 * 1000;
  var VERSION = 7;
  var MAX_LOG = 1000;
  
  var tamashiiLogs = [];
  var logTamashii = (userData, note) => {
    var log = Object.assign({timestamp: (new Date()).toLocaleString(), note}, userData);
    delete log.name;
    delete log.shortName;
    tamashiiLogs.push(log);
    tamashiiLogs.splice(0, tamashiiLogs.length - MAX_LOG);
  };

  var nonCommandLogs = [];
  var logNonCommand = ({id, fullName, cmt} = {}) => {
    nonCommandLogs.push({timestamp: (new Date()).toLocaleString(), id, fullName, cmt});
    nonCommandLogs.splice(0, nonCommandLogs.length - MAX_LOG);
  };
  
  var seasonData = await Bot.loadAsync('daireikaiSeason') || [];
  
  var userDataMap = await Bot.loadAsync('daireikai') || {};
  var getUserData = user => {
    var id = typeof user === 'string' ? user : (user.kuro || user.shiro);
    var userData = userDataMap[id] || (userDataMap[id] = {id, tamashii: 0});
    var time = Math.floor(Date.now() / LIMIT);
    if (userData.time !== time) {
      userData.time = time;
      userData.count = 5;
    }
    if (user.name) {
      userData.shortName = user.name.replace(/◇.{6}$/, '');
      userData.name = userData.shortName + id;
    }
    return userData;
  };
  
  var userRank;
  var sortRank = () => userRank = Object.values(userDataMap).sort((a, b) => b.tamashii - a.tamashii);
  sortRank();
  
  var bc = window.daireikaiChannel || new BroadcastChannel('daireikai');
  window.daireikaiChannel = bc;
  bc.onmessage = event => {
    var rankChanged;
    event.data?.forEach?.(userData => {
      var oldData = getUserData(userData.id);
      if (oldData?.tamashii !== userData.tamashii)
        rankChanged = true;
      Object.assign(oldData, userData);
      logTamashii(userData, 'onmessage');
    });
    if (rankChanged)
      sortRank();
  };
  
  var onTamashiiChange = () => {
    sortRank();
    Bot.saveAsync('daireikai', userDataMap);
  };
  
  var kuji = userData => {
    var r = Bot.kuji(...daireikaiKujiArguments).slice();
    var point = r.shift();
    Bot.comment(`${userData.shortName}[${r[Math.floor(Math.random() * r.length)]}](${(point >= 0 ? '+' : '') + point}) (MP${userData.count})`);
    userData.tamashii += point;
    onTamashiiChange();
  };
  var rank = userData => {
    var n = userRank.indexOf(userData) + 1;
    Bot.comment(`${userData.name}(${userData.tamashii})のランクは${n <= 0 ? '圏外' : n + '位'}です (MP${userData.count})`);
  };
  var ranking = userData => Bot.comment('タマシイTOP3:' + userRank.slice(0, 3).map(d => `${d.shortName}(${d.tamashii})`).join(', ') + ` (MP${userData.count})`);
  var nanni = (userData, {n}) => Bot.comment(`第${n}位は${userRank[--n] ? `${userRank[n].name}(${userRank[n].tamashii})です` : 'いません'} (MP${userData.count})`);
  var season = (userData, {n}) => Bot.comment(`シーズン${n}タマシイTOP5:` + seasonData[n].slice(0, 5).map(d => `${d.shortName}(${d.tamashii})`).join(', ') + ` (MP${userData.count})`);
  
  var kyuusai = async userData => {
    Bot.comment(`みんと「${userData.shortName}の魂(${userData.tamashii})を僕のｶｳﾝｾﾘﾝｸﾞでｱｾﾝｼｮﾝする？」10秒以内 数字回答 1.する 2.しない`);
    bc.postMessage([userData]);
    var ans = +(await listenTo(/^[12]$/, userData.id, 10000, true));
    if (ans === 1) {
      userData.tamashii = 0;
      Bot.comment(`${userData.shortName}はｱｾﾝｼｮﾝした(0にリセット) (MP${userData.count})`);
    } else if (ans === 2) {
      var add = Math.floor(Math.random() * -userData.tamashii * 2);
      userData.tamashii += add;
      Bot.comment(`${userData.shortName}は自分を信じた(+${add}) (MP${userData.count})`);
    } else {
      Bot.comment(`時間切れ ${userData.shortName}は決断できなかった (MP${userData.count})`);
      return;
    }
    onTamashiiChange();
  };
  
  var poker = async (userData, {bet} = {}) => {
    userData.count--;
    var maxBet = Math.min(userData.tamashii, 50);
    if (!bet) {
      Bot.comment(`BETする${userData.shortName}の魂を1～${maxBet}の間で10秒以内に回答`);
      bc.postMessage([userData]);
    }
    bet = Math.min(maxBet, bet || +(await listenTo(/^[1-9]\d*$/, userData.id, 10000, true)));
    if (!bet) {
      Bot.comment(`時間切れ ${userData.shortName}は決断できなかった (MP${userData.count})`);
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
    Bot.comment(hand.toCardStrings().map(s => '[' + s + ']').join(' ') + ` ${handRank}(+${add}) (MP${userData.count})`);
    userData.tamashii += add;
    onTamashiiChange();
  };
  
  var seminar = userData => {
    var text = seminarContents[Math.floor(Math.random() * seminarContents.length)];
    var tax = Math.floor(userData.tamashii * 0.1);
    userData.tamashii -= tax;
    Bot.comment(`${userData.shortName}は魂の10%を支払い、みんと主催${text}セミナーを受講した　利益は4位以下に分配された(${-tax}) (MP${userData.count})`);
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
      Bot.comment(`${userData.shortName}は保身に走った(+0) (MP${userData.count})`);
    } else {
      var add = -Math.floor(userData.tamashii / 2);
      Bot.comment(`${userData.shortName}は名誉を保った(${add}) (MP${userData.count})`);
      userData.tamashii += add;
      onTamashiiChange();
    }
  };

  var poron = async userData => {
    userData.count--;
    Bot.comment(`全員参加可 状態：を使い1～100のランダムな数を1番先に当てる 40秒以内 (MP${userData.count})`);
    Bot.stat('？');
    var answer = Math.floor(Math.random() * 100) + 1;
    var rank = [1000, 100, 50, 25, 12, 6];
    var players = new Set();
    var guessCount = 0;
    var winner;
    var startTime = Date.now();
    while (true) {
      var timeout = 40000 - Date.now() + startTime;
      if (timeout <= 0)
        break;
      var user = await waitForStat(/^(?:[1-9]\d?|100)$/, '', timeout, true, true);
      if (!user)
        break;
      players.add(user.ihash);
      var guess = +Bot.normalize(user.stat);
      if (guess === answer) {
        winner = user;
        break;
      } else
        Bot.stat(guess + 'より' + (guess > answer ? '小さい' : '大きい'));
      guessCount++;
    }
    Bot.stat('通常');
    if (winner) {
      var winnerData = getUserData(winner);
      var add = (rank[guessCount] || 3) * players.size;
      Bot.comment(`${winnerData.shortName}正解 ${answer}でした(+${add})`);
      winnerData.tamashii += add;
      if (userData !== winnerData) {
        bc.postMessage([winnerData]);
        logTamashii(winnerData, 'poronWinner');
      }
      onTamashiiChange();
    } else {
      Bot.comment('答えは' + answer + 'でした');
    }
  };
  
  var nonti = userData => {
    Bot.comment(`うむ ${userData.shortName}(+10) (MP${userData.count})`);
    userData.tamashii += 10;
    onTamashiiChange();
  };
  
  var ntaso = userData => {
    var add = -10;
    if (Math.random() < 1 / 319)
      add = 50 + Math.floor(Math.random() * 51);
    Bot.comment(`どういたしまして ${userData.shortName}(${(add >= 0 ? '+' : '') + add}) (MP${userData.count})`);
    userData.tamashii += add;
    onTamashiiChange();
  };
  
  var kinku = userData => {
    Bot.stat(`${userData.shortName} -1000 MP0`);
    userData.tamashii -= 1000;
    userData.count = 0;
    onTamashiiChange();
  };

  on('COM', async user => {
  
    if (user.id === Bot.myId)
      return;
  
    var rejectResponse = reason => Bot.stat('×id:' + user.id.slice(0, 3) + ' ' + reason);
  
    if (denyList.has(user.shiro) || denyList.has(user.kuro)) {
      rejectResponse('魂BOT出禁');
      return;
    }
    
    var cmt = Bot.normalize(user.cmt);
    var game, options;
    if (/^(?:ぽーかー|poker)\s*([1-9]\d?)?$/i.test(cmt)) {
      game = poker;
      if (RegExp.$1)
        options = {bet: +RegExp.$1};
    } else if (/^ぽろんげーむ$/i.test(cmt))
      game = poron;
    else if (/^(?:のんち|むじんくん|nonn?ti)(?:ありがとう|すごい|えらい|偉い|(?:大|だい)?(?:好|す|しゅ|ちゅ)き)$/i.test(cmt))
      game = nonti;
    else if (/^(?:のんち|むじんくん|nonn?ti)(?:[\u3057\u6B7B\u6C0F]ね|[\u3058\u81EA](?:\u5BB3|\u6BBA|\u304C\u3044|\u3055\u3064)しろ)や?$/i.test(cmt))
      game = kinku;
    else if (/^(?:n|えぬ)たそ(?:ありがとう|すごい|えらい|偉い|(?:大|だい)?(?:好|す|しゅ|ちゅ)き)$/i.test(cmt))
      game = ntaso;
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
      options = {n};
    } else {
      logNonCommand(user);
      return;
    }

    var userData = getUserData(user);
    if (userData.count <= 0) {
      rejectResponse('MP0');
      logTamashii(userData, 'mp0');
      return;
    }

    if (game === poker) {
      if (userData.tamashii <= 5) {
        rejectResponse('魂5以下');
        logTamashii(userData, 'pokerTamashii5');
        return;
      } else if (userData.count < 2) {
        rejectResponse('MP2未満');
        logTamashii(userData, 'pokerCount2');
        return;
      }
    } else if (game === poron && userData.count < 2) {
      rejectResponse('MP2未満');
      logTamashii(userData, 'poronCount2');
      return;
    }

    Bot.stat('通常');
    userData.count--;

    if (game !== kinku && Math.random() < 0.1) {
      if (userData.tamashii < -5)
        game = kyuusai;
      else if (userRank[0] === userData)
        game = seminar;
      else if (userData.tamashii > 0 && userRank.slice(1, 3).includes(userData))
        game = ebumi;
      cmt += 'レアイベント';
    }
    await game(userData, options);
    bc.postMessage([userData]);
    logTamashii(userData, cmt);
    
  });
  
  var upload = async (obj, fname) => {
    var url = await Bot.loadAsync('daireikaiWebhook');
    if (url) {
      var formData = new FormData();
      formData.append('file', new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' }), fname);
      try {
        await fetch(url, {method: 'POST', body: formData});
        Bot.stat('保存成功');
      } catch (err) {
        Bot.stat('保存エラー');
        return false;
      }
    } else {
      Bot.stat('URL未登録');
      return false;
    }
    return true;
  };

  on('COM', async user => {
  
    if (user.id === Bot.myId || !['SOW9cAv7B2', 'bbbbbbbbB.'].includes(user.trip))
      return;

    var command = user.cmt.split(/\s+/);
    
    switch (command[0]) {
      case 'BOT再起動':
        Bot();
        break;
      case 'BOTリロード':
        location.reload();
        break;
      case 'BOT部屋':
        location.href = '#/room/' + (command[1] || 1);
        location.reload();
        break;
      case 'BOT移動':
        var {x, y} = user;
        Bot.set({x, y});
        break;
      case 'BOT通常':
        Bot.stat('通常');
        break;
      case '魂バージョン':
        Bot.stat(VERSION);
        break;
      case '魂出禁':
        if (denyList.has(command[1])) {
          denyList.delete(command[1]);
          Bot.stat('解除完了');
        } else {
          denyList.add(command[1]);
          Bot.stat('出禁完了');
        }
        break;
      case '魂不正':
        var userData = getUserData(command[1]);
        userData[command[2]] = +command[3];
        onTamashiiChange();
        bc.postMessage([userData]);
        Bot.stat('不正完了');
        break;
      case '魂徳政令':
        await upload(userDataMap, 'tamashii.json');
        var n = +command[1] || 0;
        userRank.forEach(d => {
          if (isNaN(d.tamashii) || d.tamashii < n)
            d.tamashii = n;
        });
        onTamashiiChange();
        Bot.stat(`${n}未満徳政令済`);
        break;
      case '魂詫び石':
        await upload(userDataMap, 'tamashii.json');
        var n = +command[1] || 100;
        userRank.forEach(d => d.tamashii += n);
        onTamashiiChange();
        Bot.stat(`詫び石${n}配布済`);
        break;
      case '魂保存':
        upload(userDataMap, 'tamashii.json');
        break;
      case '魂ログ保存':
        upload(tamashiiLogs, 'tamashii-log.json');
        break;
      case '発言ログ保存':
        upload(nonCommandLogs, 'non-command-log.json');
        break;
      case '全保存':
        Bot.stat(await upload(userDataMap, 'tamashii.json') && await upload(tamashiiLogs, 'tamashii-log.json') && await upload(nonCommandLogs, 'non-command-log.json') ? '全保存成功' : '全保存失敗');
        break;
      case '🔒URL登録':
        Bot.saveAsync('daireikaiWebhook', command[1]);
        Bot.stat('登録完了');
        break;
    }
    
  });

})();
