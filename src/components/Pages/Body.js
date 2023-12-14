import React, { useEffect, useState, useContext } from 'react';
import InputExpense from '../InputExpense/InputExpense';
import OutputExpense from '../OutputExpense/OutputExpense';
import AuthContext from '../store/AuthContext';

function Body() {
  const [expenses, setExpenses] = useState([]);
  const authCtx = useContext(AuthContext);
  const removedAt = authCtx.email.replace('@', '');
  const sanitizedEmail = removedAt.replace('.', '');

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
  }, [sanitizedEmail]);
  
 
 
  return (
    <>
      <InputExpense addExpense={addExpenseHandler} />
      <OutputExpense expenses={expenses} />
    </>
  );
}

export default Body;
