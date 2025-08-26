// タブを１つだけ開きCtrl＋F5でリロードした後これを開発者ツールで1回だけ実行する
(async () => {
  var userDataMap = await Bot.loadAsync('daireikai') || {};
  var a = document.createElement('a');
  a.text = a.download = 'daireikai.json';
  a.href = 'data:application/json;,' + encodeURIComponent(JSON.stringify(await Bot.loadAsync('daireikai') || {}));
  a.click();
  var seasonData = await Bot.loadAsync('daireikaiSeason') || [];
  seasonData.push(Object.values(userDataMap).filter(d => d.tamashii > 0).sort((a, b) => b.tamashii - a.tamashii));
  await Bot.saveAsync('daireikaiSeason', seasonData);
  await Bot.saveAsync('daireikai', {});
  Bot();
})();
