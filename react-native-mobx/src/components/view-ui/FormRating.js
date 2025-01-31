import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { allStyle } from "../../styles/allStyle";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { LogBox } from "react-native";
import { observer } from "mobx-react-lite";
import store from "../../store/store";

const FormRating = observer(({ closeAction, movieObject }) => {
  const [open, setOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(null);
  const [ratingItems, setRatingItems] = useState([
    { label: "1 - Very Poor", value: "1" },
    { label: "2 - Not So Good", value: "2" },
    { label: "3 - Average", value: "3" },
    { label: "4 - Very Good", value: "4" },
    { label: "5 - Excellent", value: "5" },
  ]);
  const [comment, setComment] = useState("");

  // TODO: the implementation requiring this ignore is temporary
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

  const handleRatingPost = () => {
    if (ratingValue === null || comment === "") {
      store.setError("Please complete both fields");
    }
    if (comment !== "" && ratingValue !== null) {
      const ratingObj = {
        rating: ratingValue,
        comment,
      };
      store.postUserRating(movieObject.id, ratingObj);
    }
  };

  useEffect(() => {
    if (store.ratingPostedMessage) {
      setComment("");
      setRatingValue(null);
      setTimeout(() => {
        closeAction();
      }, 3500);
    }
  }, [store.ratingPostedMessage]);

  return (
    <BottomSheetScrollView
      scrollEnabled={!open}
      keyboardShouldPersistTaps='handled'
    >
      <View>
        <View
          style={{
            padding: 16,
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[allStyle.text, allStyle.bold, allStyle.color3]}>
                Movie: &nbsp;
              </Text>
              <Text style={[allStyle.text, allStyle.color3]}>
                {movieObject.title}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={[allStyle.text, allStyle.bold, allStyle.color3]}>
                Director: &nbsp;
              </Text>
              <Text style={[allStyle.text, allStyle.color3]}>
                {movieObject.director}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={[allStyle.text, allStyle.bold, allStyle.color3]}>
                DP: &nbsp;
              </Text>
              <Text style={[allStyle.text, allStyle.color3]}>
                {movieObject.cinematographer}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={[allStyle.text, allStyle.bold, allStyle.color3]}>
                Starring: &nbsp;
              </Text>
              <Text style={[allStyle.text, { color: "#333", width: "82%" }]}>
                {movieObject.starring}
              </Text>
            </View>

            {store.ratingIsBeingPosted && (
              <ActivityIndicator
                size='small'
                color='#002b36'
                style={{ marginTop: 8 }}
              />
            )}

            {store.errorMessage.length > 0 && (
              <View style={allStyle.errorMessage}>
                <Text style={allStyle.text}>{store.errorMessage}</Text>
              </View>
            )}

            {store.ratingPostedMessage.length > 0 && (
              <View style={allStyle.successMessage}>
                <Text style={[allStyle.text, { paddingLeft: 8 }]}>
                  {store.ratingPostedMessage}
                </Text>
              </View>
            )}

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 60,
                // backgroundColor: "blue",
                marginTop: 8,
                marginBottom: 6,
              }}
            >
              {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DropDownPicker
                  open={open}
                  value={ratingValue}
                  items={ratingItems}
                  setOpen={setOpen}
                  setValue={setRatingValue}
                  setItemsRating={setRatingItems}
                  placeholder='Select a rating.'
                  listItemLabelStyle={allStyle.textType}
                  placeholderStyle={[allStyle.textType, allStyle.color3]}
                  style={[styles.dropdown]}
                  scrollViewProps={false} // Disable internal scrolling
                />
              </View>
            </View>

            <TextInput
              placeholder='Comment'
              multiline
              numberOfLines={4}
              style={[allStyle.text, styles.commentField]}
              value={comment}
              onChangeText={setComment}
            />

            <View>
              <TouchableOpacity
                style={[styles.button]}
                onPress={handleRatingPost}
              >
                <Text style={[allStyle.text, allStyle.bold]}>Add Rating</Text>
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
    // </KeyboardAvoidingView>
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
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownContainer: {
    width: "100%",
  },
  dropdown: {
    borderWidth: 1,
    width: "100%",
    borderColor: "#ccc",
    borderRadius: 6,
  },
  commentField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 10,
    padding: 10,
    minHeight: 100,
    color: "#333",
  },
});

export default FormRating;
