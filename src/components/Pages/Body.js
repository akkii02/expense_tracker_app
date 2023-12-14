import React, { useState } from 'react';
import InputExpense from '../InputExpense/InputExpense';
import OutputExpense from '../OutputExpense/OutputExpense';

function Body() {
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (newExpense) => {
    const newExpenseWithId = {
      ...newExpense,
      id: `expense-${expenses.length + 1}`,
    };

    setExpenses((prevExpenses) => [newExpenseWithId, ...prevExpenses]);
  };

  console.log("expenses", expenses);

  return (
    <>
      <InputExpense addExpense={addExpenseHandler} />
      <OutputExpense expenses={expenses} />
    </>
  );
}

export default Body;
