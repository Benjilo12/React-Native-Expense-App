import axios from "axios";

// Function to store expense data in the Firebase Realtime Database
export function storeExpense(expenseData) {
  axios.post(
    "https://react-native-course-d506d-default-rtdb.firebaseio.com/expenses.json",
    expenseData
  );
}
