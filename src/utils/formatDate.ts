const formatDate = (date: Date): string =>
  Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);

export default formatDate;
