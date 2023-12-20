import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import classes from "./InputExpense.module.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../store/expense-slice";

const InputExpense = () => {
  const dispatch = useDispatch();
  const [id,setId] = useState('');
  const [price, setPrice] = useState('');
  const [des, setDes] = useState('');
  const [category, setCategory] = useState("Select Category");
  
  const email = useSelector((state)=>state.auth.userId)
  const removedAt = email.replace('@', '');
  const sanitizedEmail = removedAt.replace('.', ''); 

  const EditCtx = useSelector((state) => state.expense.editOB);

  useEffect(()=>{
    setId(EditCtx.id);
    setPrice(EditCtx.price);
    setDes(EditCtx.description);
    setCategory(EditCtx.category);
  },[EditCtx.id, EditCtx.price, EditCtx.description, EditCtx.category])

  async function editData(id, updatedData) {
    const response = await fetch(
      `https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      console.log('No items to update');
      return;
    }

    let itemIdToUpdate;
    for (const key in data) {
      if (typeof data[key] === 'object') {
        if (data[key].expenseData.id === id) {
          itemIdToUpdate = key;
          break;
        }
      }
    }

    console.log("upID", itemIdToUpdate);

    if (itemIdToUpdate) {
      const updateResponse = await fetch(
        `https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}/${itemIdToUpdate}.json`,
        {
          method: "PUT",
          body: JSON.stringify({ expenseData: updatedData }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const updateData = await updateResponse.json();

      if (updateData) {
        console.log("PUT Successful");
        dispatch(expenseAction.setReRender({ reRender: true }));
      } else {
        console.log("PUT Failed");
      }
    } else {
      console.log("Item not found for update");
    }
  }



  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      id: id || Date.now(),
      price,
      description: des,
      category,
    };
    if(id){
      editData(id,expenseData)
    }else{
    const response = await fetch(`https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`, {
        method: "POST",
        body: JSON.stringify({ expenseData }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();
      console.log("D", data);

      if (response.ok) {
        console.log("POST Successful");
      }
    // console.log(expenseData);
  }
    dispatch(expenseAction.addExpense(expenseData))
    setId(null);
    setPrice('');
    setDes('');
    setCategory("Select Category");
}

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
            <option value="recharge">Recharge</option>
          </select>
        </div>
      </div>
      <button type="submit" className={classes.btn}>
      {id ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default InputExpense;