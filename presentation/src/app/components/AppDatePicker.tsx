import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { date } from 'yup';

import { setPostParams } from '../../features/post/postSlice';
import { useAppDispatch } from '../store/storeConfig';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// Note: Custom DatePicker ref: https://stackoverflow.com/questions/66355926/how-can-i-add-a-date-range-with-a-single-input-to-react-datepicker#_=_
export default function AppDatePicker() {
  const dispatch = useAppDispatch();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);

  const onChange = (dates: any) => {
    const [start, end] = dates;
    // format Datetime to YYYY-MM-DD
    const formattedStartDate = start?.toISOString().slice(0, 10);
    formattedStartDate &&
      dispatch(
        setPostParams({
          fromDate: formattedStartDate,
        })
      );
    const formattedEndDate = end?.toISOString().slice(0, 10);
    formattedEndDate && dispatch(setPostParams({ toDate: formattedEndDate }));
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
