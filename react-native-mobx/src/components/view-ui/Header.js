import React from "react";
import { allStyle } from "../../styles/allStyle";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import store from "../../store/store";
import UserDisplay from "./UserDisplay";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
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
        {store.userLoggedIn && <UserDisplay userDetails={store.userDetails} />}

        {store.userIsLoggingIn && (
          <View style={{ marginTop: 14, marginRight: 8 }}>
            <ActivityIndicator size='small' color='#fff' />
          </View>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  headJar: {
    paddingTop: 55,
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

export default Header;
