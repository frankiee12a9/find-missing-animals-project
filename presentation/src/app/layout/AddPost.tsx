import { Add } from '@mui/icons-material';
import { SyntheticEvent, useState } from 'react';
import Postcode from '../utils/Postcode';
import {
  Button,
  Container,
  Fab,
  Modal,
  Snackbar,
  TextField,
  Tooltip,
} from '@mui/material';

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
      <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
        <Fab color="primary">
          <Add />
        </Fab>
      </Tooltip>
      <Modal open={open}>
        <Container>
          <form autoComplete="off">
            <div>
              <TextField
                id="standard-basic"
                label="Title"
                size="small"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                defaultValue="Tell your story..."
                variant="outlined"
                label="Description"
                size="small"
                style={{ width: '100%' }}
              />
            </div>
            <>
              <input type="file" id="myFile" name="filename" />
            </>
            <br />
            {/* <div className={classes.item}>
							<TextField select label="Visibility" value="Public">
								<MenuItem value="Public">Public</MenuItem>
								<MenuItem value="Private">Private</MenuItem>
							</TextField>
						</div> */}
            <div>
              <Postcode />
              {/* <FormLabel component="legend">
								Who can comment?
							</FormLabel>
							<RadioGroup>
								<FormControlLabel
									value="Everybody"
									control={<Radio size="small" />}
									label="Everybody"
								/>
								<FormControlLabel
									value="My Friends"
									control={<Radio size="small" />}
									label="My Friends"
								/>
							</RadioGroup> */}
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: 20 }}
                onClick={() => setOpenAlert(true)}
              >
                등록
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(false)}
              >
                취소
              </Button>
            </div>
          </form>
        </Container>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        // onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      ></Snackbar>
    </>
  );
}
