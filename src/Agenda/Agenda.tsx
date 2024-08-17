import React from 'react'

export const Agenda = () => {
     //const [listDisabledDays, setListDisabledDays] = useState([]);
  //const handleDisabledDaysChange = (e) => setListDisabledDays(e);

  const parseRejectionReasons = (input) => {
    return input.split('\n').map(line => {
      const [id, reason] = line.split(',');
      return { id: parseInt(id.trim()), reason: reason.trim() };
    });
  }

  const input = "1,Motivo de rechazo\n2,Opcion 2\n3,No le interesa";
  const result = parseRejectionReasons(input);
  console.log(result);

  const [startDate, setStartDate] = useState(new Date());
  const [timeIntervals, setTimeIntervals] = useState(15)

  return (<>
    <div>Agenda</div>
    <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          locale="es"
          showTimeSelect
          timeFormat="p"
          timeIntervals={timeIntervals}
          dateFormat="Pp"
          minTime={setHours(setMinutes(new Date(), 0), 17)}
          maxTime={setHours(setMinutes(new Date(), 30), 20)}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
  </>)
}
