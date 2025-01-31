import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { allStyle } from "../../styles/allStyle";
import Icon from "react-native-vector-icons/Ionicons";
import store from "../../store/store";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import FormUser from "../view-ui/FormUser";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      store.setError("Please fill in both fields");
      return;
    }
    store.userLogin(email, password);
  };

  const handleLogout = () => {
    store.userLogout();
  };

  // bottomsheet
  const bottomSheetModalRef = useRef(null);
  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
    setBottomSheetOpen(true);
  };
  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
    setBottomSheetOpen(false);
  };

  const focusClear = () => {
    store.clearError();
  };

  return (
    <LinearGradient
      colors={["#002b36", "#000000", "#002b36"]}
      start={{ x: 0, y: 0.25 }}
      end={{ x: 0, y: 0.75 }}
      style={allStyle.gradient}
    >
      <View>
        {/* <Header /> */}

        <View style={[allStyle.linedJar, { marginTop: 20 }]}>
          {/* top */}
          <View style={styles.cardTop}>
            <View style={{ flex: 1 }}>
              <Text style={[allStyle.text, allStyle.bold]}>
                Registered users can post movies &amp; reviews
              </Text>
            </View>
            <View
              style={{ justifyContent: "flex-end", paddingRight: 8 }}
            ></View>
          </View>

          {/* bottom */}
          <View style={styles.cardBottom}>
            <View style={{ marginLeft: 8, marginTop: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    height: 500,
                    width: "100%",
                  }}
                >
                  <View style={styles.formJar}>
                    {/* <View
                      style={{
                        width: "100%",
                        height: store.userLoggedIn ? 0 : 0,
                      }}
                    ></View> */}

                    <View
                      style={{
                        height: 109, // 90 114
                        alignItems: "center",
                      }}
                    >
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

                      {store.errorMessage && store.errorMessage.length > 0 && (
                        <View
                          style={{
                            backgroundColor: "#cb4b16",
                            borderRadius: 6,
                            padding: 6,
                          }}
                        >
                          <Text style={allStyle.text}>
                            {store.errorMessage}
                          </Text>
                        </View>
                      )}

                      {store.userDetails && store.userDetails.id && (
                        <Text style={[allStyle.text, { marginBottom: 12 }]}>
                          {store.userDetails.name}
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        width: "100%",
                        height: 270,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          height: 180,
                        }}
                      >
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
                          editable={
                            (store.userDetails && !store.userDetails.id) ||
                            !bottomSheetOpen
                          }
                          onFocus={focusClear}
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
                          onPress={focusClear}
                          onFocus={focusClear}
                        />

                        <TouchableOpacity
                          style={[
                            styles.button,
                            { width: "100%" },
                            store.userLoggedIn
                              ? { backgroundColor: "#2aa198" }
                              : "",
                          ]}
                          onPress={
                            store.userLoggedIn ? handleLogout : handleLogin
                          }
                        >
                          {store.userIsLoggingIn ? (
                            <ActivityIndicator size='small' color='#fff' />
                          ) : (
                            <Text style={[allStyle.text, allStyle.bold]}>
                              {store.userLoggedIn ? "Logout" : "Login"}
                            </Text>
                          )}

                          {/* <Text style={[allStyle.text, allStyle.bold]}>
                            {store.userLoggedIn ? "Logout" : "Login"}
                          </Text> */}
                        </TouchableOpacity>

                        {!store.userLoggedIn && (
                          <TouchableOpacity
                            style={[
                              styles.button,
                              {
                                backgroundColor: "#2aa198",
                                width: "100%",
                                marginTop: 50,
                              },
                            ]}
                            onPress={() => openBottomSheet()}
                          >
                            <Text style={[allStyle.text, allStyle.bold]}>
                              Register New Account
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    {/* green */}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <BottomSheetModalProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BottomSheetModal
            ref={bottomSheetModalRef}
            backgroundStyle={{ borderRadius: 16 }}
            enablePanDownToClose={true}
          >
            <FormUser closeAction={closeBottomSheet} />
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
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
    //    paddingTop: store.userDetails && store.userDetails.id ? 0 : 70,
    paddingRight: 8,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
  formJar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingTop: 0,
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
