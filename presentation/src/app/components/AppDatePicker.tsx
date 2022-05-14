import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { date } from 'yup';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// Note: Custom DatePicker ref: https://stackoverflow.com/questions/66355926/how-can-i-add-a-date-range-with-a-single-input-to-react-datepicker#_=_
export default function AppDatePicker() {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);

  const onChange = (dates: any) => {
    const [start, end] = dates;
    console.log('dates', dates);
    setFromDate(start);
    setToDate(end);
  };

  return (
    <DatePicker
      selected={fromDate}
      onChange={onChange}
      startDate={fromDate}
      endDate={toDate}
      selectsRange
      inline
    />
  );
}
