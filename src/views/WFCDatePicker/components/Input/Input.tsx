import { useEffect, useState } from "react";
import { useDebounce } from "../../useDebounce";
import { useWFCDatePicker } from "../../useWFCDatePicker";
import { AlertMessage } from "../AlertMessage/AlertMessage";

interface InputProps {
  className: string;
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
}

export const Input: React.FC<InputProps> = (
  { className, value, onClick, onChange },
  ref
) => {
  const { validHHMMstring } = useWFCDatePicker()

  const [time, setTime] = useState(value);
  const [validateTime, setValidateTime] = useState("");
  const debouncedSearch = useDebounce(time);

  useEffect(() => {
    const save = async () => {
      validate(debouncedSearch);
    };
    save();
  }, [debouncedSearch]);
 
  const validate = (hour) => {
    if (!hour) return;
    // console.log("validation", hour);
    if (validHHMMstring(hour)) {
      setTime(hour);
      //const fechaActualizada = actualizarHora(date, hour)
      //console.log("fechaActualizada", fechaActualizada)
      //const horaUTC = convertirAHoraUTC(fechaActualizada);
      //console.log("Hora en formato UTC:", horaUTC);
      //setStartDate(fechaActualizada)
      //console.log("updated", hour);
      onChange(hour);
      setValidateTime("");
    } else {
      setValidateTime("Hora inválida");
    }
    //setTime(e.target.value)
    //e.target?.focus()
  };

  return (
    <div>
      <input
        className={className}
        type="text"
        placeholder="HH:MM"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        onClick={onClick}
        style={{ width: 100 }}
      />
      {validateTime && (        
        <AlertMessage message={validateTime} />
      )}
    </div>
  );
};

//export default forwardRef(Input);
