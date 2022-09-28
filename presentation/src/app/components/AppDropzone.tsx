import { UploadFile } from '@mui/icons-material';
import { FormControl, FormHelperText, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {}

export default function AppDropzone(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: null });

  const dzStyles = {
    display: 'flex',
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    alignItems: 'center',
    height: 184,
    width: 521,
  };

  const dzActive = {
    borderColor: 'green',
  };

  const [files, setFiles] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log('droppedFiles', acceptedFiles);
      setFiles(
        acceptedFiles.map((aFile: any) =>
          Object.assign(aFile, { preview: URL.createObjectURL(aFile) })
        )
      );
      field.onChange(acceptedFiles);
    },
    [field]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <FormControl
        error={!!fieldState.error}
        style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
      >
        <input {...getInputProps()} />
        <UploadFile sx={{ fontSize: '100px' }} />
        <Typography variant="h4">Drop image here</Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}
