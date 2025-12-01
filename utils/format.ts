export const formatCurrency = (value: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatRelativeTime = (date: string | Date) => {
  const now = new Date();
  const target = typeof date === 'string' ? new Date(date) : date;
  const diffMs = target.getTime() - now.getTime();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffMinutes) < 60) {
    const val = Math.abs(diffMinutes);
    return diffMinutes < 0 ? `${val} minute${val !== 1 ? 's' : ''} ago` : `in ${val} minute${val !== 1 ? 's' : ''}`;
  }
  if (Math.abs(diffHours) < 24) {
    const val = Math.abs(diffHours);
    return diffHours < 0 ? `${val} hour${val !== 1 ? 's' : ''} ago` : `in ${val} hour${val !== 1 ? 's' : ''}`;
  }
  const val = Math.abs(diffDays);
  return diffDays < 0 ? `${val} day${val !== 1 ? 's' : ''} ago` : `in ${val} day${val !== 1 ? 's' : ''}`;
};
