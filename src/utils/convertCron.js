const convertFunction = (cronProp, max, min = 0) => {
  if (cronProp === "*") return cronProp;

  if (!cronProp.includes(",") && !cronProp.includes("-")) {
    if (cronProp.length > 2 && cronProp.slice(0, 2) === "*/") {
      return cronProp.slice(0, 2) + String(+cronProp.slice(2));
    }
    return String(+cronProp);
  }

  const prop = cronProp.split(",");

  const converted = prop.map((value) => {
    if (/\*\/[0-5][0-9]/.test(value) && prop.length > 1) {
      const res = [];
      for (let i = min; i <= max; i += +value.slice(2)) {
        res.push(i);
      }
      return res.join(",");
    }

    if (value.includes("-")) {
      const [start, end] = value.split("-");
      return Array(+end - +start + 1)
        .fill(+start)
        .map((el, i) => String(el + i));
    }
    return value;
  });

  return [...new Set(converted.join(",").split(","))].join(",");
};

export const convertedCron = (projectCron) => ({
  minutes: convertFunction(projectCron.minutes, 59),
  hours: convertFunction(projectCron.hours, 24),
  daysOfMonth: convertFunction(projectCron.daysOfMonth, 31),
  months: convertFunction(projectCron.months, 12),
  daysOfWeek: convertFunction(projectCron.daysOfWeek, 7),
});
