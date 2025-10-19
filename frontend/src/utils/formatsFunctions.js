export const formatNumberToK = (number) => {
  if (number < 1000) {
    return number.toString();
  }

  if (number < 1000000) {
    const abreviadoK = (number / 1000).toFixed(1);

    return abreviadoK.endsWith(".0")
      ? abreviadoK.slice(0, -2) + "k"
      : abreviadoK + "k";
  }

  if (number < 1000000000) {
    const abreviadoM = (number / 1000000).toFixed(1);

    return abreviadoM.endsWith(".0")
      ? abreviadoM.slice(0, -2) + "M"
      : abreviadoM + "M";
  }

  return number.toString();
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

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    // Formato HH:mm
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    // Formato dd/mm/yyyy
    return date.toLocaleDateString('es-ES');
  }
}