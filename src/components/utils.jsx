export function getRandomChar(min, max) {
  const limit = min - max + 1;
  return String.fromCharCode(Math.floor(Math.random() * limit) + min);
}
export function getSymbol() {
  const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
