import React from "react";
import classes from "./OutputExpense.module.css";

const OutputExpense = ({ expenses }) => {
  // Fix the reduce function to properly sum up the expenses
  const totalAmount = expenses.reduce((accumulator, expense) => {
    return accumulator + Number(expense.price);
  }, 0);

  return (
    <>
      <div className={classes.main}>
        <h2 className={classes.header}>Expense List</h2>
        {expenses.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          <ul className={classes.ul}>
            {expenses.map((expense) => (
              <li key={expense.id} className={classes.li}>
                <div className={classes.box}>{expense.description}</div> 
                <div className={classes.boxs}><p>{expense.price}₹</p>
               <p>{expense.category} </p></div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className={classes.sidebar}>
        <h3 className={classes.sideHeading}>Total Amount</h3>
        {/* Display the calculated totalAmount */}
        <h1 className={classes.totalAmount}> {totalAmount}₹</h1>
      </span>
    </>
  );
};

export default OutputExpense;
