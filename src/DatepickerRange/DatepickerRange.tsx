import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// https://getbootstrap.com/docs/5.0/components/toasts/


interface DRPProps {
  title: string;
  status: "enabled" | "disabled";
  list: ListItem[];
  onListChange: (e: ListItem[]) => void;
}

interface ListItem {
  id: string;
  rawDate: string;
  humanDate: string;
  status: string;
}

const formatDate = (newDate) => {
  const date = new Date(newDate);
  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


export const DatepickerRange = ({
  title,
  status,
  list,
  onListChange
}: DRPProps) => {
  /*
  Fecha: 07092024
  Author: Jimmy García
  Contexto: Este componente permite habilitar e inactivar una fecha o rango de fechas para
  guardarlos en una lista.
  */
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //const [list, setList] = useState([])

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(`${start}-${end}`)
    if (end != null) {
      const isSameDay = new Date(start).getTime() === new Date(end).getTime();
      const humanDate = `${isSameDay}` ? formatDate(start) : `(${formatDate(start)}-${formatDate(end)})`;
      const rawDate = isSameDay ? `${start}@${end}` : `${start}@${end}`;
      const newDateSelected = {
        id: crypto.randomUUID(),
        rawDate,
        humanDate,
        status,
      };
      onListChange([...list, newDateSelected]);
      setStartDate(null)
      setEndDate(null);
    }
  };

  const handleRemoveItem = (id) => {
    const filter = list.filter((item) => item.id != id);
    onListChange(filter);
  };

  return (<>

    <div>DatepickerRange</div>
    <DatePicker
      showIcon
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      toggleCalendarOnIconClick
      isClearable
    />
    <br />
    {list?.map((item) => (
      <div
        key={item.id}
      >
        <p>
          {item.humanDate}
          {/* {JSON.stringify(item, null, 2)} */}
          <button onClick={() => handleRemoveItem(item.id)}>delete</button>
        </p>
      </div>
    ))}
    <pre>
      {JSON.stringify(list, null, 2)}
    </pre>

  </>
  )
}
