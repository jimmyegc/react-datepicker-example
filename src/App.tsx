/*import { useState } from "react";
import { DatepickerRange } from "./DatepickerRange/DatepickerRange";
import { Webform } from "./Webform/Webform";
import { WFCFormInputDatePicker } from "./WFCFormInputDatePicker/WFCFormInputDatePicker";

import { componentsMock } from "./WFCFormInputDatePicker/componentsMock";
import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker"; */

import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker";

export const App = () => {
  //const [listDisabledDays, setListDisabledDays] = useState([]);
  //const handleDisabledDaysChange = (e) => setListDisabledDays(e);

  return (
    <>
      <h1>Webform</h1>
      <div className="container">
        <WFCDatePicker />
      </div>
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
