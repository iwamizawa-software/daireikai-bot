(async function () {

  var LIMIT = 60 * 60 * 1000;
  var VERSION = 19;
  var MAX_LOG = 500;
  var API_URL = 'https://sub-chat.onrender.com/bot';

  try {
    var daireikaiKujiArguments = JSON.parse(await Bot.decrypt('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'));
    var seminarContents = JSON.parse(await Bot.decrypt('DW+Gs3TJ1bzxvfYP1zM1ZmLGfTMyHcv069lI7+hfmrypMg5AJlo1An86HnKYC0pbSS3Q1eXhtnQI+ZOrWumjzUCssXviP5x6BRxbR45xI11/gXjfazjJEcFTiY4tYJK+YQbFemA5'));
    var apiPassword = await Bot.decrypt('ErAWRVY205Yq/b/qbnTIL4fXtoNTqK5gRvC6HoAG/r1t4883SX6rNMy7WdaLca3D2U+lAe1SZDfMWvbADLig0+3shwNpfJx4ML47K4DL');
    var daireikaiWebhook = await Bot.decrypt('I6hesiVy+86glz0Kx9xkArEIM3gdnHpSEEbH+yrWj/weI5reNeh26QUacCM0WSoIobS/p0wKRV20XGANNcDRPXx4JbiqB/jhKi0RybQing8aHjHj2JNumH86Z4+OtSx020A+8Dsb9T4xc3fA4zAiVQ5hxhIf5EsnrC1NGNq4goJUVFGR7NMQvSFZIwVYf0egMxWtDSpdPLdQ/vT9m6PUgzRhVgy/os4=');
  } catch (err) {
    setTimeout(() => Bot.stat('大霊界BOT起動失敗'), 5000);
    return;
  }
  var fumieContents = [
    '暗い人は最強です',
    'みんとは正しいです',
    '大霊界はホンモノです',
  ];
  var denyList = new Set();
  
  var isSasuga = () => location.hash === '#/room/20';
  
  var ddc = window.daireikaiDataChannel || new BroadcastChannel('daireikaiData');
  window.daireikaiDataChannel = ddc;
  var tamashiiLoad = async () => {
    if (isSasuga()) {
      var daireikaiData = await (await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        method: 'get', password: apiPassword, key: 'daireikaiBot'
      })})).json();
      var sendDaireikaiData = () => ddc.postMessage({ type: 'send', daireikaiData });
      setTimeout(sendDaireikaiData, 5000);
      ddc.onmessage = event => {
        if (event.data?.type === 'req')
          sendDaireikaiData();
      };
    } else {
      var daireikaiData = await new Promise(resolve => {
        ddc.onmessage = event => {
          if (event.data?.type === 'send')
            resolve(event.data.daireikaiData);
        };
        setTimeout(() => ddc.postMessage({ type: 'req' }), 15 * 60000);
      });
    }
    if (!(daireikaiData && daireikaiData.userDataMap && daireikaiData.seasonData)) {
      setTimeout(() => Bot.stat('魂ロード失敗'), 4000);
      throw new Error('魂ロード失敗');
    }
    window.seasonData = daireikaiData.seasonData;
    window.userDataMap = daireikaiData.userDataMap;
    // setTimeout(() => Bot.stat('ロード' + Math.floor(daireikaiData.time / 1000).toString(36)), 5000);
    setTimeout(() => Bot.set({ x: 74.76, y: 38.52, stat: '通常' }), 4000);
  };
  var saveTimer = null;
  var tamashiiSave = forced => {
    if (!isSasuga() || (!forced && saveTimer !== null))
      return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveTimer = null;
      fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        method: 'set', password: apiPassword, key: 'daireikaiBot', value: { time: Date.now(), seasonData, userDataMap }
      })});
    }, forced ? 0 : 5 * 60000);
  };
  
  var tamashiiLogs = [];
  var logTamashii = (userData, note) => {
    var log = Object.assign({timestamp: (new Date()).toLocaleString(), note}, userData);
    delete log.name;
    delete log.shortName;
    delete log.achievementMap;
    log.achievements = Object.keys(userData.achievementMap || {}).join(',');
    tamashiiLogs.push(log);
    tamashiiLogs.splice(0, tamashiiLogs.length - MAX_LOG);
  };

  var nonCommandLogs = [];
  var logNonCommand = ({id, fullName, cmt} = {}) => {
    if (cmt?.startsWith('***'))
      return;
    nonCommandLogs.push({timestamp: (new Date()).toLocaleString(), id, fullName, cmt});
    nonCommandLogs.splice(0, nonCommandLogs.length - MAX_LOG);
  };

  var statLogs = [];
  var logStat = ({id, fullName, stat} = {}) => {
    statLogs.push({timestamp: (new Date()).toLocaleString(), id, fullName, stat});
    statLogs.splice(0, statLogs.length - MAX_LOG);
  };
  
  if (window.seasonData && window.userDataMap) {
    window.seasonData = structuredClone(seasonData);
    window.userDataMap = structuredClone(userDataMap);
  } else {
    setTimeout(() => Bot.stat('魂ロード待ち'), 2000);
    await tamashiiLoad();
  }
  
  var getUserData = (user, name, recursion) => {
    var id = typeof user === 'string' ? user : (user.kuro || user.shiro);
    var userData = userDataMap[id] || (userDataMap[id] = {id, tamashii: 0});
    if (!recursion && userData.original)
      return getUserData(userData.original, user.name, true);
    var time = Math.floor(Date.now() / LIMIT);
    if (userData.time !== time) {
      userData.time = time;
      userData.count = Math.max(5, userData.count || 0);
    }
    if (name = name || user.name) {
      userData.shortName = name.replace(/◇.{6}$/, '');
      userData.name = userData.shortName + id;
    }
    if (!userData.achievementMap)
      userData.achievementMap = {};
    if (!userData.nCount)
      userData.nCount = 0;
    if (!userData.urami)
      userData.urami = 0;
    return userData;
  };
  
  var userRank;
  var sortRank = () => userRank = Object.values(userDataMap).filter(u => !u.original).sort((a, b) => b.tamashii - a.tamashii);
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
    tamashiiSave();
  };
  
  var formatPoint = n => `(${(n >= 0 ? '+' : '') + n})`;
  var formatStatText = (name, text) => (name || '名無').slice(0, 20 - text.length) + text;
  
  var unlockAchievement = (userData, achievementName, options = {}) => {
    if (userData.achievementMap[achievementName])
      return;
    userData.achievementMap[achievementName] = Date.now();
    if (options.addTamashii)
      userData.tamashii += options.addTamashii;
    if (options.addCount)
      userData.count += options.addCount;
    Bot.comment(`${userData.shortName} 実績解除:${achievementName}` + (options.addTamashii ? formatPoint(options.addTamashii) : '') + (options.addCount ? ` (MP${userData.count})` : ''));
  };
  var showAchievements = userData => Bot.comment(`${userData.shortName}の実績:` + Object.keys(userData.achievementMap).join(',') + ` (MP${userData.count})`);
  showAchievements.cost = showAchievements.muteCost = 1;
  var showAchievementHolders = (userData, {name} = {}) => Bot.comment(`${name}達成者:` + userRank.filter(d => d.achievementMap?.hasOwnProperty(name)).map(d => d.shortName || d.id).join(',') + ` (MP${userData.count})`);
  showAchievementHolders.cost = showAchievementHolders.muteCost = 1;
  
  var kuji = userData => {
    var r = Bot.kuji(...daireikaiKujiArguments).slice();
    var add = r.shift();
    var text = r[Math.floor(Math.random() * r.length)];
    Bot.comment(`${userData.shortName}[${text}]${formatPoint(add)} (MP${userData.count})`);
    userData.tamashii += add;
    if (text.startsWith('ほぉ～'))
      unlockAchievement(userData, 'ほろべソング', {addCount: 2});
    onTamashiiChange();
  };
  kuji.cost = kuji.muteCost = 1;
  var rank = (userData, {mute}) => {
    var n = userRank.indexOf(userData) + 1;
    if (mute)
      Bot.stat(formatStatText(userData.shortName, ` ${n <= 0 ? '圏外' : n + '位'} ${userData.tamashii}`));
    else
      Bot.comment(`${userData.name}(${userData.tamashii})のランクは${n <= 0 ? '圏外' : n + '位'}です (MP${userData.count})`);
  };
  rank.cost = 1;
  rank.muteCost = 0;
  var ranking = userData => Bot.comment('タマシイTOP3:' + userRank.slice(0, 3).map(d => `${d.shortName}(${d.tamashii})`).join(', ') + ` (MP${userData.count})`);
  ranking.cost = ranking.muteCost = 1;
  var nanni = (userData, {n, mute}) => userRank[n - 1] ? rank(userRank[n - 1], {mute}) : Bot.stat(n + '位は居ない');
  nanni.cost = 1;
  nanni.muteCost = 0;
  var season = (userData, {n}) => Bot.comment(`シーズン${n}タマシイTOP5:` + seasonData[n].slice(0, 5).map(d => `${d.shortName}(${d.tamashii})`).join(', ') + ` (MP${userData.count})`);
  season.cost = season.muteCost = 1;
  
  var kyuusai = async (userData, {alias}) => {
    Bot.comment(`みんと「${userData.shortName}の魂(${userData.tamashii})を僕のｶｳﾝｾﾘﾝｸﾞでｱｾﾝｼｮﾝする？」10秒以内 数字回答 1.する 2.しない`);
    bc.postMessage([userData]);
    var ans = +(await listenTo(/^[12]$/, alias || userData.id, 10000, true));
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
  
  var poker = async (userData, {bet, mute, alias}) => {
    var waitForInput = mute ? waitForStat : listenTo;
    var maxBet = Math.min(userData.tamashii, 50);
    if (!bet) {
      if (mute)
        Bot.stat('何BET?');
      else
        Bot.comment(`BETする魂を1～${maxBet}の間で10秒以内に回答`);
      bc.postMessage([userData]);
    }
    bet = Math.min(maxBet, bet || +(await waitForInput(/^[1-9]\d*$/, alias || userData.id, 10000, true)));
    if (!bet) {
      if (mute)
        Bot.stat('時間切れ MP' + userData.count);
      else
        Bot.comment(`時間切れ ${userData.shortName}は決断できなかった (MP${userData.count})`);
      return;
    }
    userData.tamashii -= bet;
    var deck = Cards(1).shuffle();
    var hand = deck.draw(5);
    if (mute)
      Bot.stat(hand.toCardStrings().join(' '));
    else
      Bot.comment(hand.toCardStrings().map(s => '[' + s + ']').join(' ') + ' 30秒以内 残す札を数字で指定 0で全捨て');
    bc.postMessage([userData]);
    var time = Date.now();
    var input = null;
    if (mute) {
      input = (await waitForInput(/^[0-6]+$/, alias || userData.id, 30000, true)) || '12345';
      if (input.includes('6')) {
        Bot.comment(hand.toCardStrings().map(s => '[' + s + ']').join(' '));
        input = null;
      }
    }
    if (input === null)
      input = (await waitForInput(/^[0-5]+$/, alias || userData.id, 30000 - Date.now() + time, true)) || '12345';
    var hold = input.includes('0') ? '' : input.replace(/[12345]/g, n => n - 1);
    var remove = '01234'.split('').filter(n => !hold.includes(n));
    hand.removeAt(remove).append(deck.draw(remove.length));
    var handRank = hand.getHandRank() || 'はずれ';
    var rate = {
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
    }[handRank];
    var add = rate * bet;
    if (mute) {
      var shortHandRank = {
        'ファイブカード': '5C',
        'ロイヤルフラッシュ': 'RF',
        'ストレートフラッシュ': 'SF',
        'フォーカード': '4C',
        'フルハウス': 'FH',
        'フラッシュ': 'Fl',
        'ストレート': 'St',
        'スリーカード': '3C',
        'ツーペア': '2P',
        'ワンペア': '1P',
        'はずれ': 'No'
      }[handRank];
      Bot.stat(hand.toCardStrings().join('') + ' ' + shortHandRank + '+' + add);
    } else
      Bot.comment(hand.toCardStrings().map(s => '[' + s + ']').join(' ') + ` ${handRank}(+${add}) (MP${userData.count})`);
    userData.tamashii += add;
    if (rate > 3)
      unlockAchievement(userData, handRank);
    onTamashiiChange();
  };
  poker.cost = 2;
  poker.muteCost = 1;
  
  var seminar = userData => {
    var text = seminarContents[Math.floor(Math.random() * seminarContents.length)];
    var tax = Math.min(700, Math.floor(userData.tamashii * 0.1));
    userData.tamashii -= tax;
    Bot.comment(`${userData.shortName}は魂${tax}を支払い、みんと主催${text}セミナーを受講した 利益は4位以下に分配された (MP${userData.count})`);
    var end = userRank.findIndex(userData => userData.tamashii <= 0);
    if (end < 0)
      end = userRank.length;
    var length = end - 3;
    if (length > 0) {
      var add = Math.floor(tax / length);
      var recipients = userRank.slice(3, end);
      recipients.forEach(d => d.tamashii += add);
      bc.postMessage(recipients);
      unlockAchievement(userData, '慈善家');
    }
    onTamashiiChange();
  };
  
  var ebumi = async (userData, {alias}) => {
    var fumie = fumieContents[Math.floor(Math.random() * fumieContents.length)];
    Bot.comment(`江戸幕府は絵踏みを実施した 30秒以内に ${fumie} と"発言"しなければ魂が半分となる`);
    bc.postMessage([userData]);
    if (await listenTo(fumie, alias || userData.id, 30000)) {
      Bot.comment(`${userData.shortName}は保身に走った(+0) (MP${userData.count})`);
    } else {
      var add = -Math.floor(userData.tamashii / 2);
      Bot.comment(`${userData.shortName}は名誉を保った(${add}) (MP${userData.count})`);
      userData.tamashii += add;
      unlockAchievement(userData, '屈しない人');
      onTamashiiChange();
    }
  };

  var poron = async (userData, {mute}) => {
    if (mute) {
      Bot.stat('ぽろんゲーム開始');
    } else {
      Bot.comment(`全員参加可 状態：を使い1～100のランダムな数を1番先に当てる 40秒以内 (MP${userData.count})`);
      Bot.stat('？');
    }
    var answer = Math.floor(Math.random() * 100) + 1;
    console.log('poron game:' + answer);
    var rank = [1000, 100, 50, 25, 12];
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
    if (!mute)
      Bot.stat('通常');
    if (winner) {
      var winnerData = getUserData(winner);
      var add = (rank[guessCount] || 10) * players.size;
      if (mute)
        Bot.stat(formatStatText(winnerData.shortName, ` 答${answer} +${add}`));
      else
        Bot.comment(`${winnerData.shortName}正解 ${answer}でした(+${add})`);
      winnerData.tamashii += add;
      if (guessCount === 0)
        unlockAchievement(winnerData, '名誉ぽろん人');
      if (userData !== winnerData) {
        bc.postMessage([winnerData]);
        logTamashii(winnerData, 'poronWinner');
      }
      onTamashiiChange();
    } else {
      Bot[mute ? 'stat' : 'comment']('答えは' + answer + 'でした');
    }
  };
  poron.cost = 2;
  poron.muteCost = 1;
  
  var whatifBonus = (userData, bet, hand) => {
    if (hand.includes(-1))
      return 0;
    var handRank = hand.getHandRank();
    var pays = ({
      'ロイヤルフラッシュ': 200,
      'ストレートフラッシュ': 20,
      'フォーカード': 5,
      'フルハウス': 2,
      'フラッシュ': 1
    }[handRank] || 0) * bet;
    if (pays) {
      Bot.comment(handRank + ' +' + pays);
      unlockAchievement(userData, handRank);
    }
    return pays;
  };
  var getWhatifText = (succeeded, field, hand, result = '') => [succeeded, field.toCardStrings()[0] || '**', hand.toCardStrings().join(result ? '' : '　').replace(/Jo/g, '×')].join('｜') + result;
  var whatif = async (userData, {bet, alias}) => {
    var maxBet = Math.min(userData.tamashii, 50);
    if (!bet) {
      Bot.stat('何BET?');
      bc.postMessage([userData]);
    }
    bet = Math.min(maxBet, bet || +(await waitForStat(/^[1-9]\d*$/, alias || userData.id, 10000, true)));
    if (!bet) {
      Bot.stat('時間切れ MP' + userData.count);
      return;
    }
    userData.tamashii -= bet;
    bc.postMessage([userData]);
    var deck = Cards(0).shuffle();
    var hand = deck.draw(5);
    var field = Cards.from([]);
    var selectableIndexes = [0, 1, 2, 3, 4];
    var win = whatifBonus(userData, bet, hand);
    var succeeded = 0;
    do {
      var text = getWhatifText(succeeded, field, hand);
      Bot.stat(text);
      var time = Date.now();
      var resent = false;
      do {
        var input = (await waitForStat(/^[0-6]$/, alias || userData.id, 60000 - Date.now() + time, true)) || '0';
        if (input === '6') {
          if (!resent)
            Bot.comment(text);
          resent = true;
          continue;
        }
        var index = input === '0' ? selectableIndexes[Math.floor(Math.random() * selectableIndexes.length)] : input - 1;
      } while (!selectableIndexes.includes(index));
      field[0] = hand[index];
      hand[index] = deck.length ? deck.shift() : -1;
      selectableIndexes = hand.map((c, i) => c !== -1 && (Math.floor(field[0] / 13) === Math.floor(c / 13) || field[0] % 13 === c % 13) ? i : null).filter(i => i !== null);
      win += whatifBonus(userData, bet, hand);
      succeeded++;
      if (succeeded >= 20) {
        if (succeeded >= 30) {
          if (succeeded >= 40)
            unlockAchievement(userData, 'whatif40達成', {addTamashii: 5000});
          else
            unlockAchievement(userData, 'whatif30達成', {addTamashii: 1000});
        } else
          unlockAchievement(userData, 'whatif20達成', {addTamashii: 100});
      }
    } while (selectableIndexes.length);
    win += [
       0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
       1,  1,  1,  2,  2,  2,  3,  3,  3,  4,
       4,  5,  5,  6,  6,  7,  8,  9, 10, 11,
      12, 13, 14, 15, 16, 17, 18, 19, 20, 22,
      24, 26, 28, 30, 35, 40, 45, 50, 60, 70,
      80, 90, 100
    ][succeeded] * bet;
    Bot.stat(getWhatifText(succeeded, field, hand, win ? '勝ち' : '終了'));
    if (succeeded === 52)
      unlockAchievement(userData, 'whatif制覇', {addTamashii: 10000});
    if (!win)
      return;
    for (var i = 0; i < 3; i++) {
      Bot.comment(`得点${win}でHIGH&LOWに挑戦 20秒以内 状態で回答 0終 1全賭 2半賭`);
      input = +(await waitForStat(/^[012]$/, alias || userData.id, 20000, true));
      if (!input)
        break;
      bet = input === 1 ? win : Math.floor(win / 2);
      win -= bet;
      var hand = Cards(0).shuffle().draw(2);
      var cardStrings = hand.toCardStrings();
      var time = Date.now();
      Bot.stat(`[${cardStrings[0]}] [？]＝0低 1高 2発言`);
      var choice = +(await waitForStat(/^[012]$/, alias || userData.id, 30000, true));
      if (choice === 2) {
        var text = `[${cardStrings[0]}] [？]＝0低 1高`;
        Bot.comment(text);
        Bot.stat(text);
        choice = +(await waitForStat(/^[01]$/, alias || userData.id, 30000 - Date.now() + time, true));
      }
      var dealer = (hand[0] + 12) % 13;
      var player = (hand[1] + 12) % 13;
      var result = dealer > player ? 'LOW' : dealer < player ? 'HIGH' : 'SAME';
      Bot.stat(`[${cardStrings[0]}] [${cardStrings[1]}] ${result}`);
      if (['LOW', 'HIGH'][choice] === result)
        win += bet * 2;
      else
        break;
    }
    if (win) {
      Bot.comment(`${userData.shortName} +${win} (MP${userData.count})`);
      userData.tamashii += win;
      onTamashiiChange();
    }
  };
  whatif.cost = whatif.muteCost = 2;
  
  var nonti = userData => {
    Bot.comment(`うむ (+10) (MP${userData.count})`);
    userData.tamashii += 10;
    userData.nCount++;
    if (userData.nCount >= 10)
      unlockAchievement(userData, '作者に感謝', {addCount: 2});
    onTamashiiChange();
  };
  nonti.cost = nonti.muteCost = 1;
  
  var ntaso = userData => {
    var add = -10;
    if (Math.random() < 1 / 319)
      add = 3180;
    Bot.comment(`どういたしまして ${userData.shortName}${formatPoint(add)} (MP${userData.count})`);
    userData.tamashii += add;
    var nData = getUserData('◆Ntaso.Mads');
    if (add > 0) {
      unlockAchievement(userData, 'ギャンブラー');
      var urami = Math.min(add, userData.urami);
      userData.urami -= urami;
      nData.tamashii -= urami;
    } else {
      userData.urami -= add;
      nData.tamashii -= add;
    }
    if (userData !== nData)
      bc.postMessage([nData]);
    onTamashiiChange();
  };
  ntaso.cost = ntaso.muteCost = 1;
  
  var urami = (userData, {mute}) => {
    if (mute)
      Bot.stat(formatStatText(userData.shortName, ` 恨${userData.urami}`));
    else
      Bot.comment(`${userData.name}のうらみは${userData.urami}です (MP${userData.count})`);
  };
  urami.cost = 1;
  urami.muteCost = 0;
  
  var aliasMap = {};
  var alias = (userData, {aliasTrip}) => {
    if (userData.id === aliasTrip) {
      Bot.comment(`自分自身を別名登録しようとしてますよ (MP${userData.count})`);
      return;
    }
    aliasMap[userData.id] = aliasTrip;
    Bot.comment(`${aliasTrip}でログインして「別名承認${userData.id}」と発言してください (MP${userData.count})`);
  };
  alias.cost = alias.muteCost = 1;
  
  var acceptAlias = (userData, {originalTrip}) => {
    if (aliasMap[originalTrip] !== userData.id) {
      Bot.comment(`${originalTrip}でログインして「別名登録${userData.id}」と発言してください (MP${userData.count})`);
      return;
    }
    userData.original = originalTrip;
    onTamashiiChange();
    Bot.comment(`${userData.id}は${originalTrip}としてログインできます`);
  };
  acceptAlias.cost = acceptAlias.muteCost = 1;

  var cancelAlias = (userData, {alias}) => {
    if (!userDataMap[alias]?.original) {
      Bot.stat('別名じゃない');
      return;
    }
    userDataMap[alias].original = '';
    onTamashiiChange();
    Bot.stat('別名解除完了');
  };
  cancelAlias.cost = cancelAlias.muteCost = 0;
  
  var kinku = userData => {
    Bot.stat(`${userData.shortName.slice(0, 10)} -1000 MP0`);
    userData.tamashii -= 1000;
    userData.count = 0;
    unlockAchievement(userData, 'れたｓ');
    onTamashiiChange();
  };
  kinku.cost = kinku.muteCost = 1;

  var userStatMap = {};
  on('SET', u => {
    if (u.stat === undefined || u.id === Bot.myId)
      return;
    if (!userStatMap[u.id])
      userStatMap[u.id] = {};
    var userStat = userStatMap[u.id];
    userStat.prev = userStat.current;
    userStat.current = u.stat;
    logStat(u);
  });
  
  var tripsByIhash = {};
  var pause = !userRank.length;
  on('*', async (type, attr) => {

    if (pause || attr.id === Bot.myId || !['COM', 'SET'].includes(type) || (!attr.cmt && !attr.stat))
      return;
    
    var user = Bot.users[attr.id];
    var rejectResponse = reason => Bot.stat('×id:' + user.id.slice(0, 3) + ' ' + reason);
    
    if (!user) {
      user = {id: attr.id};
      rejectResponse('no user');
      return;
    }
    if (denyList.has(user.shiro) || denyList.has(user.kuro)) {
      rejectResponse('魂BOT出禁');
      return;
    }
    
    var mute = type === 'SET';
    if (mute && userStatMap[user.id] && userStatMap[user.id].prev === userStatMap[user.id].current)
      return;
    
    var realCmt = mute ? user.stat : user.cmt;
    var cmt = Bot.normalize(realCmt);
    var game, options = {mute};
    if (/^\s*(?:ぽーかー|poker)\s*([1-9]\d?)?\s*$/i.test(cmt)) {
      game = poker;
      if (RegExp.$1)
        options.bet = +RegExp.$1;
    } else if (mute && /^\s*(?:whatif)\s*([1-9]\d?)?\s*$/i.test(cmt)) {
      game = whatif;
      if (RegExp.$1)
        options.bet = +RegExp.$1;
    } else if (/^\s*ぽろんげーむ\s*$/i.test(cmt)) {
      game = poron;
    } else if (/^(?:のんち|むじんくん|nonn?ti)(?:ありがとう|すごい|えらい|偉い|(?:大|だい)?(?:好|す|しゅ|ちゅ)き)$/i.test(cmt)) {
      game = nonti;
    } else if (/^(?:のんち|むじんくん|nonn?ti)(?:[\u3057\u6B7B\u6C0F]ね|[\u3058\u81EA](?:\u5BB3|\u6BBA|\u304C\u3044|\u3055\u3064)しろ)や?$/i.test(cmt)) {
      game = kinku;
    } else if (/^(?:n|えぬ)たそ(?:ありがとう|すごい|えらい|偉い|(?:大|だい)?(?:好|す|しゅ|ちゅ)き)$/i.test(cmt)) {
      game = ntaso;
    } else if (/^(?:大霊界|だいれいかい|魂|たましい)の?(?:籤|くじ)$/.test(cmt)) {
      game = kuji;
    } else if (/^(?:(?:大霊界|だいれいかい|魂|たましい)の?らんく|soulrank)$/i.test(cmt)) {
      game = rank;
    } else if (/^(?:大霊界|だいれいかい|魂|たましい)の?らんきんぐ$/.test(cmt)) {
      game = ranking;
    } else if (/^(?:大霊界|だいれいかい|魂|たましい)の?(?:実績|じっせき)$/.test(cmt)) {
      game = showAchievements;
    } else if (/^(.+)の?(?:達成者|たっせいしゃ)$/.test(realCmt)) {
      game = showAchievementHolders;
      options.name = RegExp.$1;
    } else if (mute && /^(?:大霊界|だいれいかい|魂|たましい)の?(?:第|だい)?([1-9]\d*)(?:位|い)は?(?:だれ|誰)?\??$/.test(cmt)) {
      game = nanni;
      options.n = +RegExp.$1;
    } else if (/^(?:大霊界|だいれいかい|魂|たましい)の?しーずん(\d+)$/.test(cmt)) {
      options.n = RegExp.$1;
      if (!seasonData[options.n]) {
        rejectResponse(`シーズン${options.n}無し`);
        return;
      }
      game = season;
    } else if (/^(?:大霊界|だいれいかい|魂|たましい)の?(?:恨|うら)み$/.test(cmt)) {
      game = urami;
    } else if (/^別名登録\s*(◆.{10,12})\s*$/.test(realCmt)) {
      game = alias;
      options.aliasTrip = RegExp.$1;
    } else if (/^別名承認\s*(◆.{10,12})\s*$/.test(realCmt)) {
      game = acceptAlias;
      options.originalTrip = RegExp.$1;
    } else if (/^別名解除$/.test(realCmt)) {
      game = cancelAlias;
    } else {
      if (!mute)
        logNonCommand(user);
      return;
    }

    if (user.trip) {
      if (!tripsByIhash[user.ihash])
        tripsByIhash[user.ihash] = new Set();
      var trips = tripsByIhash[user.ihash];
      if (trips.size < 3)
        trips.add(user.trip);
      if (!trips.has(user.trip)) {
        rejectResponse('1人3トリップまで');
        return;
      }
    }

    var userData = getUserData(user);
    if (userData.id[0] === '◆' && userData.id !== user.kuro)
      options.alias = user.kuro;
    var cost = game[mute ? 'muteCost' : 'cost'];
    if (userData.count < cost) {
      rejectResponse(userData.count ? `MP${cost}未満` : 'MP0');
      logTamashii(userData, cmt + 'reject' + cost);
      return;
    }
    if ((game === whatif || game === poker) && userData.tamashii <= 0) {
      rejectResponse('魂0以下');
      logTamashii(userData, cmt + 'tamashii0');
      return;
    }
    if (!isSasuga() && game === whatif && (new Date()).getMinutes() < 30) {
      rejectResponse('可能時間' + (new Date()).getHours() + ':30～59');
      logTamashii(userData, cmt + 'whatiftime');
      return;
    }
    if (!mute)
      Bot.stat('通常');
    userData.count -= cost;

    if (game === poker && userRank[0] === userData && Math.random() < 0.05) {
      game = seminar;
      cmt += 'セミナー';
    } else if (game !== kinku && Math.random() < 0.1) {
      var prev = game;
      if (userData.tamashii < -5)
        game = kyuusai;
      else if (userData.tamashii > 0 && userRank.slice(0, 3).includes(userData) && !userData.achievementMap['屈しない人'])
        game = ebumi;
      if (prev !== game)
        cmt += 'レアイベント';
    }
    await game(userData, options);
    bc.postMessage([userData]);
    logTamashii(userData, cmt);
    
  });
  
  var upload = async (obj, fname) => {
    var formData = new FormData();
    formData.append('file', new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' }), fname);
    try {
      await fetch(daireikaiWebhook, {method: 'POST', body: formData});
      Bot.stat('保存成功');
    } catch (err) {
      Bot.stat('保存エラー');
      return false;
    }
    return true;
  };

  on('COM', async user => {
  
    if (user.id === Bot.myId || !['uuuuuuuuoNin', 'bbbbbbbbB.'].includes(user.trip) || !user.cmt)
      return;

    var command = user.cmt.split(/\s+/);
    
    switch (command[0]) {
      case '魂停止':
        Bot.stat((pause = !pause) ? '大霊界BOT停止中' : '通常');
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
        var userData = userDataMap[command[1]];
        if (!userData) {
          Bot.stat('不正失敗');
          break;
        }
        userData[command[2]] = JSON.parse(command[3]);
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
      case '魂ロード':
        await tamashiiLoad();
        break;
      case '魂保存':
        if (!isSasuga()) {
          Bot.stat('流石兄弟でやること');
          return;
        }
        tamashiiSave(true);
        upload({ time: Date.now(), seasonData, userDataMap }, 'tamashii.json');
        break;
      case '魂ログ保存':
        upload(tamashiiLogs, 'tamashii-log.json');
        break;
      case '発言ログ保存':
        upload(nonCommandLogs, 'non-command-log.json');
        break;
      case '状態ログ保存':
        upload(statLogs, 'stat-log.json');
        break;
      case 'ユーザーリスト保存':
        upload(Bot.users, 'user-list.json');
        break;
      case 'ランク保存':
        upload(userRank, 'rank.json');
        break;
      case '魂調査':
        upload(statLogs, 'stat-log.json');
        upload(Object.entries(Bot.listeners).map(([type, listeners]) => [type, listeners.map(listener => Object.assign({listener: (listener + '').slice(0, 100)}, listener))]), 'listeners.json');
        break;
    }
    
  });
  
  if (isSasuga())
    setInterval(() => {
      var userDataList = [...(new Set(Object.values(Bot.users).filter(u => u.id !== Bot.myId).map(u => getUserData(u))))];
      if (!userDataList.length)
        return;
      userDataList.forEach(userData => {
        userData.tamashii += 2;
        logTamashii(userData, '常駐');
      });
      onTamashiiChange();
      bc.postMessage(userDataList);
    }, 15 * 60000);

})();

(() => {

  var botStartTime = new Date();
  on('COM', async user => {
  
    if (user.id === Bot.myId || !['uuuuuuuuoNin', 'bbbbbbbbB.'].includes(user.trip) || !user.cmt)
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
      case 'BOT開始時間':
        Bot.stat(botStartTime.toLocaleString());
        break;
    }
  });
  
  setInterval(async () => {
    var n = +(await (await fetch('https://raw.githubusercontent.com/iwamizawa-software/daireikai-bot/refs/heads/main/reload.txt?t=' + (new Date).getTime())).text());
    if (location.hash === '#/room/' + n)
      location.reload();
  }, 15 * 60000);

})();
// signature:KemmpRu5YXrfeUV+n/izYoC+/D+jElgHFkFtRj6dhH2pZWA2Lzrk4b61XU95JwOhtoMjEDCArAURIv2Rs54l0TMbcYicCmyHxSvtoQnX
