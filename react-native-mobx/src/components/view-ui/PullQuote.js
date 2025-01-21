import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { allStyle } from "../../styles/allStyle";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome
import { ScrollView, TouchableOpacity } from "react-native";
import { useRef, useEffect } from "react";
import store from "../../store/store";

export default function PullQuote({ loadAction }) {
  const [rating, setRating] = useState({});

  useEffect(() => {
    if (!store.ratingDetails || !store.ratingDetails.user) {
      store.fetchRandomReview();
    }

    if (store.ratingDetails && store.ratingDetails.user) {
      setRating(store.ratingDetails);
    }
  }, [store.ratingDetails]);

  // - handle taps
  const lastTapTimeRef = useRef(null);

  const handleDoubleTap = (movieId, ratingDetails) => {
    loadAction(movieId, ratingDetails);
  };

  const handleTap = (movieId, ratingId) => {
    const now = new Date().getTime();
    const DOUBLE_TAP_DELAY = 300; // Adjust

    if (
      lastTapTimeRef.current &&
      now - lastTapTimeRef.current < DOUBLE_TAP_DELAY
    ) {
      handleDoubleTap(movieId, ratingId);
    } else {
      lastTapTimeRef.current = now;
    }
  };

  // - handle end scroll
  const handleEndScroll = () => {
    // dispatch(listRandomRatingAction());
    setRating({});
    store.fetchRandomReview();
    setRating(store.ratingDetails);
  };

  const truncate = (str, maxLength) =>
    str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;

  return (
    <View style={{ height: 75 }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScrollEndDrag={handleEndScroll}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => handleTap(rating.rating.movie, rating)}
          style={{ height: 152, width: 430 }}
        >
          <View style={styles.pullQuoteJar}>
            <View style={styles.pullQuoteBorder}>
              <Text style={[allStyle.text, styles.largeQuote]}>"</Text>
              <Text style={[allStyle.text, styles.quote]}>
                {rating && rating.rating && truncate(rating.rating.comment, 16)}
              </Text>
              <Text style={[allStyle.text, styles.largeQuote]}>"</Text>
              <Text style={[allStyle.text, styles.quoteCredit]}>
                &nbsp;&ndash;&nbsp;
              </Text>

              <Text style={[allStyle.text, allStyle.semiBoldItalic]}>
                {rating && rating.movie && truncate(rating.movie, 20)}
              </Text>

              <Text style={[styles.quoteCredit, styles.quoteMovieAction]}>
                <Icon name='arrow-right' style={styles.quoteMovieArrow} />
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pullQuoteJar: {
    marginTop: 12,
  },
  pullQuoteBorder: {
    borderWidth: 1,
    borderColor: "#2aa198",
    borderRadius: 5,
    margin: 8,
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  largeQuote: {
    fontSize: 28,
  },
  quote: {
    fontSize: 22,
  },
  quoteCredit: {
    fontSize: 14,
  },
  quoteMovie: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  quoteMovieAction: {
    marginLeft: 6,
  },
  quoteMovieArrow: {
    color: "#2aa198",
    fontSize: 14,
  },
});
