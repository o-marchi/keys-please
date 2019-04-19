
const simpleCallback = () => console.log('simpleCallback');

const specialKeys = {
  shift: 16,
  ctrl: 17,
};

const getKeys = keys => {
  console.log(keys);
};

const getCode = x => specialKeys[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);

let keysMap = {};

const printKeys = keys => {

  document.getElementById('keys').innerHTML =
    Object.keys(keys).map(key => {
      return `<p>${String.fromCharCode(key)} - ${key} - ${keys[key]}</p>`;
    }).join('');
}

onkeydown = onkeyup = e => {
  keysMap[e.keyCode] = e.type === 'keydown';

  printKeys(keysMap);

  events.forEach(ev => {
    if (ev.codes.map(code => keysMap[code]).every(pressed => pressed)) {
      ev.fn();
    }
  });
}

let events = [];

const keysPlease = (keys, fn) => {
  const codes = keys.split('+').map(getCode);
  events.push({ codes, fn });
};

keysPlease('a+d', simpleCallback);
keysPlease('ctrl+b', simpleCallback);
