import { useState } from "react";
import { DatepickerRange } from "./DatepickerRange/DatepickerRange"
import { Webform } from "./Webform/Webform"
import { WFCFormInputDatePicker } from "./WFCFormInputDatePicker/WFCFormInputDatePicker";

import { componentsMock } from './WFCFormInputDatePicker/componentsMock'

export const App = () => {

  const [listDisabledDays, setListDisabledDays] = useState([]);

  const handleDisabledDaysChange = (e) => setListDisabledDays(e)


  return <>
    <h1>Webform</h1>
    {/*  <WFCFormInputDatePicker
      onChangeProps={{}}
      objConf={componentsMock.objConf}
    /> */}
    <Webform />
    {/* <DatepickerRange
      title="Bloqueo de días:"
      status="disabled"
      list={listDisabledDays}
      onListChange={handleDisabledDaysChange}
    /> */}
  </>
}

export default App
