import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { common_constants } from "../../common/common_constants";
import { useRef } from "react";
import { allStyle } from "../../styles/allStyle";

export default function MoviesHorizonatlScrsoll({ theMovies, buttonAction }) {
  const lastTapTimeRef = useRef(null);
  const handleDoubleTap = (id) => {
    buttonAction(id);
  };

  const handleTap = (id) => {
    const now = new Date().getTime();
    const DOUBLE_TAP_DELAY = 300; // Adjust

    if (
      lastTapTimeRef.current &&
      now - lastTapTimeRef.current < DOUBLE_TAP_DELAY
    ) {
      handleDoubleTap(id);
    } else {
      lastTapTimeRef.current = now;
    }
  };
  return (
    <View style={styles.scrollViewJar}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        style={styles.scrollViewView}
      >
        <View
          style={{
            flexDirection: "row",
            height: 153,
          }}
        >
          {theMovies.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={1}
              onPress={() => handleTap(item.id)}
              style={{ height: 152 }}
            >
              <View style={styles.tile}>
                <View style={styles.card}>
                  <Image
                    source={{ uri: common_constants.BASE_URL + item.image }}
                    style={{
                      width: 135,
                      height: 70,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <Text
                  style={[
                    {
                      textAlign: "center",
                      justifyContent: "center",
                      color: "#fff",
                      lineHeight: 16,
                    },
                    allStyle.text,
                  ]}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewJar: {
    height: 154,
  },
  scrollViewView: {
    flex: 1,
  },
  tile: {
    height: 150,
    width: 165,
    textAlign: "center",
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 10,
  },
  card: {
    margin: 4,
    borderWidth: 1,
    borderColor: "#2aa198",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});
