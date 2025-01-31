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
import { observer } from "mobx-react-lite";
import store from "../../store/store";

const FormMovie = observer(({ /* addOrEdit, */ closeAction }) => {
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]); // Error states

  const inputTitles = [
    "Title",
    "Year",
    "Director",
    "Cinematographer/DP",
    "Starring",
    "Description",
  ];

  const handleInputChange = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);

    // Clear fields error if text is entered
    const newErrors = [...errors];
    if (text.trim().length > 0) {
      newErrors[index] = false;
    }
    setErrors(newErrors);
  };

  const handlePostMovie = () => {
    const newErrors = inputs.map((input) => input.trim().length === 0);
    setErrors(newErrors);

    if (newErrors.includes(true)) {
      store.setError("Please fill in all form fields");
    } else {
      const newMovieObj = {
        title: inputs[0],
        year: inputs[1],
        director: inputs[2],
        cinematographer: inputs[3],
        starring: inputs[4],
        description: inputs[5],
      };

      store.postNewMovie(newMovieObj);
    }
  };

  useEffect(() => {
    if (store.newMoviePostingCompleted) {
      setInputs(["", "", "", "", "", ""]);
    }
  }, [store.newMoviePostingCompleted]);

  return (
    <BottomSheetScrollView>
      <View style={{}}>
        <View
          style={{
            padding: 8,
            paddingRight: 16,
            paddingLeft: 16,
          }}
        >
          <View style={{}}>
            <Text
              style={[
                allStyle.text,
                allStyle.bold,
                { color: "#333", marginBottom: 8 },
              ]}
            >
              Add New Movie
            </Text>
            <View style={{ height: 38 }}>
              {store.movieIsBeingPosted && (
                <ActivityIndicator
                  size='small'
                  color='#002b36'
                  style={{ marginTop: 8 }}
                />
              )}

              {store.newMoviePostingCompleted && (
                <View
                  style={[
                    allStyle.successMessage,
                    {
                      marginTop: 0,
                    },
                  ]}
                >
                  <Text style={[allStyle.text, { paddingLeft: 8 }]}>
                    {store.newMoviePostingCompleted}
                  </Text>
                </View>
              )}

              {store.errorMessage && store.errorMessage.length > 0 && (
                <View
                  style={[
                    allStyle.errorMessage,
                    {
                      marginTop: 0,
                    },
                  ]}
                >
                  <Text style={[allStyle.text, { paddingLeft: 8 }]}>
                    {store.errorMessage}
                  </Text>
                </View>
              )}
            </View>

            <View>
              {inputs.map((input, index) => (
                <View key={index} style={{ marginBottom: 4 }}>
                  <TextInput
                    style={[
                      styles.input,
                      index === 4 && styles.inputMultiLine,
                      index === 5 && styles.inputMultiLineLarge,
                      errors[index] && { borderColor: "#cb4b16" },
                    ]}
                    placeholder={inputTitles[index]}
                    value={input}
                    multiline
                    numberOfLines={[
                      index === 5 && 4,
                      index === 4 && 2,
                      index <= 3 && 1,
                    ]}
                    onChangeText={(text) => handleInputChange(text, index)}
                  />
                  {errors[index] && (
                    <Text style={[allStyle.text, { color: "#cb4b16" }]}>
                      This field is required
                    </Text>
                  )}
                </View>
              ))}
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%", paddingRight: 5 }}>
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={handlePostMovie}
                >
                  <Text style={[allStyle.text, allStyle.bold]}>Add Movie</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: "50%", paddingLeft: 5 }}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#839496" }]}
                  onPress={closeAction}
                >
                  <Text style={[allStyle.text, allStyle.bold]}>Close</Text>
                </TouchableOpacity>
              </View>
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
    color: "#333",
    fontFamily: "Open Sans",
  },
  inputMultiLine: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    minHeight: 50,
    color: "#333",
    fontFamily: "Open Sans",
  },
  inputMultiLineLarge: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    minHeight: 100,
    color: "#333",
    fontFamily: "Open Sans",
  },
});

export default FormMovie;
