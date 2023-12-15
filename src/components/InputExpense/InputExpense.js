import React, { useContext, useState, useEffect } from "react";
import Input from "../UI/Input";
import classes from "./InputExpense.module.css";
import AuthContext from "../store/AuthContext";
import EditExpenseContext from "../store/EditExpenseContext";

const InputExpense = (props) => {
  const [id, setId] = useState(null); 
  const [price, setPrice] = useState('');
  const [des, setDes] = useState('');
  const [category, setCategory] = useState('petrol');
  const authCtx = useContext(AuthContext);
  const removedAt = authCtx.email.replace('@', '');
  const sanitizedEmail = removedAt.replace('.', '');
  const EditCtx = useContext(EditExpenseContext);

  useEffect(() => {
    setId(EditCtx.id);
    setPrice(EditCtx.price);
    setDes(EditCtx.description);
    setCategory(EditCtx.category);
  }, [EditCtx.id, EditCtx.price, EditCtx.description, EditCtx.category]);

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
        EditCtx.setUpdatedData(true);
        console.log("PUT Successful");
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

    if (id) {
      await editData(id, expenseData);
    } else {
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
    }

    props.addExpense(expenseData);
    console.log(expenseData);

    setId(null);
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
        {id ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

export default InputExpense;
