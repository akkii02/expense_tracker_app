import React, { useContext } from "react";
import classes from "./OutputExpense.module.css";
import EditExpenseContext from "../store/EditExpenseContext";

const OutputExpense = (props) => {
  const EditCtx = useContext(EditExpenseContext)
  const totalAmount = props.expenses.reduce((accumulator, expense) => {
    return accumulator + Number(expense.price);
  }, 0);

  const editHandler = (expense) => {
    console.log("edit",expense.price)
    EditCtx.setId(expense.id)
    EditCtx.setPrice(expense.price);
    EditCtx.setCategory(expense.category);
    EditCtx.setDescription(expense.description);
  };
  const deleteHandler = (expenseID) => {
    console.log("edit",expenseID)
    props.getUpdateData(expenseID);
  }
 
  
 
  

  return (
    <>
      <div className={classes.main}>
        <h2 className={classes.header}>Expense List</h2>
        {props.expenses.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          <ul className={classes.ul}>
            {props.expenses.map((expense) => (
              <li key={expense.id} className={classes.li}>
                <div className={classes.box}>{expense.description}</div> 
                <div className={classes.boxs}><p>{expense.price}₹</p>
               <p>{expense.category} </p></div>
               <div className={classes.buttons}>
                <button onClick={()=>editHandler(expense)} className={classes.edit}>Edit</button>
                <button onClick={() => deleteHandler(expense.id)} className={classes.delete}>Delete</button>
               </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className={classes.sidebar}>
        <h3 className={classes.sideHeading}>Total Amount</h3>
        <h1 className={classes.totalAmount}> {totalAmount}₹</h1>
      </span>
    </>
  );
};

export default OutputExpense;
