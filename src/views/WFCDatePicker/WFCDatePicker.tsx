//import { componentsMock } from "../../WFCFormInputDatePicker/componentsMock";
import { useWFCDatePicker } from "./useWFCDatePicker";
import { WFCDatePickerAgeRange } from "./WFCDatePickerAgeRange/WFCDatePickerAgeRange";
import { WFCDatePickerBlockDays } from "./WFCDatePickerBlockDays/WFCDatePickerBlockDays";
import { WFCDatePickerEnabledDays } from "./WFCDatePickerEnabledDays/WFCDatePickerEnabledDays";
import { WFCDatePickerFutureDays } from "./WFCDatePickerFutureDays/WFCDatePickerFutureDays";
import { WFCDatePickerPastDays } from "./WFCDatePickerPastDays/WFCDatePickerPastDays";

export const WFCDatePicker = () => {
  const {
    objConf,
    options,
    option,
    canBlockDays,
    isRangeOfAge,
    canSelectPastDates,
    canSelectFutureDates,
    canEnabledDays,
  } = useWFCDatePicker();

  return (
    <>
      {/* Bloqueo de días */}
      {option === options.custom && canBlockDays && <WFCDatePickerBlockDays />}
      {/* Rango de Edad */}
      {option === options.custom && isRangeOfAge && <WFCDatePickerAgeRange />}
      {/* Habilita fechas pasadas */}
      {option === options.custom && canSelectPastDates && (
        <WFCDatePickerPastDays />
      )}
      {/* Habilita fechas futuras  */}
      {option === options.custom && canSelectFutureDates && (
        <WFCDatePickerFutureDays />
      )}
      {/* Habilitar días */}
      {option === options.custom && canEnabledDays && (
        <WFCDatePickerEnabledDays />
      )}
      {/* Default */}
      {option === options.default && <div>Default</div>}
      <hr />
      {/* <pre>{JSON.stringify(componentsMock, null, 2)}</pre>
       */}
      <pre>{JSON.stringify(objConf, null, 2)}</pre>
      <hr />
      <p>block days: {JSON.stringify(canBlockDays)}</p>
      <p>edad: {JSON.stringify(isRangeOfAge)}</p>
      <p>past days: {JSON.stringify(canSelectPastDates)} </p>
      <p>future days: {JSON.stringify(canSelectFutureDates)}</p>
      <p>enabled days: {JSON.stringify(canEnabledDays)}</p>
    </>
  );
};
