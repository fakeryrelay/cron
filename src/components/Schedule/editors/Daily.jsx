import { useEffect, useRef, useState } from "react";
import { Option } from "./Option";
import Select from "react-select";
import { IntegerInput } from "../../UI/IntegerInput";
import { selectTheme, selectStyles } from "./../../../utils/selectStyles";
import { minutesOptions } from "../../../utils/dataOptions";

export const Daily = ({ setCron, cron, optionType, update }) => {
  const [activeOption, setActiveOption] = useState("once");
  const onceInput = useRef();
  const everyInput = useRef();
  const fewTimesRef = useRef();

  useEffect(() => {
    if (!optionType) return;

    if (optionType === "once") {
      setActiveOption("once");
      onceInput.current.value = `${
        cron.hours.length === 1 ? "0" + cron.hours : cron.hours
      }:${cron.minutes.length === 1 ? "0" + cron.minutes : cron.minutes}`;
      everyInput.current.value = null;
      fewTimesRef.current.setValue([]);
    }
    if (optionType === "every") {
      setActiveOption("every");
      everyInput.current.value = cron.minutes.slice(2);
      onceInput.current.value = null;
      fewTimesRef.current.setValue([]);
    }
    if (optionType === "few-times") {
      setActiveOption("few-times");
      fewTimesRef.current.setValue(
        cron.minutes.split(",").map((el) => ({
          value: el,
          label: `${el}`.length < 2 ? `0${el}` : `${el}`,
        }))
      );
      onceInput.current.value = null;
      everyInput.current.value = null;
    }
  }, [update]);

  const isChecked = (value) => value === activeOption;

  const handleChange = (target) => {
    let data = {};

    if (target.name === "once") {
      const [hours, minutes] = target.value.split(":");

      data = {
        minutes: minutes ? minutes : "*",
        hours: hours.length === 0 ? "*" : hours,
      };
    }

    if (target.name === "every") {
      data = {
        minutes: target.value === "" ? "*" : "*/" + target.value,
        hours: "*",
      };
    }

    if (Array.isArray(target)) {
      data = {
        minutes:
          target.length === 0 ? "*" : target.map((el) => el.value).join(","),
        hours: "*",
      };
    }

    setCron((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  const handleOptionSelect = (e) => {
    setActiveOption(e.target.name);

    if (e.target.name === "once") {
      handleChange(onceInput.current);
    }
    if (e.target.name === "every") {
      handleChange(everyInput.current);
    }
    if (e.target.name === "few-times") {
      handleChange(fewTimesRef.current.getValue());
    }
  };

  return (
    <div className="label">
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
        optionName={"every"}
        title={"Каждые"}
        activeOption={activeOption}
        handleOptionSelect={handleOptionSelect}
      >
        <IntegerInput
          name={"every"}
          min={0}
          max={59}
          innerRef={everyInput}
          onChange={(e) => handleChange(e.target)}
          disabled={"every" !== activeOption}
        />
      </Option>
      <Option
        optionName={"few-times"}
        title={"Каждые час в"}
        activeOption={activeOption}
        handleOptionSelect={handleOptionSelect}
      >
        <Select
          isDisabled={"few-times" !== activeOption}
          defaultValue={null}
          onChange={handleChange}
          options={minutesOptions}
          isMulti
          ref={fewTimesRef}
          styles={selectStyles}
          theme={selectTheme}
        />
      </Option>
    </div>
  );
};
