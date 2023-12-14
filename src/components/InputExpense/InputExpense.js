import React, { useState } from "react";
import Input from "../UI/Input";
import classes from "./InputExpense.module.css";

const InputExpense = (props) => {
  const [price, setPrice] = useState('');
  const [des, setDes] = useState('');
  const [category, setCategory] = useState('petrol'); 

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      price,
      description: des,
      category,
    };
props.addExpense(expenseData);
    console.log(expenseData);
    setPrice('');
    setDes('');
    setCategory('');
  };

  return (
    <form className={classes.main} onSubmit={handleFormSubmit}>
      <div className={classes.body}>
        <div className={classes.input}>
          <Input
            type="number"
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={classes.input}>
          <Input
            type="text"
            label="Description"
            value={des}
            onChange={(e) => setDes(e.target.value)}
          />
        </div>
        <div className={classes.input}>
          <label className={classes.label} htmlFor="expenseCategory">Expense Category:</label>
          <select
            id="expenseCategory"
            className={classes.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="petrol">Petrol</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
          </select>
        </div>
      </div>
      <button type="submit" className={classes.btn}>
        Add Expense
      </button>
    </form>
  );
};

export default InputExpense;
