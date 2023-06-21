import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Option } from "./Option";
import { selectStyles, selectTheme } from "../../../utils/selectStyles";
import { hoursOptions } from "../../../utils/dataOptions";

export const Periodic = ({
  setCron,
  options,
  title,
  cronProp,
  cron,
  optionType,
  update,
}) => {
  const [activeOption, setActiveOption] = useState("once");

  const mainSelect = useRef();
  const onceInput = useRef();
  const fewTimesSelect = useRef();

  const isChecked = (value) => value === activeOption;

  useEffect(() => {
    if (!optionType) return;

    if (optionType === "once") {
      setActiveOption("once");
      onceInput.current.value = `${
        cron.hours.length === 1 ? "0" + cron.hours : cron.hours
      }:${cron.minutes.length === 1 ? "0" + cron.minutes : cron.minutes}`;
      mainSelect.current.setValue(
        cron[cronProp].split(",").map((el) => {
          const arr = options.filter((option) => el === option.value);
          return { value: arr[0].value, label: arr[0].label };
        })
      );
      fewTimesSelect.current.setValue([])
    }

    if (optionType === "few-times") {
      setActiveOption("few-times");
      fewTimesSelect.current.setValue(
        cron.hours.split(",").map((el) => ({
          value: el,
          label: `${el}`.length < 5 ? `0${el}:00` : `${el}:00`,
        }))
      );
      mainSelect.current.setValue(
        cron[cronProp].split(",").map((el) => {
          const arr = options.filter((option) => el === option.value);
          return { value: arr[0].value, label: arr[0].label };
        })
      );
      onceInput.current.value = null
    }
  }, [update]);

  const handleWeekDaySelect = (values) => {
    setCron((prev) => ({
      ...prev,
      [cronProp]:
        values.length === 0 ? "*" : values.map((el) => el.value).join(","),
    }));
  };

  const handleOptionSelect = (e) => {
    setActiveOption(e.target.name);

    if (e.target.name === "once") {
      handleChange(onceInput.current);
    }

    if (e.target.name === "few-times") {
      handleChange(fewTimesSelect.current.getValue());
    }
  };

  const handleChange = (target) => {
    let data = {};

    if (target.name === "once") {
      const [hours, minutes] = target.value.split(":");

      data = {
        minutes: minutes ? minutes : "*",
        hours: hours.length === 0 ? "*" : hours,
      };
    } else {
      handleTimeSelect(target);
      return;
    }

    setCron((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  const handleTimeSelect = (times) => {
    let data = {};

    if (times.length === 0) {
      data = {
        minutes: "*",
        hours: "*",
      };
    } else {
      data = {
        minutes: "0",
        hours: times.map((time) => time.value),
      };
    }

    setCron((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  return (
    <div className="label">
      <div className="option">
        <div className="radio">{title}</div>
        <Select
          ref={mainSelect}
          defaultValue={null}
          onChange={handleWeekDaySelect}
          options={options}
          isMulti
          styles={selectStyles}
          theme={selectTheme}
        />
      </div>

      <Option
        optionName={"once"}
        title={"Единожды"}
        activeOption={activeOption}
        handleOptionSelect={handleOptionSelect}
      >
        <input
          ref={onceInput}
          className="option__input"
          type="time"
          name="once"
          disabled={!isChecked("once")}
          onChange={(e) => handleChange(e.target)}
        />
      </Option>

      <Option
        optionName={"few-times"}
        title={"В определенное время"}
        activeOption={activeOption}
        handleOptionSelect={handleOptionSelect}
      >
        <Select
          name="few-times"
          isDisabled={!isChecked("few-times")}
          defaultValue={null}
          onChange={handleTimeSelect}
          options={hoursOptions}
          isMulti
          ref={fewTimesSelect}
          styles={selectStyles}
          theme={selectTheme}
        />
      </Option>
    </div>
  );
};
