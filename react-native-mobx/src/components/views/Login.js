import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../view-ui/Header";
import { allStyle } from "../../styles/allStyle";
import Icon from "react-native-vector-icons/Ionicons";
import store from "../../store/store";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }
    store.userLogin(email, password);
  };

  const handleLogout = () => {
    store.userLogout();
  };

  return (
    <LinearGradient
      colors={["#002b36", "#000000", "#002b36"]}
      start={{ x: 0, y: 0.25 }}
      end={{ x: 0, y: 0.75 }}
      style={allStyle.gradient}
    >
      <View>
        <Header />

        <View style={[allStyle.linedJar, { marginTop: 20 }]}>
          {/* top */}
          <View style={styles.cardTop}>
            <View style={{ flex: 1 }}>
              <Text style={[allStyle.text, allStyle.bold]}>
                Registered users will be able to post reviews &amp; movies.
              </Text>
            </View>
            <View
              style={{ justifyContent: "flex-end", paddingRight: 8 }}
            ></View>
          </View>

          {/* bottom */}
          <View style={styles.cardBottom}>
            <View style={{ marginLeft: 10, marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    height: 400,
                    width: "100%",
                  }}
                >
                  <View style={styles.formJar}>
                    <Text
                      style={[
                        allStyle.text,
                        // display icon at full opacity if logged in
                        {
                          marginBottom: 6,
                          opacity: store.userLoggedIn ? 1 : 0.75,
                        },
                      ]}
                    >
                      <Icon name='person' size={60} />
                    </Text>

                    {store.userDetails && store.userDetails.id && (
                      <Text style={[allStyle.text, { marginBottom: 12 }]}>
                        {store.userDetails.name}
                      </Text>
                    )}

                    <TextInput
                      style={[
                        styles.input,
                        allStyle.text,
                        { marginBottom: 18 },
                      ]}
                      placeholder='Email'
                      value={email}
                      onChangeText={setEmail}
                      keyboardType='email-address'
                      autoCapitalize='none'
                      autoComplete='email'
                      placeholderTextColor='#adb5bd'
                      editable={store.userDetails && !store.userDetails.id}
                    />
                    <TextInput
                      style={[
                        styles.input,
                        allStyle.text,
                        { marginBottom: 20 },
                      ]}
                      placeholder='Password'
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      autoCapitalize='none'
                      autoComplete='password'
                      placeholderTextColor='#adb5bd'
                      editable={store.userDetails && !store.userDetails.id}
                    />

                    <TouchableOpacity
                      style={[
                        styles.button,
                        store.userLoggedIn
                          ? { backgroundColor: "#2aa198" }
                          : "",
                      ]}
                      onPress={store.userLoggedIn ? handleLogout : handleLogin}
                    >
                      <Text style={[allStyle.text, allStyle.bold]}>
                        {store.userLoggedIn ? "Logout" : "Login"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  cardTop: {
    flexDirection: "row",
    marginBottom: 1,
    height: 32,
    alignItems: "center",
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    paddingLeft: 8,
    backgroundColor: "rgba(7, 54, 66, 1);",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(42, 161, 152, 1)",
  },
  cardBottom: {
    backgroundColor: "rgba(0,0,0,.5)",
    paddingBottom: 10,
    paddingRight: 8,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
  formJar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#002b36",
  },
  button: {
    backgroundColor: "#b58900",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default Login;
