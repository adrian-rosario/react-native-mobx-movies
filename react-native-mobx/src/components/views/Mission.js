import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { allStyle } from "../../styles/allStyle";
import Header from "../view-ui/Header";
import { ScrollView, StyleSheet } from "react-native";
import { common_constants } from "../../common/common_constants";
import Stars from "../view-ui/Stars";
import store from "../../store/store";
import { observer } from "mobx-react-lite";

const Mission = observer(() => {
  const [rating, setRating] = useState({});
  const [ratingSet, setRatingSet] = useState(false);
  const [theMovies, setTheMovies] = useState([]);
  const [reviewMovie, setReviewMovie] = useState({});

  useEffect(() => {
    if (!store.movies || store.movies.length < 1) {
      store.fetcMovies();
    }

    if (!ratingSet) {
      store.fetchRandomReview();
    }

    if (store.ratingDetails && store.ratingDetails.user) {
      setRatingSet(true);
    }

    if (store.movies && store.movies.length >= 1) {
      setTheMovies(store.movies);
    }

    if (
      store.ratingDetails &&
      store.ratingDetails.user &&
      store.movies &&
      store.movies.length >= 1
    ) {
      const theMovie = theMovies.find(
        (item) => item.id === rating.rating.movie
      );

      setRating(store.ratingDetails);
      setReviewMovie(theMovie);
    }
  }, [ratingSet, store.movies, store.ratingDetails]);

  // highlight a different movie when user end-scrolls
  const handleEndScroll = ({ nativeEvent }) => {
    const scrollY = nativeEvent.contentOffset.y;
    const bottomThreshold = 500;
    const topThreshold = -50;

    if (scrollY > bottomThreshold || scrollY < topThreshold) {
      setReviewMovie({});
      setRatingSet(false);
    }
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

        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onScrollEndDrag={handleEndScroll}
        >
          <View style={[allStyle.linedJar, { marginTop: 20 }]}>
            {/* top */}
            <View style={styles.cardTop}>
              <View style={{ flex: 1 }}>
                <Text style={[allStyle.text, allStyle.bold]}>Mission</Text>
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
                  <View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={[
                          {
                            marginBottom: 8,
                            flexDirection: "row",
                            flexWrap: "wrap",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            allStyle.text,
                            allStyle.bold,
                            {
                              fontSize: 18, // Make the first letter larger
                            },
                          ]}
                        >
                          T
                        </Text>
                        <Text
                          style={[
                            allStyle.text,
                            {
                              lineHeight: 16,
                            },
                          ]}
                        >
                          his app ...
                        </Text>
                      </Text>

                      {store.movies &&
                        store.movies.length >= 1 &&
                        rating &&
                        rating.rating &&
                        rating.rating.movie && (
                          <View
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              width: "100%",
                            }}
                          >
                            {reviewMovie && reviewMovie.image && (
                              <View>
                                {/* line */}
                                <View
                                  style={[
                                    styles.movieHighlightLine,
                                    {
                                      marginBottom: 12,
                                    },
                                  ]}
                                />

                                <View
                                  style={{
                                    width: "100%",
                                    alignItems: "center",
                                  }}
                                >
                                  <Image
                                    style={{ width: 250, height: 150 }}
                                    source={{
                                      uri: `${common_constants.BASE_URL}${reviewMovie.image}`,
                                    }}
                                  />
                                  <Text style={allStyle.text}>
                                    {reviewMovie.title}, {reviewMovie.year}
                                  </Text>

                                  {reviewMovie &&
                                    reviewMovie.number_of_ratings > 0 && (
                                      <View>
                                        <Stars
                                          displayText={false}
                                          reviews={
                                            reviewMovie.number_of_ratings
                                          }
                                          rating={reviewMovie.ratings_average}
                                        />
                                      </View>
                                    )}
                                </View>

                                {/* line */}
                                <View
                                  style={[
                                    styles.movieHighlightLine,
                                    {
                                      marginBottom: 8,
                                      marginTop: 8,
                                    },
                                  ]}
                                />
                              </View>
                            )}
                          </View>
                        )}

                      <Text style={[allStyle.text, { marginBottom: 10 }]}>
                        For film noir enthusiasts...
                      </Text>
                      <Text style={[allStyle.text]}>By combining ...</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
  movieHighlightLine: {
    borderBottomColor: "rgba(42, 161, 152, 1)",
    borderBottomWidth: 1,
    width: "80%",
    marginLeft: "10%",
  },
});

export default Mission;
