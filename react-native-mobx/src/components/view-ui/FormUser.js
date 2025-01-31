import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { allStyle } from "../../styles/allStyle";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import store from "../../store/store";
import { observer } from "mobx-react-lite";

const FormUser = observer(({ closeAction }) => {
  const fieldTitles = ["Email", "First Name", "Password", "Confirm Password"];
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([false, false, false, false]); // Error states
  const [passwordError, setPasswordError] = useState(null); // for password mismatch

  const handleInputChange = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);

    // Clear general error if text is entered
    const newErrors = [...errors];
    if (text.trim().length > 0) {
      newErrors[index] = false;
    }
    setErrors(newErrors);

    // Clear password error if passwords match
    if (index === 3 && text === newInputs[2]) {
      setPasswordError(null);
    }
  };

  const handleRegisterButton = () => {
    const newErrors = inputs.map((input) => input.trim().length === 0);
    setErrors(newErrors);

    // Check password match
    if (inputs[2] !== inputs[3]) {
      setPasswordError("Passwords must match");
      return;
    }

    if (newErrors.includes(true)) {
      setPasswordError("Please complete all form fields");
    } else {
      handleRegistration();
    }
  };

  const handleRegistration = () => {
    const newUserObj = {
      name: inputs[1],
      email: inputs[0],
      password: inputs[2],
    };
    store.postNewUser(newUserObj);
  };

  useEffect(() => {
    if (store.newUserRegistrationCompleted) {
      setInputs(["", "", "", ""]);
      setTimeout(() => {
        closeAction();
      }, 3500);
    }
  }, [store.newUserRegistrationCompleted]);

  return (
    <BottomSheetScrollView>
      <View>
        <View
          style={{
            padding: 16,
            // backgroundColor: "orange",
            paddingBottom: 140,
          }}
        >
          <View style={{ marginBottom: 100 }}>
            <Text style={[allStyle.text, allStyle.bold, allStyle.color3]}>
              Register New User
            </Text>

            <View
              style={{
                marginBottom: 8,
                height: 40,
              }}
            >
              {store.registeringNewUser && (
                <ActivityIndicator
                  size='small'
                  color='#002b36'
                  style={{ marginTop: 8 }}
                />
              )}

              {passwordError && (
                <View style={allStyle.errorMessage}>
                  <Text style={[allStyle.text, { paddingLeft: 8 }]}>
                    {passwordError}
                  </Text>
                </View>
              )}

              {store.errorMessage && store.errorMessage.length > 0 && (
                <View style={allStyle.errorMessage}>
                  <Text style={[allStyle.text, { paddingLeft: 8 }]}>
                    {store.errorMessage}
                  </Text>
                </View>
              )}

              {store.newUserRegistrationCompleted && (
                <View style={allStyle.successMessage}>
                  <Text style={[allStyle.text, { paddingLeft: 8 }]}>
                    {store.newUserRegistrationCompleted}
                  </Text>
                </View>
              )}
            </View>

            <View>
              {inputs.map((input, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor:
                          errors[index] || (index === 2 && passwordError)
                            ? "#cb4b16"
                            : "#ccc",
                      },
                    ]}
                    placeholder={fieldTitles[index]}
                    secureTextEntry={index === 2 || index === 3} // Hide text for passwords
                    value={input}
                    onChangeText={(text) => handleInputChange(text, index)}
                  />
                  {errors[index] && (
                    <Text style={{ color: "#cb4b16" }}>
                      This field is required
                    </Text>
                  )}
                </View>
              ))}
            </View>

            <View>
              <TouchableOpacity
                style={[styles.button]}
                onPress={handleRegisterButton}
              >
                <Text style={[allStyle.text, allStyle.bold]}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "#839496", marginTop: 10 },
                ]}
                onPress={closeAction}
              >
                <Text style={[allStyle.text, allStyle.bold]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </BottomSheetScrollView>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#002b36",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontFamily: "Open Sans",
    color: "#333",
  },
});

export default FormUser;
