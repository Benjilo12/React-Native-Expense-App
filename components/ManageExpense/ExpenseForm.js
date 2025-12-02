import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";

export default function ExpenseForm() {
  function amountChangedHandler(text) {
    console.log(text);
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
            onChangeText: amountChangedHandler,
          }}
        />
        <Input
          style={Styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: () => {},
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false, //default is true
        }}
      />
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
});
