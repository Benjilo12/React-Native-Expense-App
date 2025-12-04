import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-d506d-default-rtdb.firebaseio.com";

// Function to store expense data in the Firebase Realtime Database
export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name; // { name: '-Nabc123xyz' }
  return id;
}

// Function to fetch expenses from the Firebase Realtime Database
export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

// Function to update an existing expense in the Firebase Realtime Database
export async function updateExpense(id, expenseData) {
  await axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
