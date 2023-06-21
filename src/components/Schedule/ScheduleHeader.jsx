export const ScheduleHeader = ({activeEditor, handleCronType}) => {
  return (
    <ul className="schedule__header">
      <li>
        <button
          className={activeEditor === "daily" ? "active" : ""}
          disabled={activeEditor === "daily"}
          value={"daily"}
          onClick={handleCronType}
        >
          Ежедневно
        </button>
      </li>
      <li>
        <button
          className={activeEditor === "weekly" ? "active" : ""}
          disabled={activeEditor === "weekly"}
          value={"weekly"}
          onClick={handleCronType}
        >
          Еженедельно
        </button>
      </li>
      <li>
        <button
          className={activeEditor === "monthly" ? "active" : ""}
          disabled={activeEditor === "monthly"}
          value={"monthly"}
          onClick={handleCronType}
        >
          Ежемесячно
        </button>
      </li>
      <li>
        <button
          className={activeEditor === "custom" ? "active" : ""}
          disabled={activeEditor === "custom"}
          value={"custom"}
          onClick={handleCronType}
        >
          Свое
        </button>
      </li>
    </ul>
  );
};
