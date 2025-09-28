/**
 * Calcula el tiempo transcurrido desde una fecha dada.
 * @param {string} date - Fecha en formato ISO 8601.
 */
export const timeAgo = (date) => {
  const now = new Date();
  const pastDate = new Date(date);
  const diffInSeconds = Math.floor((now - pastDate) / 1000);

  // Segundos
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }

  // Minutos
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  // Horas
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  // Días
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}d`;
  }

  // Meses (aproximado)
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}m`;
  }

  // Años
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}a`;
};
