import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text } from "react-native";
import { allStyle } from "../../styles/allStyle";

export default function UserDisplay({ userDetails }) {
  return (
    <View style={{ flexDirection: "row", marginTop: 14, marginRight: 8 }}>
      <Text style={[allStyle.text, { marginRight: 8 }]}>
        {userDetails.name}
      </Text>
      <Icon name='earth' size={20} style={allStyle.textC} />
    </View>
  );
}
