export const formatCurrency = (value: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatRelativeTime = (date: string | Date) => {
  const intl = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const now = new Date();
  const target = typeof date === 'string' ? new Date(date) : date;
  const diffMs = target.getTime() - now.getTime();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffMinutes) < 60) {
    return intl.format(diffMinutes, 'minute');
  }
  if (Math.abs(diffHours) < 24) {
    return intl.format(diffHours, 'hour');
  }
  return intl.format(diffDays, 'day');
};
