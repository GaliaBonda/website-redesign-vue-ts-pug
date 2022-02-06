export const formatDate = {
  methods: {
    formatDate(deadLine: Date) {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
      };
      return deadLine?.toLocaleString('en', options);
    },
  },
};
