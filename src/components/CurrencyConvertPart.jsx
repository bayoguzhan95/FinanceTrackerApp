import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, makeStyles, MenuItem, TextField, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    marginLeft: '60px',
  },

  balanceInfo: {
    marginTop: '15px',
  },
  currencyInput: {
    paddingRight: '100px',
  },
  convertButton: {
    marginTop: '10px',
  },
}));

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=81ef937dcf2706285b6149dc1631f96f';

const CurrencyConvertPart = ({ total }) => {
  const classes = useStyles();

  const [rate, setRate] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currency, setCurrency] = useState();
  const [firstCurrency, setFirstCurrency] = useState();
  const [secondCurrency, setSecondCurrency] = useState();

  const getRate = (firstCurrency, secondCurrency) => {
    axios({
      method: 'GET',
      url: `https://free.currconv.com/api/v7/convert?q=${firstCurrency}_${secondCurrency}&compact=ultra&apiKey=5a49beefa5e7696bc287`,
    })
      .then((response) => {
        setRate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setCurrency(data.base);
      });
  }, []);

  return (
    <>
      <Container>
        <form className={classes.form} autoComplete='off'>
          <Box display='flex'>
            <Box className={classes.balanceInfo}>
              <Typography variant='h5' align='center'  >
                My Balance : {total}
              </Typography>
            </Box>
            <Box className={classes.item}>
              <TextField
                className={classes.currencyInput}
                select
                label='Currency'
                value={firstCurrency || ''}
                onChange={(e) => setFirstCurrency(e.target.value)}
              >
                {currencyOptions.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box className={classes.item}>
              <TextField
                className={classes.currencyInput}
                select
                label='Currency'
                value={secondCurrency || ''}
                onChange={(e) => setSecondCurrency(e.target.value)}
              >
                {currencyOptions.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box>
              <Button
                className={classes.convertButton}
                variant='contained'
                color='primary'
                onClick={() => {
                  getRate(firstCurrency, secondCurrency);
                }}
                disabled={!firstCurrency || !secondCurrency}
              >
                Convert
              </Button>
            </Box>
          </Box>

          <Box></Box>
          {rate.length !== 0 ? (
            <Typography variant='h5' align='center'>
              Converted Price :{rate[`${firstCurrency}_${secondCurrency}`] * total}
            </Typography>
          ) : null}
        </form>
      </Container>
    </>
  );
};

export default CurrencyConvertPart;
