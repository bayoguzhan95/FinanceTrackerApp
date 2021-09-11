import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense, updateExpense } from '../redux/actions/expenses';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, IconButton, Box, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MuiAlert from '@material-ui/lab/Alert';
import './style.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
const ExpenseList = () => {
  const { expenseList: list } = useSelector((state) => state.expenses);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openAlert, setOpenAlert] = useState(false);

  const handleRemove = (item) => {

    dispatch(deleteExpense(item));
    setOpenAlert(true);
  };

  const handleUpdate = (item) => {
    dispatch(updateExpense(item));
    setOpenAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (

    <>
    {list.length !== 0 ? (
       <Box className='expense-list'>
       <TableContainer component={Paper}>
         <Table className={classes.table} aria-label='customized table'>
           <TableHead>
             <TableRow className="tableRow" >
               <StyledTableCell>Name</StyledTableCell>
               <StyledTableCell align='center'>Price</StyledTableCell>
               <StyledTableCell align='center'>Type</StyledTableCell>
               <StyledTableCell align='right'>Update / Delete</StyledTableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {list.map((item, i) => (
               <StyledTableRow key={i}>
                 <StyledTableCell component='th' scope='row'>
                   {item.nameValue}
                 </StyledTableCell>
                 <StyledTableCell align='center'>{item.amount}</StyledTableCell>
                 <StyledTableCell align='center'>{item.radioValue}</StyledTableCell>
                 <StyledTableCell align='right'>
                   <IconButton onClick={() => handleRemove(item)}>
                     <DeleteIcon />
                   </IconButton>
                   <IconButton onClick={() => handleUpdate(item)}>
                     <EditIcon />
                   </IconButton>
                 </StyledTableCell>
               </StyledTableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
 
       <Snackbar
         open={openAlert}
         autoHideDuration={4000}
         onClose={handleClose}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
       >
         <Alert onClose={handleClose} severity='success'>
           Succesfully removed.
         </Alert>
       </Snackbar>
     </Box>

    ) : (
      <Typography align='center'  variant='h4'  color='secondary' >
        Please Add Income or Expense !
      </Typography>
    )}


   
    </>
  );
};

export default ExpenseList;
