import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import InputExpense from './InputExpense';

const mockStore = configureStore();

describe('InputExpense component', () => {
 
  it('renders without crashing', () => {
    const store = mockStore({
      auth: { userId: 'exampleUserId' },
      expense: { editOB: {} },
      theme: { isDarkTheme: false },
    });
    render(
      <Provider store={store}>
        <InputExpense />
      </Provider>
    );
  });


 
  it('validates form submission with empty fields', () => {
    const store = mockStore({
      auth: { userId: 'exampleUserId' },
      expense: { editOB: {} },
      theme: { isDarkTheme: false },
    });
    render(
      <Provider store={store}>
        <InputExpense />
      </Provider>
    );
    fireEvent.click(screen.getByText('Add Expense'));

    const actions = store.getActions();
    expect(actions).not.toContainEqual({ type: 'expense/addExpense' });
  });

 
  it('validates form submission with invalid price (non-numeric)', () => {
    const store = mockStore({
      auth: { userId: 'exampleUserId' },
      expense: { editOB: {} },
      theme: { isDarkTheme: false },
    });
    render(
      <Provider store={store}>
        <InputExpense />
      </Provider>
    );
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: 'invalidPrice' } });
    fireEvent.click(screen.getByText('Add Expense'));

    const actions = store.getActions();
    expect(actions).not.toContainEqual({ type: 'expense/addExpense' });
  });


  it('validates form submission with negative price', () => {
    const store = mockStore({
      auth: { userId: 'exampleUserId' },
      expense: { editOB: {} },
      theme: { isDarkTheme: false },
    });
    render(
      <Provider store={store}>
        <InputExpense />
      </Provider>
    );
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '-30' } });
    fireEvent.click(screen.getByText('Add Expense'));

    const actions = store.getActions();
    expect(actions).not.toContainEqual({ type: 'expense/addExpense' });
  });

 
  it('checks theme-based styling', () => {
    const store = mockStore({
      auth: { userId: 'exampleUserId' },
      expense: { editOB: {} },
      theme: { isDarkTheme: true },
    });
    render(
      <Provider store={store}>
        <InputExpense />
      </Provider>
    );
  });

  it('validates form submission with a large description', () => {
    const store = mockStore({
      auth: { userId: 'exampleUserId' },
      expense: { editOB: {} },
      theme: { isDarkTheme: false },
    });
    render(
      <Provider store={store}>
        <InputExpense />
      </Provider>
    );
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'This is a very large description that exceeds the limit' },
    });
    fireEvent.click(screen.getByText('Add Expense'));

    const actions = store.getActions();
    expect(actions).not.toContainEqual({ type: 'expense/addExpense' });
  });

 
  it('validates form submission with an invalid expense category', () => {
    const store = mockStore({
      auth: { userId: 'exampleUserId' },
      expense: { editOB: {} },
      theme: { isDarkTheme: false },
    });
    render(
      <Provider store={store}>
        <InputExpense />
      </Provider>
    );
    fireEvent.change(screen.getByLabelText('Expense Category:'), { target: { value: 'invalidCategory' } });
    fireEvent.click(screen.getByText('Add Expense'));

    const actions = store.getActions();
    expect(actions).not.toContainEqual({ type: 'expense/addExpense' });
  });
});
