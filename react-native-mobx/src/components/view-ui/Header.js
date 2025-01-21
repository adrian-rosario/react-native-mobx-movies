import React from "react";
import { allStyle } from "../../styles/allStyle";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import store from "../../store/store";
import UserDisplay from "./UserDisplay";

export default function Header() {
  return (
    <View style={styles.headJar}>
      <View style={styles.headL}>
        <Icon name='film' size={30} style={allStyle.textC} />
      </View>
      <View style={allStyle.headM}>
        <Text style={[allStyle.text, allStyle.textC, styles.headH1]}>
          Movie Ratings
        </Text>
      </View>
      <View style={styles.headR}>
        {store.userDetails && store.userDetails.name && (
          <UserDisplay userDetails={store.userDetails} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headJar: {
    marginTop: 55,
    flexDirection: "row",
    backgroundColor: "#073642",
    opacity: 1,
    paddingBottom: 4,
  },
  headL: {
    width: "15%",
    paddingLeft: "16",
    justifyContent: "center",
  },
  headM: {
    width: "50%",
  },
  headR: {
    width: "35%",
    alignItems: "flex-end",
  },
  headH1: {
    fontSize: 32,
  },
});
