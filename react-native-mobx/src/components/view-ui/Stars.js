import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome
import { allStyle } from "../../styles/allStyle";

export default function Stars({
  rating,
  reviews,
  theColor = "#e1d099",
  displayText = true,
}) {
  return (
    <View style={{ marginTop: 6 }}>
      {rating > 0 ? (
        <View style={{ alignItems: "center" }}>
          <Text style={[allStyle.stars, { color: theColor }]}>
            {rating >= 1 ? (
              <Icon name='star' size={20} />
            ) : rating >= 0.5 ? (
              <Icon name='star-half' size={20} />
            ) : (
              <Icon name='star-o' size={20} />
            )}

            {rating >= 2 ? (
              <Icon name='star' size={20} />
            ) : rating >= 1.5 ? (
              <Icon name='star-half' size={20} />
            ) : (
              <Icon name='star-o' size={20} />
            )}

            {rating >= 3 ? (
              <Icon name='star' size={20} />
            ) : rating >= 2.5 ? (
              <Icon name='star-half' size={20} />
            ) : (
              <Icon name='star-o' size={20} />
            )}

            {rating >= 4 ? (
              <Icon name='star' size={20} />
            ) : rating >= 3.5 ? (
              <Icon name='star-half' size={20} />
            ) : (
              <Icon name='star-o' size={20} />
            )}

            {rating >= 5 ? (
              <Icon name='star' size={20} />
            ) : rating >= 4.5 ? (
              <Icon name='star-half' size={20} />
            ) : (
              <Icon name='star-o' size={20} />
            )}
          </Text>
          {displayText === true && (
            <View style={{ alignItems: "center" }}>
              <Text style={[allStyle.text, { color: "#e1d099" }]}>
                {parseFloat(rating).toFixed(1)} from {reviews} ratings
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={allStyle.stars}>
            <Icon name='star-o' size={20} />
          </Text>
          <Text style={[allStyle.text, { color: "#e1d099" }]}>
            "No ratings yet"
          </Text>
        </View>
      )}
    </View>
  );
}
