/**
 * get obj from raw string key/value
 * @param {*} objStr
 */
const getObjFromString = objStr => {
  const index = objStr.indexOf('=');
  const key = objStr.substring(0, index);
  const value = objStr.substring(index + 1, objStr.length);

  const obj = {};
  obj[key] = value;
  return obj;
};

const load = input => {
  const obj = {};
  const arr1 = input.split('\n');
  for (let i = 0; i < arr1.length; i++) {
    const arr2 = arr1[i].split(';');
    if (!arr2[0]) continue; // if there is a last \n in the text, ignore it
    const temp = {};
    for (let j = 0; j < arr2.length; j++) {
      const data = getObjFromString(arr2[j]);
      Object.assign(temp, data);
    }
    obj[i] = temp;
  }
  return obj;
};

const store = input => {
  const keys1 = Object.keys(input); // 0 1 2
  let textOutput = '';
  for (let i = 0; i < keys1.length; i++) {
    const subObj = input[keys1[i]];
    const keys2 = Object.keys(subObj); // [key1 key 2], [key1, key2]
    for (let j = 0; j < keys2.length; j++) {
      textOutput += `${keys2[j].toString()}=${subObj[keys2[j]]};`;
    }
    textOutput = textOutput.substring(0, textOutput.length - 1);
    textOutput += '\n';
  }
  textOutput = textOutput.substring(0, textOutput.length - 1);
  return textOutput;
};

module.exports = { store, load };