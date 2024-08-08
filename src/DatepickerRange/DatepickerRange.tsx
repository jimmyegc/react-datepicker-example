import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// https://getbootstrap.com/docs/5.0/components/toasts/

export const DatepickerRange = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [list, setList] = useState([])
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(end)
    if (end != null) {
      console.log(dates)
      const obj = start + "|" + end
      setList([...list, obj])
    }
  };

  return (<>

    <div>DatepickerRange</div>
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
    <br />
    {list?.map((item) => (
      <div
        key={item}
      >
        <p>
          {JSON.stringify(item, null, 2)}
        </p>
      </div>
    ))}
    {/*       <pre>
        {JSON.stringify(list, null, 2)}
      </pre> */}

  </>
  )
}
