import Select from "react-select";
import { Option } from "./Option";
import { useEffect, useRef, useState } from "react";
import { IntegerInput } from "../../UI/IntegerInput";
import { selectStyles, selectTheme } from "../../../utils/selectStyles";

export const CustomItem = ({ title, options, cronProp, setCron, cron, min, max, update }) => {
  const [activeOption, setActiveOption] = useState("every");

  const everyRef = useRef();
  const fewTimesRef = useRef();

  useEffect(() => {
    if (cron[cronProp] === '*') {
      everyRef.current.value = null
      fewTimesRef.current.setValue([])
      return
    }
    if (cron[cronProp].slice(0, 2) === '*/') {
      setActiveOption("every")
      everyRef.current.value = cron[cronProp].slice(2)
      return
    }
    setActiveOption("few-times");
    fewTimesRef.current.setValue(
      cron[cronProp].split(",").map((el) => {
        const arr = options.filter(option => el === option.value)
        return {value: arr[0].value, label: arr[0].label}
      })
    );
  }, [update])

  const handleChange = (target) => {
    if (!Array.isArray(target)) {
      setCron((prev) => ({
        ...prev,
        [cronProp]: target.value === "" ? "*" : `*/${target.value}`,
      }));
      return;
    }

    setCron((prev) => ({
      ...prev,
      [cronProp]:
        target.length === 0 ? "*" : target.map((el) => el.value).join(","),
    }));
  };

  const handleOptionSelect = (e) => {
    setActiveOption(e.target.name);

    if (e.target.name === "every") {
      handleChange(everyRef.current);
    }

    if (e.target.name === "few-times") {
      handleChange(fewTimesRef.current.getValue());
    }
  };

  return (
    <div className="label__custom-item">
      <div className="label__title">
        <div></div>
        <h2>{title}</h2>
        <div></div>
      </div>
      <Option
        optionName={"every"}
        title={"Каждые"}
        activeOption={activeOption}
        handleOptionSelect={handleOptionSelect}
        key={`${title} every`}
      >
        <IntegerInput
          name={"every"}
          min={min}
          max={max}
          innerRef={everyRef}
          onChange={(e) => handleChange(e.target)}
          disabled={"every" !== activeOption}
        />
      </Option>
      <Option
        optionName={"few-times"}
        title={"Определенные"}
        activeOption={activeOption}
        handleOptionSelect={handleOptionSelect}
        key={`${title} few-times`}
      >
        <Select
          isDisabled={"few-times" !== activeOption}
          defaultValue={null}
          onChange={handleChange}
          options={options}
          isMulti
          ref={fewTimesRef}
          styles={selectStyles}
          theme={selectTheme}
        />
      </Option>
    </div>
  );
};
