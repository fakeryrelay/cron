export const minutesOptions = Array(60)
  .fill({})
  .map((_, i) => ({
    value: `${i}`,
    label: `${i}`.length < 2 ? `0${i}` : `${i}`,
  }));

export const hoursOptions = Array(24)
  .fill({})
  .map((_, i) => ({
    value: `${i}`,
    label: `${i}:00`.length < 5 ? `0${i}:00` : `${i}:00`,
  }));

export const daysOfMonthOptions = Array(31)
  .fill({})
  .map((_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}`.length < 2 ? `0${i + 1}` : `${i + 1}`,
  }));

export const monthsOptions = [
  { value: "1", label: "Январь" },
  { value: "2", label: "Февраль" },
  { value: "3", label: "Март" },
  { value: "4", label: "Апрель" },
  { value: "5", label: "Май" },
  { value: "6", label: "Июнь" },
  { value: "7", label: "Июль" },
  { value: "8", label: "Август" },
  { value: "9", label: "Сентябрь" },
  { value: "10", label: "Октябрь" },
  { value: "11", label: "Ноябрь" },
  { value: "12", label: "Декабрь" },
];

export const daysOfWeekOptions = [
  { value: "1", label: "Понедельник" },
  { value: "2", label: "Вторник" },
  { value: "3", label: "Среда" },
  { value: "4", label: "Четверг" },
  { value: "5", label: "Пятница" },
  { value: "6", label: "Суббота" },
  { value: "0", label: "Воскресенье" },
  { value: "7", label: "Воскресенье" }
];
