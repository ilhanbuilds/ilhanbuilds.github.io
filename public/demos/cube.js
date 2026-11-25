/* global document, window, URLSearchParams */
// Independently authored coordinate simulation. No research engine or model is bundled.
(() => {
  const params = new URLSearchParams(window.location.search);
  const en = params.get('lang') === 'en';
  const copy = en
    ? {
        title: 'Interactive cube simulation',
        disclaimer:
          'Independent browser preview. No AI model or automatic solver is running.',
        turns: 'Turn a face',
        help: 'U: up · D: down · L: left · R: right · F: front · B: back. ′ means inverse. Use face letters on the keyboard; Shift reverses a turn.',
        shuffle: 'Shuffle',
        reset: 'Reset',
        camera: 'View angle',
        left: 'Left',
        right: 'Right',
        up: 'Up',
        down: 'Down',
      }
    : {
        title: 'Etkileşimli küp simülasyonu',
        disclaimer:
          'Bağımsız tarayıcı ön izlemesi. Yapay zekâ modeli veya otomatik çözücü çalıştırılmaz.',
        turns: 'Yüzü çevir',
        help: 'U: üst · D: alt · L: sol · R: sağ · F: ön · B: arka. ′ ters yönü belirtir. Klavyede yüz harfi; Shift ile ters yön.',
        shuffle: 'Karıştır',
        reset: 'Sıfırla',
        camera: 'Bakış açısı',
        left: 'Sola',
        right: 'Sağa',
        up: 'Yukarı',
        down: 'Aşağı',
      };
  document.documentElement.lang = en ? 'en' : 'tr';
  const theme = params.get('theme');
  document.documentElement.dataset.theme =
    theme === 'light' || theme === 'dark'
      ? theme
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  document.title = `RubikRL — ${copy.title}`;
  document.querySelectorAll('[data-copy]').forEach((element) => {
    element.textContent = copy[element.dataset.copy];
  });
  document
    .querySelector('.stage')
    .setAttribute(
      'aria-label',
      en ? 'Rotatable 3D cube' : 'Döndürülebilir 3B küp',
    );
  document
    .querySelector('section')
    .setAttribute('aria-label', en ? 'Cube controls' : 'Küp kontrolleri');
  document
    .querySelector('#notation')
    .setAttribute('aria-label', en ? 'Recent moves' : 'Son hamleler');

  const faces = [
    { name: 'U', axis: 1, sign: 1, color: '#f6f3e9', tilt: 'rotateX(90deg)' },
    { name: 'D', axis: 1, sign: -1, color: '#ffd32c', tilt: 'rotateX(-90deg)' },
    { name: 'L', axis: 0, sign: -1, color: '#ff831d', tilt: 'rotateY(-90deg)' },
    { name: 'R', axis: 0, sign: 1, color: '#de3542', tilt: 'rotateY(90deg)' },
    { name: 'F', axis: 2, sign: 1, color: '#14a46b', tilt: '' },
    { name: 'B', axis: 2, sign: -1, color: '#2378d5', tilt: 'rotateY(180deg)' },
  ];
  const cube = document.querySelector('.cube');
  const slots = [];
  faces.forEach((face, color) => {
    for (let a = -1; a <= 1; a++) {
      for (let b = -1; b <= 1; b++) {
        const position =
          face.axis === 0
            ? [face.sign, a, b]
            : face.axis === 1
              ? [a, face.sign, b]
              : [a, b, face.sign];
        const normal = [0, 0, 0];
        normal[face.axis] = face.sign;
        const tile = document.createElement('span');
        tile.className = 'sticker';
        tile.style.transform = `translate3d(${position[0] * 52 + normal[0] * 26}px,${-position[1] * 52 - normal[1] * 26}px,${position[2] * 52 + normal[2] * 26}px) ${face.tilt}`;
        cube.append(tile);
        slots.push({ position, normal, color, tile });
      }
    }
  });
  const same = (a, b) => a.every((value, index) => value === b[index]);
  let stickers;
  let history;
  let pitch = -24;
  let yaw = -32;
  const camera = () => {
    cube.style.transform = `rotateX(${pitch}deg) rotateY(${yaw}deg)`;
  };
  const render = () => {
    const colors = slots.map((slot) => {
      const sticker = stickers.find(
        (item) =>
          same(item.position, slot.position) && same(item.normal, slot.normal),
      );
      slot.tile.style.setProperty('--color', faces[sticker.color].color);
      slot.tile.dataset.color = String(sticker.color);
      return sticker.color;
    });
    const solved = colors.every((color, index) => color === slots[index].color);
    cube.dataset.state = colors.join('');
    cube.dataset.solved = String(solved);
    document.querySelector('#state').textContent = en
      ? `${solved ? 'Solved' : 'Mixed'} · ${history.length} moves`
      : `${solved ? 'Düzenli' : 'Karışık'} · ${history.length} hamle`;
    document.querySelector('#notation').textContent = history
      .slice(-20)
      .join(' ');
  };
  const reset = () => {
    stickers = slots.map(({ position, normal, color }) => ({
      position: [...position],
      normal: [...normal],
      color,
    }));
    history = [];
    render();
  };
  // A 90-degree integer rotation preserves cubie positions and all sticker normals.
  const quarter = (vector, axis, direction) => {
    const [x, y, z] = vector;
    if (axis === 0) return [x, -direction * z, direction * y];
    if (axis === 1) return [direction * z, y, -direction * x];
    return [-direction * y, direction * x, z];
  };
  const turn = (face, inverse = false) => {
    const direction = face.sign * (inverse ? 1 : -1);
    stickers.forEach((sticker) => {
      if (sticker.position[face.axis] !== face.sign) return;
      sticker.position = quarter(sticker.position, face.axis, direction);
      sticker.normal = quarter(sticker.normal, face.axis, direction);
    });
    history.push(face.name + (inverse ? "'" : ''));
    render();
  };
  const buttons = document.querySelector('#turn-buttons');
  for (const inverse of [false, true]) {
    faces.forEach((face) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = face.name + (inverse ? '′' : '');
      button.dataset.move = face.name + (inverse ? "'" : '');
      button.setAttribute(
        'aria-label',
        `${face.name}${inverse ? (en ? ' inverse' : ' ters') : en ? ' clockwise' : ' saat yönünde'}`,
      );
      button.addEventListener('click', () => turn(face, inverse));
      buttons.append(button);
    });
  }
  document.querySelector('#shuffle').addEventListener('click', () => {
    reset();
    let last;
    for (let index = 0; index < 20; index++) {
      const candidates = faces.filter((face) => face !== last);
      const face = candidates[Math.floor(Math.random() * candidates.length)];
      turn(face, Math.random() < 0.5);
      last = face;
    }
    if (cube.dataset.solved === 'true') turn(faces[4]);
  });
  document.querySelector('#reset').addEventListener('click', () => {
    reset();
    pitch = -24;
    yaw = -32;
    camera();
  });
  document.querySelectorAll('[data-camera]').forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.camera;
      if (direction === 'left') yaw -= 30;
      if (direction === 'right') yaw += 30;
      if (direction === 'up') pitch = Math.max(-75, pitch - 20);
      if (direction === 'down') pitch = Math.min(75, pitch + 20);
      camera();
    });
  });
  document.addEventListener('keydown', (event) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.target instanceof window.HTMLInputElement ||
      event.target instanceof window.HTMLTextAreaElement ||
      event.target instanceof window.HTMLSelectElement
    )
      return;
    const face = faces.find((item) => item.name === event.key.toUpperCase());
    if (face) {
      event.preventDefault();
      turn(face, event.shiftKey);
    }
  });
  const stage = document.querySelector('.stage');
  let drag;
  stage.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    drag = { x: event.clientX, y: event.clientY, pitch, yaw };
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointermove', (event) => {
    if (!drag) return;
    yaw = drag.yaw + (event.clientX - drag.x) * 0.45;
    pitch = Math.max(
      -75,
      Math.min(75, drag.pitch - (event.clientY - drag.y) * 0.45),
    );
    camera();
  });
  const stopDragging = () => {
    drag = undefined;
  };
  stage.addEventListener('pointerup', stopDragging);
  stage.addEventListener('pointercancel', stopDragging);
  stage.addEventListener('lostpointercapture', stopDragging);
  reset();
})();
