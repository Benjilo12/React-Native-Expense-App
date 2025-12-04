import { createContext, useReducer } from "react";

// Create a context with default structure
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

// Reducer handles adding, updating, and deleting expenses
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // Create a unique ID for the new expense

      // Add new expense to the top of the list
      return [action.payload, ...state];
    case "SET":
      // Reverse to show the latest expenses first
      return action.payload.reverse();
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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  // Add new expense
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
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
    setExpenses: setExpenses,
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
