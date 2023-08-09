import axios from 'axios';

// const defaultColors = [
//   '#A62A21',
//   '#7e3794',
//   '#0B51C1',
//   '#3A6024',
//   '#A81563',
//   '#B3003C',
// ];

const defaultColors = [
  '#4285F4',
  '#0B8043',
  '#F6BF26',
  '#A79B8E',
  '#F4511E',
  '#B39DDB',
  '#7CB342',
  '#F4511E',
  '#616161',
  '#D81B60',
  '#7986CB',
  '#C0CA33',
  '#FF158A',
  '#8E24AA',
  '#AD1457',
  '#009688',
  '#33B679',
  '#F09300',
  '#795548',
  '#E67C73',
];

const stringAsciiPRNG = (value, m) => {
  const charCodes = [...value].map((letter) => letter.charCodeAt(0));
  const len = charCodes.length;

  const a = (len % (m - 1)) + 1;
  const c = charCodes.reduce((current, next) => current + next) % m;

  let random = charCodes[0] % m;
  for (let i = 0; i < len; i++) random = (a * random + c) % m;

  return random;
};

export const getRandomColor = (value, colors = defaultColors) => {
  // if (!value) {
  //   return "transparent";
  // }

  const colorIndex = stringAsciiPRNG(value, colors.length);
  return colors[colorIndex];
};

export const getAvatarFromGoogle = (token) => {
  return new Promise((resolve, reject) => {
    const url = `https://www.googleapis.com/oauth2/v3/userinfo`;

    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data.picture))
      .catch(() => reject());
  });
};

export const displayText = (name, maxText) => {
  if (!name) {
    return '*';
  }

  return Array.from(name)
    .map((part) => part.toUpperCase())
    .slice(0, maxText === 0 ? name.length : maxText)
    .join('');
};

export const calcBorderRadius = (round) => {
  if (round === 'roundSquare') {
    return '5px';
  }
  if (round === true) {
    return '100%';
  }

  if (round === false) {
    return;
  }

  return round;
};
