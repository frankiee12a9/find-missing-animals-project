import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface Props {
  open: boolean;
  confirm: () => void;
}

export default function AppServiceTerms({ open, confirm }: Props) {
  return (
    <Dialog aria-labelledby="responsive-dialog-title" open={open}>
      <DialogTitle id="responsive-dialog-title">
        {'앱 서비스 이용 약관'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          이 기능은 로그인한 사용자만 이용하실 수있습니다. 기능을 이용하시려면
          로그인하세요.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={confirm}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
