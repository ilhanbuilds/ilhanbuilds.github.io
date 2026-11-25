/* global document, IdleRules */
(() => {
  'use strict';
  const accounts = new Map([
    ['Portfolyo', { password: 'demo', state: IdleRules.createPlayer() }],
  ]);
  let player = IdleRules.createPlayer();
  let name = 'Portfolyo';
  let attempts = 1;
  let registrationAttempts = 1;
  const find = (id) => document.getElementById(id);
  function screen(id) {
    document.querySelectorAll('.panel').forEach((panel) => {
      panel.hidden = panel.id !== id;
    });
    const panel = find(id);
    panel.querySelector('input, button')?.focus({ preventScroll: true });
  }
  function render() {
    const data = {
      money: `Para = ${player.money}`,
      name: `/${name}`,
      rebirth: `Rebirth = ${player.rebirth}`,
      prestige: `Prestige = ${player.prestige}`,
      multiplier: `${(player.rebirthMultiplier * player.prestigeMultiplier).toFixed(1)}x Carpan`,
    };
    document.querySelectorAll('[data-stat]').forEach((element) => {
      element.textContent = data[element.dataset.stat];
    });
    find('power').textContent =
      `${10 - player.powerStock}/10 - Güc\n>${player.powerStock > 0 ? `${player.powerPrice} Para` : 'FULL'}<`;
    find('rebirth').textContent =
      `${player.rebirth}/25 - Rebirth\n>${player.rebirthStock > 0 ? `${player.rebirthPrice} Para/10 Güc` : 'FULL'}<`;
    find('prestige').textContent =
      `${player.prestige}/Sonsuz - Prestige\n>${player.prestigePrice} Para/10 Güc/25 Rebirth<`;
  }
  document.querySelectorAll('[data-screen]').forEach((button) => {
    button.addEventListener('click', () => screen(button.dataset.screen));
  });
  find('exit').addEventListener('click', () => screen('closed'));
  find('game-exit').addEventListener('click', () => screen('menu'));
  find('register-button').addEventListener('click', () => {
    const username = find('register-name').value.trim();
    const password = find('register-password').value;
    if (!username || !password || /[\s/]/.test(username)) {
      find('register-message').textContent =
        'Ad ve şifre giriniz. Kullanıcı adı boşluk veya / içeremez.';
    } else if (accounts.has(username)) {
      find('register-message').textContent =
        `Kullanıcı adı bulunuyor lütfen başka bir kullanıcı adı seçiniz. <${registrationAttempts++}. deneme>`;
    } else {
      accounts.set(username, { password, state: IdleRules.createPlayer() });
      find('register-message').textContent = 'Kayıt başarılı!';
      find('login-name').value = username;
      find('login-password').value = password;
      find('register-password').value = '';
    }
  });
  find('login-button').addEventListener('click', () => {
    const username = find('login-name').value;
    const account = accounts.get(username);
    if (!account || account.password !== find('login-password').value) {
      find('login-message').textContent =
        `Kullanici adi ve/veya sifre yanlis. <${attempts++}. deneme>`;
      return;
    }
    name = username;
    player = { ...account.state };
    render();
    screen('game');
  });
  find('click').addEventListener('click', () => {
    player = IdleRules.click(player);
    render();
  });
  find('market-button').addEventListener('click', () => {
    find('market-message').textContent = '';
    render();
    screen('market');
  });
  for (const [id, purchase] of [
    ['power', IdleRules.buyPower],
    ['rebirth', IdleRules.buyRebirth],
    ['prestige', IdleRules.buyPrestige],
  ]) {
    find(id).addEventListener('click', () => {
      const result = purchase(player);
      player = result.state;
      render();
      find('market-message').textContent = result.message;
    });
  }
  find('market-back').addEventListener('click', () => {
    accounts.get(name).state = { ...player };
    render();
    screen('game');
  });
})();
