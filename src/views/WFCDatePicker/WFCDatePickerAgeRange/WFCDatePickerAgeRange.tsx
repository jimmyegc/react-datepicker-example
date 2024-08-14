import { useWFCDatePicker } from "../useWFCDatePicker";

export const WFCDatePickerAgeRange = () => {

  const { age, handleAgeValidation, validationMessage } = useWFCDatePicker()

  return (<>
    <div>WFCDatePickerAgeRange</div>
    <div>
      <label>Edad</label>
      <input
        type="number"
        value={age}
        onChange={handleAgeValidation}
      />
      {validationMessage && <span>{validationMessage}</span>}
    </div>
  </>)
};
