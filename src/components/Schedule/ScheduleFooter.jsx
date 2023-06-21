import { useRef, useState } from "react";
import cronCheck from "cron-validate";
import { onLoadCron } from "../../utils/onLoadCron";
import { convertedCron } from "../../utils/convertCron";

export const ScheduleFooter = ({
  cron,
  setCron,
  setActiveEditor,
  setOptionType,
  setUpdate,
}) => {
  const cronInput = useRef();
  const [savedCron, setSavedCron] = useState("* * * * *");
  const [error, setError] = useState(undefined);

  return (
    <>
      <div className="schedule__buttons">
        <button
          onClick={() => {
            setSavedCron(
              Object.entries(cron)
                .map((cronProp) => cronProp[1])
                .join(" ")
            );
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            const cronResult = cronCheck(cronInput.current.value);
            if (!cronResult.isValid()) {
              setError(cronCheck(cronInput.current.value).error);
              return;
            }
            setError(undefined);

            const { seconds, years, ...projectCron } = cronResult.value;

            const convertedRes = convertedCron(projectCron);

            onLoadCron(convertedRes, setCron, setActiveEditor, setOptionType);
            setUpdate((prev) => !prev);
          }}
        >
          Load
        </button>
      </div>
      <div className="schedule__footer">
        {error ? <p onClick={() => setError(undefined)}>{error[0]}</p> : null}

        <input
          placeholder="Текущее расписание CRON"
          ref={cronInput}
          value={savedCron}
          onChange={(e) => setSavedCron(e.target.value)}
        />
      </div>
    </>
  );
};
