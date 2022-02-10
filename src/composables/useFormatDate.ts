export default function useFormatDate(deadLine: Date | undefined) {
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    };
    return deadLine?.toLocaleString('en', options);
  };
  return formatDate;
}
