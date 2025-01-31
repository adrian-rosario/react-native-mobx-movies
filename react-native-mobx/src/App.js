import { Provider } from "mobx-react";
import store from "./store/store";
import { observer } from "mobx-react-lite";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_700Bold,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold_Italic,
} from "@expo-google-fonts/open-sans";
import Home from "./components/views/Home";
import Mission from "./components/views/Mission";
import Login from "./components/views/Login";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "./components/view-ui/Header";

const Tab = createBottomTabNavigator();

/*export default function App()*/
const App = observer(() => {
  useEffect(() => {}, []);

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
    OpenSans_600SemiBold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "film" : "film-outline";
                } else if (route.name === "Mission") {
                  iconName = focused ? "albums" : "albums-outline";
                } else if (route.name === "Login") {
                  iconName = focused ? "person" : "person-outline";
                }

                // Return the Icon component
                return <Icon name={iconName} size={size} color={color} />;
              },
              headerShown: true, // Hide the top header
              tabBarActiveTintColor: "#b58900",
              tabBarInactiveTintColor: "#839496",
              tabBarStyle: {
                backgroundColor: "#343b3c",
                height: 60,
              },
              tabBarLabelStyle: { fontSize: 12 },
            })}
          >
            <Tab.Screen
              name='Home'
              component={Home}
              options={{
                header: () => <Header />,
              }}
            />
            <Tab.Screen
              name='Mission'
              component={Mission}
              options={{
                header: () => <Header />,
              }}
            />
            <Tab.Screen
              name='Login'
              component={Login}
              options={{
                header: () => <Header />,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
});

export default App;
