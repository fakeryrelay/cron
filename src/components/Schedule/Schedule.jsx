import { useState } from "react";
import { Daily } from "./editors/Daily";
import { Custom } from "./editors/Custom";
import { Periodic } from "./editors/Periodic";
import { daysOfMonthOptions, daysOfWeekOptions } from "../../utils/dataOptions";
import { ScheduleHeader } from "./ScheduleHeader";
import { ScheduleFooter } from "./ScheduleFooter";

export const Schedule = () => {
  const [cron, setCron] = useState({
    minutes: "*",
    hours: "*",
    daysOfMonth: "*",
    months: "*",
    daysOfWeek: "*",
  });
  const [activeEditor, setActiveEditor] = useState("daily");
  const [optionType, setOptionType] = useState(undefined);
  const [update, setUpdate] = useState(true);

  const handleCronType = (e) => {
    setCron({
      minutes: "*",
      hours: "*",
      daysOfMonth: "*",
      months: "*",
      daysOfWeek: "*",
    });
    setActiveEditor(e.target.value);
    setOptionType(undefined);
  };

  return (
    <div className="schedule">
      <div className="schedule__title">Расписание</div>
      <ScheduleHeader
        activeEditor={activeEditor}
        handleCronType={handleCronType}
      />
      <div className="content">
        {activeEditor === "daily" ? (
          <Daily
            setCron={setCron}
            cron={cron}
            optionType={optionType}
            update={update}
          />
        ) : null}
        {activeEditor === "weekly" ? (
          <Periodic
            setCron={setCron}
            title={"День недели"}
            options={daysOfWeekOptions}
            cronProp={"daysOfWeek"}
            cron={cron}
            optionType={optionType}
            update={update}
          />
        ) : null}
        {activeEditor === "monthly" ? (
          <Periodic
            setCron={setCron}
            title={"День месяца"}
            options={daysOfMonthOptions}
            cronProp={"daysOfMonth"}
            cron={cron}
            optionType={optionType}
            update={update}
          />
        ) : null}
        {activeEditor === "custom" ? (
          <Custom setCron={setCron} cron={cron} update={update} />
        ) : null}
      </div>

      <ScheduleFooter
        cron={cron}
        setCron={setCron}
        setActiveEditor={setActiveEditor}
        setOptionType={setOptionType}
        setUpdate={setUpdate}
      />
    </div>
  );
};
