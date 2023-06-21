const minutesReg = (value) =>
  value.length <= 2 && /[0-9]|[0-5][0-9]/.test(value);
const hoursReg = (value) =>
  value.length <= 2 && /[0-9]|[1][0-9]|[2][0-3]/.test(value);

const everyMinutesReg = (value) =>
  value.slice(0, 2) === "*/" && minutesReg(value.slice(2));
const numbersReg = /(\d+)(,\s*\d+)*/;

export const onLoadCron = (cron, setCron, setActiveEditor, setOptionType) => {
  const { minutes, hours, daysOfMonth, months, daysOfWeek } = cron;

  const handleValid = (editor, type) => {
    setCron({
      ...cron,
    });
    setActiveEditor(editor);
    setOptionType(type);
  };
  // Ежедневно
  if (
    [daysOfMonth, months, daysOfWeek].every((el) => el === "*") &&
    minutes !== "*" &&
    (hours === "*" || hoursReg(hours))
  ) {
    if (hours !== "*" && minutesReg(minutes) && minutes.length <= 2) {
      handleValid("daily", "once");
      return;
    }
    if (everyMinutesReg(minutes)) {
      handleValid("daily", "every");
      return;
    }

    if (numbersReg.test(minutes)) {
      handleValid("daily", "few-times");
      return;
    }
  }

  // Еженедельно
  if (
    [daysOfMonth, months].every((el) => el === "*") &&
    minutes !== "*" &&
    hours !== "*" &&
    numbersReg.test(daysOfWeek)
  ) {
    if (minutes === "0" && numbersReg.test(hours)) {
      handleValid("weekly", "few-times");
      return;
    }

    if (hoursReg(hours) && minutesReg(minutes) && !everyMinutesReg(daysOfMonth)) {
      handleValid("weekly", "once");
      return;
    }
  }

  // Ежемесячно
  if (
    [daysOfWeek, months].every((el) => el === "*") &&
    minutes !== "*" &&
    hours !== "*" &&
    numbersReg.test(daysOfMonth)
  ) {
    if (numbersReg.test(hours) && minutes === "0") {
      handleValid("monthly", "few-times");
      return;
    }
    
    if (hoursReg(hours) && minutesReg(minutes) && !everyMinutesReg(daysOfMonth)) {
      handleValid("monthly", "once");
      return;
    }
  }

  setCron({
    ...cron,
  });
  setActiveEditor("custom");
};
