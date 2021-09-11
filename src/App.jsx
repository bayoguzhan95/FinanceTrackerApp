import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import AddExpenseModal from './components/AddExpenseModal';
import BalancePart from './components/BalancePart';
import ExpenseList from './components/ExpenseList';
import Navbar from './components/Navbar';
import CurrencyConvertPart from './components/CurrencyConvertPart';

const App = () => {
  const { expenseList: list } = useSelector((state) => state.expenses);

  const [total, setTotal] = useState('');

  let incomeTotal = 0;
  let expenseTotal = 0;

  list.forEach((element) => {
    if (element.radioValue === 'income') {
      incomeTotal = incomeTotal + Number(element.amount);
    } else if (element.radioValue === 'expenses') {
      expenseTotal = expenseTotal + Number(element.amount);
    }
  });

  useEffect(() => {
    setTotal(incomeTotal - expenseTotal);
  }, [incomeTotal, expenseTotal]);

  return (
    <>
      <Navbar />
      <Grid>
        <BalancePart total={total} incomeTotal={incomeTotal} expenseTotal={expenseTotal} />
        <CurrencyConvertPart total={total} />
        <ExpenseList />
      </Grid>
      <AddExpenseModal />
    </>
  );
};

export default App;
