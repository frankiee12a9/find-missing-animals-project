import { SxProps, TextField } from '@mui/material';
import { Theme } from '@mui/material/styles/experimental_extendTheme';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
  placeholder?: string;
  onClick?: () => void;
  resize?: string;
}

export default function AppTextInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });
  return (
    <TextField
      {...props}
      {...field}
      multiline={props.multiline}
      rows={props.rows}
      type={props.type}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      placeholder={props.placeholder}
    />
  );
}
