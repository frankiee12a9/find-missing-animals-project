import {
  Button,
  Container,
  Fab,
  FormControlLabel,
  FormLabel,
  makeStyles,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { Add } from '@mui/icons-material';
import { SyntheticEvent, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Postcode from '../utils/Postcode';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  },
  container: {
    width: 500,
    height: 710,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      height: '100vh',
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddPost = () => {
  const classes = useStyles();
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
        <Fab color="primary" className={classes.fab}>
          <Add />
        </Fab>
      </Tooltip>
      <Modal open={open}>
        <Container className={classes.container}>
          <form className={classes.form} autoComplete="off">
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                label="Title"
                size="small"
                style={{ width: '100%' }}
              />
            </div>
            <div className={classes.item}>
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
            <div className={classes.item}>
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
            <div className={classes.item}>
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
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity="success">
          포스트 등록 완료하였습니다!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddPost;
