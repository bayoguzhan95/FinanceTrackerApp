import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../redux/actions/expenses';
import { Add as AddIcon } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import ClearIcon from '@material-ui/icons/Clear';
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
  Box,
  IconButton,
} from '@material-ui/core';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=81ef937dcf2706285b6149dc1631f96f';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    top: 100,
    right: 300,
  },
  container: {
    width: 500,
    height: 400,
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
  cancelButton: {
    position: 'absolute',
    right: '10px',
  },
  saveButton: {
    textAlign: 'right',
  },
  
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Add = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [amount, setAmount] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currency, setCurrency] = useState();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setCurrency(data.base);
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const radioHandleChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (nameValue !== '' || radioValue !== '' || amount !== '') {
      setMessageType('success');
      setMessage('Successfulyy Created.');
      setOpenAlert(true);
      const data = {
        nameValue,
        amount,
        radioValue,
        createdAt: new Date(),
      };
      dispatch(addExpense(data));
      setOpen(false);
      setNameValue('');
      setAmount('');
      setRadioValue('');
    } else {
      setMessageType('error');
      setMessage('Please fill the all blanks');
      setOpenAlert(true);
    }
  };
  return (
    <>
      <Tooltip title='Add' aria-label='add' onClick={() => setOpen(true)}>
        <Fab color='primary' className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal open={open}>
        <Container className={classes.container}>
          <IconButton className={classes.cancelButton} onClick={() => setOpen(false)}>
            <ClearIcon />
          </IconButton>
          <form className={classes.form} autoComplete='off'>
            <Box className={classes.item}>
              <TextField
                id='standard-basic'
                label='Name'
                size='small'
                style={{ width: '100%' }}
                value={nameValue}
                onChange={handleNameChange}
              />
            </Box>
            <Box className={classes.item}>
              <TextField
                id='standard-basic'
                label='Amount'
                size='small'
                style={{ width: '100%' }}
                type='number'
                value={amount}
                onChange={handleAmountChange}
              />
            </Box>
            <Box className={classes.item}>
              <TextField select label='Currency' value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {currencyOptions.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {' '}
                    {option}{' '}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.item}>
              <FormLabel component='legend'>Income or Expense ?</FormLabel>
              <RadioGroup
                defaultValue='income'
                aria-label='finance'
                name='customized-radios'
                value={radioValue}
                onChange={radioHandleChange}
              >
                <FormControlLabel value='income' control={<Radio size='small' />} label='Income' />
                <FormControlLabel value='expenses' control={<Radio size='small' />} label='Expenses' />
              </RadioGroup>
            </Box>
            <Box className={classes.saveButton}>
              <Button variant='outlined' color='primary' style={{ marginRight: 25 }} onClick={handleClick}>
                Create
              </Button>
              <Button variant='outlined' color='secondary' onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </Box>
          </form>
        </Container>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={messageType}> {message} </Alert>
      </Snackbar>
    </>
  );
};

export default Add;
