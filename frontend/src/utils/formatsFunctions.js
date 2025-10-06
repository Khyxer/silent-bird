export const formatNumberToK = (number) => {
  if (number < 1000) {
    return number.toString();
  }

  const abreviado = (number / 1000).toFixed(1);

  return abreviado.endsWith(".0")
    ? abreviado.slice(0, -2) + "k"
    : abreviado + "k";
};

export const formatTextFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatUserDisplayName = (text) => {
  return text
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
