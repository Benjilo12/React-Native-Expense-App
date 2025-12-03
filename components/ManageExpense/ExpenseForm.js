import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Input from "./Input";
import Button from "../ExpensesOutput/UI/Button";
import { GlobalStyles } from "../../constant/styles";

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) {
  // 🔹 State storing all input fields with validation
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  // 🔹 Update the value of any input field
  function InputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs, // keep other inputs the same
        [inputIdentifier]: { value: enteredValue, isValid: true }, // update one input
      };
    });
  }

  // 🔹 Handle form submission
  function SubmitHandler() {
    const expenseData = {
      amount: +inputs.amount.value, // convert string → number
      date: new Date(inputs.date.value), // convert string → Date object
      description: inputs.description.value,
    };

    // 🔹 Validate the data before submitting
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    // 🔹 If invalid, show feedback and stop submission
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      // Alert.alert("Invalid input", "Please check your entered values.");
      return; // stop here
    }

    // 🔹 Send validated data to parent component
    onSubmit(expenseData);
  }

  // 🔹 Determine if the form is invalid for styling or feedback
  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={Styles.form}>
      <Text style={Styles.title}>Expense Form</Text>

      {/* 🔹 Amount + Date Row */}
      <View style={Styles.inputRow}>
        <Input
          style={Styles.rowInput}
          label="Amount"
          isValid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: InputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />

        <Input
          style={Styles.rowInput}
          label="Date"
          isValid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: InputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>

      {/* 🔹 Description Input */}
      <Input
        label="Description"
        isValid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: InputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={Styles.errorText}>
          Invalid Input values -please check your entered data!{" "}
        </Text>
      )}
      {/* 🔹 Buttons */}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
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
