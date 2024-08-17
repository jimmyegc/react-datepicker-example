/*import { useState } from "react";
import { DatepickerRange } from "./DatepickerRange/DatepickerRange";
import { Webform } from "./Webform/Webform";
import { WFCFormInputDatePicker } from "./WFCFormInputDatePicker/WFCFormInputDatePicker";
import { componentsMock } from "./WFCFormInputDatePicker/componentsMock";
import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker"; */
/*
import DatePicker from "react-datepicker";
import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker";

import { useState } from "react";

*/

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, addDays} from "date-fns";
import './style.css'

export const App = () => {
  const [startDate, setStartDate] = useState(new Date())
  const styleHighlighted = {
    backgroundColor: 'blue',
    textColor: "white"
  }
  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": [
        subDays(new Date(), 4),
        subDays(new Date(), 3),
        subDays(new Date(), 2),
        subDays(new Date(), 1),
      ],
    },
    {
      "react-datepicker__day--highlighted-custom-2": [
        addDays(new Date(), 1),
        addDays(new Date(), 2),
        addDays(new Date(), 3),
        addDays(new Date(), 4),
      ],
    },
  ];
  return (
    <>
      <h4>Webform</h4>
      <div className="container">
        <DatePicker          
          selected={startDate}  
          onChange={(date) => setStartDate(date)}
          highlightDates={highlightWithRanges}
          renderDayContents={(day) => <span>{day}</span>}

        />
      </div>

      {/*  <div className="container">
         <WFCDatePicker />
      </div> */}
      {/*  <WFCFormInputDatePicker
      onChangeProps={{}}
      objConf={componentsMock.objConf}
    /> */}
      {/* <Webform /> */}
      {/* <DatepickerRange
      title="Bloqueo de días:"
      status="disabled"
      list={listDisabledDays}
      onListChange={handleDisabledDaysChange}
    /> */}
    </>
  );
};

export default App;
