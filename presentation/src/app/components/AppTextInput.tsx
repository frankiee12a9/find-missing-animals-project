import { TextField } from '@mui/material';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
  placeholder?: string;
  defaultValue?: string | undefined;
  onClick?: () => void;
  onKeyPress?: (e: any) => void;
  resize?: string;
  style?: any;
}

export default function AppTextInput(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.defaultValue,
  });
  return (
    <TextField
      {...props}
      {...field}
      multiline={props.multiline}
      rows={props.rows}
      type={props.type}
      onKeyPress={props.onKeyPress}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      placeholder={props.placeholder}
      style={props.style}
    />
  );
}
