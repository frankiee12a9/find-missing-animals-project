import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import {
  Control,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';

import AppTextInput from '../components/AppTextInput';

interface Props extends UseControllerProps {
  control: Control<FieldValues, any>;
  defaultValue?: string | undefined;
}

const Postcode = (props: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [address, setAddress] = useState(null);

  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.defaultValue,
  });

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress(fullAddress);
    field.onChange(fullAddress);
    setIsShow(false);
  };

  if (isShow)
    return (
      <div>
        <button onClick={() => setIsShow(false)} title="Close">
          X
        </button>
        <DaumPostcode {...props} {...field} onComplete={handleComplete} />;
      </div>
    );

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <AppTextInput
        defaultValue={address !== null ? address : props.defaultValue}
        onClick={() => setIsShow(true)}
        control={props.control}
        name={props.name}
        label="Enter Your location or Post location"
      />
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
};

export default Postcode;
