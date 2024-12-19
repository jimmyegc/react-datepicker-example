//import { componentsMock } from "../../WFCFormInputDatePicker/componentsMock";
import { useFormContext } from "react-hook-form";
import { useWFCDatePicker } from "./useWFCDatePicker";
import { WFCDatePickerAgeRange } from "./WFCDatePickerAgeRange/WFCDatePickerAgeRange";
import { WFCDatePickerEnabledDays } from "./WFCDatePickerEnabledDays/WFCDatePickerEnabledDays";
import { WFCDatePickerBlockedDays } from "./WFCDatePickerBlockedDays/WFCDatePickerBlockedDays";
import { WFCDatePickerPastDays } from "./WFCDatePickerPastDays/WFCDatePickerPastDays";
import { WFCDatePickerFutureDays } from "./WFCDatePickerFutureDays/WFCDatePickerFutureDays";
import { WFCDatePickerDefault } from "./WFCDatePickerDefault/WFCDatePickerDefault";
import { objConf } from "./WFCDatePickerMock";
import { CustomDatePicker } from "./components/CustomDatePicker/CustomDatePicker";
import { useState } from "react";


export const WFCDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const {        
    option,    
    options,
    isRangeOfAge,    
    canBlockDays,
    canEnabledDays,
    canSelectPastDates,
    canSelectFutureDates,    
  } = useWFCDatePicker();

  return (
    <>
     <CustomDatePicker
       selected={startDate} 
       onChange={(date) => setStartDate(date)} 
     />
      {/* Default */}
      {option === options.default && <WFCDatePickerDefault />}
      {/* Rango de Edad */}
      {option === options.custom && isRangeOfAge && <WFCDatePickerAgeRange />}
      {/* Habilitar días */}
      {option === options.custom && canEnabledDays && <WFCDatePickerEnabledDays />}
      {/* Bloqueo de días */}
      {option === options.custom && canBlockDays && <WFCDatePickerBlockedDays />}      
      {/* Habilita fechas pasadas */}
      {option === options.custom && canSelectPastDates && <WFCDatePickerPastDays />}
      {/* Habilita fechas futuras  */}
      {option === options.custom && canSelectFutureDates && <WFCDatePickerFutureDays />}            
      {/* Debug */}
      <div id="debug">
        <h4>Debug</h4>
        <pre>{ JSON.stringify(objConf, null, 2)}</pre>
      </div>
      {/* 
      <pre>{JSON.stringify(componentsMock, null, 2)}</pre>      
      <pre>{JSON.stringify(objConf, null, 2)}</pre>
      <hr />
      <p>block days: {JSON.stringify(canBlockDays)}</p>
      <p>edad: {JSON.stringify(isRangeOfAge)}</p>
      <p>past days: {JSON.stringify(canSelectPastDates)} </p>
      <p>future days: {JSON.stringify(canSelectFutureDates)}</p>
      <p>enabled days: {JSON.stringify(canEnabledDays)}</p> 
      */}
    </>
  );
};
