import { useState } from "react";
import { DatepickerRange } from "./DatepickerRange/DatepickerRange"
import { Webform } from "./Webform/Webform"

export const App = () => {
  const [listDisabledDays, setListDisabledDays] = useState([]);

  const handleDisabledDaysChange = (e) => {
    setListDisabledDays(e);
    //setValue("disabledDays", e);
  };

  return <>
    <h1>Webform</h1>
    <Webform />
    {/*  <DatepickerRange
      title="Bloqueo de días:"
      status="disabled"
      list={listDisabledDays}
      onListChange={handleDisabledDaysChange}
    /> */}
  </>
}

export default App
