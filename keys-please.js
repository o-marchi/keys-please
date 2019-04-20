const specialKeys = {
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  insert: 45,
  delete: 46,
};

const getCode = x => specialKeys[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);

const keys = new Proxy({}, {
  set: (obj, prop, value) => {
    if (obj[prop] === value) { return; }

    obj[prop] = value;

    events.forEach(e => {
      if (e.codes.map(code => keys[code]).every(pressed => pressed)) { e.fn(); }
    });
  }
});

onkeydown = onkeyup = e => keys[e.keyCode] = e.type === 'keydown';

const events = [];

const keysPlease = (keys, fn) => {
  const codes = keys.replace(/\s/g, '').split('+').map(getCode);
  events.push({ codes, fn });
};
