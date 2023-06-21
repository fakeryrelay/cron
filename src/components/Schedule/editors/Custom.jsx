import { hoursOptions, minutesOptions, daysOfMonthOptions, monthsOptions, daysOfWeekOptions } from "../../../utils/dataOptions";
import { CustomItem } from "./CustomItem";


export const Custom = ({ setCron, cron, update }) => {

  return (
    <div className="label__custom">
      <CustomItem
        title={"минуты"}
        options={minutesOptions}
        cronProp={'minutes'}
        setCron={setCron}
        cron={cron}
        min={0}
        max={59}
        update={update}
        key={'minutes'}
      />

      <CustomItem
        title={"часы"}
        options={hoursOptions}
        cronProp={'hours'}
        setCron={setCron}
        cron={cron}
        min={0}
        max={23}
        update={update}
        key={'hours'}
      />

      <CustomItem
        title={"дни месяца"}
        options={daysOfMonthOptions}
        cronProp={'daysOfMonth'}
        setCron={setCron}
        cron={cron}
        min={1}
        max={31}
        update={update}
        key={'daysOfMonth'}
      />

      <CustomItem
        title={"месяц"}
        options={monthsOptions}
        cronProp={'months'}
        setCron={setCron}
        cron={cron}
        min={1}
        max={12}
        update={update}
        key={'months'}
      />

      <CustomItem
        title={"дни недели"}
        options={daysOfWeekOptions}
        cronProp={'daysOfWeek'}
        setCron={setCron}
        cron={cron}
        min={0}
        max={6}
        update={update}
        key={'daysOfWeek'}
      />
    </div>
  );
};
