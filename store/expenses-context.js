import { createContext, useReducer } from "react";

// Dummy expense data for initial app state
const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  // ...more dummy items
];

// Create a context with default structure
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

// Reducer handles adding, updating, and deleting expenses
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // Create a unique ID for the new expense
      const id = new Date().toString() + Math.random().toString();
      // Add new expense to the top of the list
      return [{ ...action.payload, id: id }, ...state];

    case "UPDATE":
      // Find the index of the expense we want to update
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      // Get the current expense and merge new data into it
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };

      // Update the array with the modified expense
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      // Return all expenses except the one with the matching id
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  // Manage expenses state with useReducer
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  // Add new expense
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  // Remove an expense by ID
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  // Update an existing expense
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  // Value passed to context consumers
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  // Provide context to the whole app
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
