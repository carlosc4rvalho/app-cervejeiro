export const valueToFloat = value => {
  if (typeof value !== 'string') {
    value = String(value);
  }

  if (value.includes(',')) {
    const valueP = value.replace(',', '.');
    return parseFloat(valueP);
  } else {
    return parseFloat(value);
  }
};
