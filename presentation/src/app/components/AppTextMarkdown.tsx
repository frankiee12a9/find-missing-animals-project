import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import MDEditor from '@uiw/react-md-editor';
import { useController, UseControllerProps } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';

interface Props extends UseControllerProps {
  label: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
  placeholder?: string;
  defaultValue?: string | undefined;
  onClick?: () => void;
  resize?: string;
}

export default function AppTextMarkdown(props: Props) {
  const [value, setValue] = React.useState('fuck you MDEditor');
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.defaultValue,
  });

  const handleInputChange = (event: ChangeEvent<{ value: string }>) => {
    const newValue = event.target as HTMLTextAreaElement;
    // field.onChange(event.currentTarget.value);
    field.onChange(newValue);
    // setValue(event.currentTarget.value);
    setValue(newValue.value);
  };

  return (
    <div className="container">
      {/* <MDEditor height={200} value={value} onChange={setValue} /> */}
      <FormControl fullWidth error={!!fieldState.error}>
        <div data-color-mode="light">
          <h3>Light</h3>
          <MDEditor
            {...props}
            {...field}
            height={300}
            value={value}
            onChange={(val) => {
              console.log(val);
              field.onChange(val);
              setValue(val!);
            }}
          />
        </div>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}
