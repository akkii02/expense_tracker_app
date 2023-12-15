import React, { useEffect, useState, useContext } from 'react';
import InputExpense from '../InputExpense/InputExpense';
import OutputExpense from '../OutputExpense/OutputExpense';
import AuthContext from '../store/AuthContext';
import EditExpenseContext from '../store/EditExpenseContext';

function Body() {
  const [expenses, setExpenses] = useState([]);
  const [reRender,setReRender] = useState(false);
  const authCtx = useContext(AuthContext);
  const removedAt = authCtx.email.replace('@', '');
  const sanitizedEmail = removedAt.replace('.', '');
  const EditCtx = useContext(EditExpenseContext);

  const addExpenseHandler = (newExpense) => {
    const newExpenseWithId = {
      ...newExpense,
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpenseWithId]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`
        );
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
  
        if (data) {
          const fetchedExpenses = Object.keys(data).map((key) => {
            const expenseData = data[key].expenseData;
            return {
              id: expenseData.id,
              category: expenseData.category,
              description: expenseData.description,
              price: expenseData.price,
            };
          });
  
          setExpenses(fetchedExpenses);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchData();
  }, [sanitizedEmail,reRender,EditCtx.updatedData]);
  
  async function updateData(id) {
    const response = await fetch(`https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`, {
      method: "GET",
    });
  
    const data = await response.json();
    // console.log("update", data);
    if (!data || Object.keys(data).length === 0) {
      console.log('No items to update');
      return;
    }
    let itemIdUpdatedata;
    for (const key in data) {
      if (typeof data[key] === 'object') {
        if (data[key].expenseData.id === id) {
          itemIdUpdatedata = key;
          break;
        }
      }
    }
    console.log("upID", itemIdUpdatedata);
    const res = await fetch(`https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}/${itemIdUpdatedata}.json`,
    {
      method:"DELETE",
    })
    
  if (res.ok) {
    alert('Item deleted successfully');
    setReRender(true)
  } else {
    console.error('Failed to delete item');
  }
  }
  
  return (
    <>
      <InputExpense addExpense={addExpenseHandler} />
      <OutputExpense expenses={expenses} getUpdateData={updateData} />
    </>
  );
}

export default Body;
