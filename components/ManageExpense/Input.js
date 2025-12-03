import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constant/styles";

export default function Input({ label, textInputConfig, style, invalid }) {
  // Start with base input styles
  let inputStyles = [styles.input];

  // Add extra styling if it's a multiline input
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      {/* Input label */}
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>

      {/* Text input with dynamic props */}
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Wrapper for each input
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },

  // Label styling
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },

  // Base input styling
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },

  // Extra styling only when input is multiline
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top", // Ensures text starts at the top
  },
  invalidInput: {
    color: GlobalStyles.colors.error50,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
});
