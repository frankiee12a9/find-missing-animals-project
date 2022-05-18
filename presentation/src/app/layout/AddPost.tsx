import {
  Add,
  DateRange,
  Edit,
  EmojiEmotions,
  PersonAdd,
  VideoCameraBack,
} from '@mui/icons-material';
import { SyntheticEvent, useState } from 'react';
import Postcode from '../utils/Postcode';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  ExtendModalUnstyled,
  Fab,
  Modal,
  ModalTypeMap,
  Snackbar,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const UserBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
});

export default function AddPost() {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (event: SyntheticEvent, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Create new post"
        sx={{
          position: 'fixed',
          bottom: 20,
          left: { xs: 'calc(50% - 25px)', md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <Edit />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={537}
          height={317}
          bgcolor={'background.default'}
          color={'text.primary'}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create post
          </Typography>
          <UserBox>
            <Avatar
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontWeight={500} variant="h6">
              John Doe
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: '100%' }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
          />
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <EmojiEmotions color="primary" />
            {/* <Image color="" /> */}
            <VideoCameraBack color="success" />
            <PersonAdd color="error" />
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button>Post</Button>
            <Button sx={{ width: '100px' }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
}
