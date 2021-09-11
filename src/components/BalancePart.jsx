import { Box, Typography, makeStyles } from '@material-ui/core';

import './style.css';

const useStyles = makeStyles((theme) => ({
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
}));

const BalancePart = ({ total, expenseTotal, incomeTotal }) => {
  const classes = useStyles();
  return (
    <>
      <Box>
        <Typography variant='h4' align='center'>
          Your Balance
        </Typography>
        <Typography variant='h3' align='center'>
          {total}
        </Typography>
        <Box className='inc-exp-container'>
          <Box>
            <Typography variant='h5' align='center'>
              INCOME
            </Typography>
            <Typography variant='h4' align='center' className={classes.income}>
              {incomeTotal}
            </Typography>
          </Box>
          <Box>
            <Typography variant='h5' align='center'>
              EXPENSE
            </Typography>
            <Typography variant='h4' align='center' className={classes.expense}>
              {expenseTotal}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BalancePart;
