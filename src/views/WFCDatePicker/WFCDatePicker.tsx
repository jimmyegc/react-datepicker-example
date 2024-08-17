//import { componentsMock } from "../../WFCFormInputDatePicker/componentsMock";
import { useWFCDatePicker } from "./useWFCDatePicker";
import { WFCDatePickerAgeRange } from "./WFCDatePickerAgeRange/WFCDatePickerAgeRange";
import { WFCDatePickerEnabledDays } from "./WFCDatePickerEnabledDays/WFCDatePickerEnabledDays";
import { WFCDatePickerBlockedDays } from "./WFCDatePickerBlockedDays/WFCDatePickerBlockedDays";
import { WFCDatePickerPastDays } from "./WFCDatePickerPastDays/WFCDatePickerPastDays";
import { WFCDatePickerFutureDays } from "./WFCDatePickerFutureDays/WFCDatePickerFutureDays";

export const WFCDatePicker = () => {
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
      {/* Rango de Edad */}
      {option === options.custom && isRangeOfAge && <WFCDatePickerAgeRange />}
      {/* Habilitar días */}
      {option === options.custom && canEnabledDays && (
        <WFCDatePickerEnabledDays />
      )}
      {/* Bloqueo de días */}
      {option === options.custom && canBlockDays && <WFCDatePickerBlockedDays />}      
      {/* Habilita fechas pasadas */}
      {option === options.custom && canSelectPastDates && (
        <WFCDatePickerPastDays />
      )}
      {/* Habilita fechas futuras  */}
      {option === options.custom && canSelectFutureDates && (
        <WFCDatePickerFutureDays />
      )}      
      {/* Default */}
      {option === options.default && <div>Default</div>}
      
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
