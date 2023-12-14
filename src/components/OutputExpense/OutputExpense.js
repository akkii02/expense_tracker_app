import React from 'react';
import classes from './OutputExpense.module.css';
const OutputExpense = ({ expenses }) => {
  return (
    <div className={classes.main}>
      <h2 className={classes.header}>Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id} className={classes.li}>
              <p><strong>{expense.description}</strong></p> - <p>${expense.price}</p> <p>({expense.category})</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OutputExpense;
