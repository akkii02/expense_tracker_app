import React, { useContext, useState } from "react";
import Input from "../UI/Input";
import classes from "./InputExpense.module.css";
import AuthContext from "../store/AuthContext";

const InputExpense = (props) => {
  const [price, setPrice] = useState('');
  const [des, setDes] = useState('');
  const [category, setCategory] = useState('petrol'); 
  const authCtx = useContext(AuthContext);
  const removedAt = authCtx.email.replace('@', '');
  const sanitizedEmail = removedAt.replace('.', '');
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      id: Date.now(),
      price,
      description: des,
      category,
    };
    const response = await fetch(`https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`,
    {
      method:"POST",
      body:JSON.stringify({expenseData}),
      headers:{
        "Content-type":"application/json"
      }
    })
    const data = response.json();
    console.log("D",data)
    if(data.ok){
      console.log("POST Successful");
    }

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
            <option value="movie">Movie</option>
            <option value="Electronic">Electronic</option>
            <option value="Recharge">Recharge</option>
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
