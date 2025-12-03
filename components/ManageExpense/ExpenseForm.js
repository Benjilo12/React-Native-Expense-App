import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Input from "./Input";
import Button from "../ExpensesOutput/UI/Button";

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) {
  // State to store all input values in one object
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  // Generic handler for updating any input field
  function InputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  // Handler for form submission
  function SubmitHandler() {
    const expenseData = {
      amount: +inputValues.amount, // convert string to number
      date: new Date(inputValues.date), // convert string to Date object
      description: inputValues.description,
    };

    // Validate the input data (optional)
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    // If any input is invalid, you can handle it here (e.g., show an error message)
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // You can show an alert or some error message here
      Alert.alert("Invalid input values - please check your entered data.");
      return;
    }

    onSubmit(expenseData); // call the parent function
  }

  return (
    <View style={Styles.form}>
      <Text style={Styles.title}>Expense Form</Text>

      <View style={Styles.inputRow}>
        <Input
          style={Styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: InputChangedHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />

        <Input
          style={Styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: InputChangedHandler.bind(this, "date"),
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: InputChangedHandler.bind(this, "description"),
        }}
      />

      <View style={Styles.buttons}>
        <Button style={Styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>

        <Button style={Styles.button} onPress={SubmitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
