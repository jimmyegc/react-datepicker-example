import DatePicker from "react-datepicker"
import { Button } from "../../../components/ui"
import { subDays, addDays} from "date-fns";
import { useState } from "react";
export const Agenda = () => {

    const [startDate, setStartDate] = useState(new Date())
  const styleHighlighted = {
    backgroundColor: 'blue',
    textColor: "white"
  }

  const excludedDates= [
    subDays(new Date(), 4),
    subDays(new Date(), 3),
    subDays(new Date(), 2),
    subDays(new Date(), 1),
  ]

  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-2": [
        subDays(new Date(), 4),
        subDays(new Date(), 3),
        subDays(new Date(), 2),
        subDays(new Date(), 1),
      ],
    },
    {
      "react-datepicker__day--highlighted-custom-2": [
        addDays(new Date(), 1),
        addDays(new Date(), 2),
        addDays(new Date(), 3),
        addDays(new Date(), 4),
      ],
    },
  ];

  const handleClick = () => {
    console.log('clicked!')
  }


  return (<>
    <div>Agenda</div>
    <div className="container">
        <DatePicker          
          selected={startDate}  
          onChange={(date) => setStartDate(date)}
          onKeyDown={(e) => e.preventDefault()}
          highlightDates={highlightWithRanges}
          excludeDates={excludedDates}
          renderDayContents={(day) => <span>{day}</span>}

        />
        { JSON.stringify(startDate)}
      </div>

    <div className="container mt-4">
      <Button      
          className="btn btn-primary"                
          clickHandler={handleClick}
        >
          Click me!
      </Button>
    </div>
    </>
  )
}
