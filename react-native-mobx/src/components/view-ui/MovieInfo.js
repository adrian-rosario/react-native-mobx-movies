import React, { useEffect, useState, useRef } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { allStyle } from "../../styles/allStyle";
import { ScrollView, StyleSheet } from "react-native";
import { common_constants } from "../../common/common_constants";
import Stars from "./Stars";
import store from "../../store/store";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  // BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import FormMovie from "./FormMovie";
import FormRating from "./FormRating";
import { observer } from "mobx-react-lite";

const MovieInfo = observer(({ movieObject, displayReview }) => {
  const [movie, setMovie] = useState({});
  const [addMovieOrRating, setAddMovieOrRating] = useState("");

  const handleEndScroll = () => {
    store.clearRating();
    store.fetchRatingsForMovie(movie.id);
  };

  useEffect(() => {
    if (movieObject) {
      setMovie(movieObject);
    }
  }, [movieObject, displayReview]);

  // bottomsheet
  const bottomSheetModalRef = useRef(null);
  const openBottomSheet = (movieOrRating) => {
    bottomSheetModalRef.current?.present();
    setAddMovieOrRating(movieOrRating);
  };
  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
    setAddMovieOrRating("");
  };

  return (
    <ScrollView
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      onScrollEndDrag={handleEndScroll}
      keyboardShouldPersistTaps='handled'
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ margin: 10 }}>
          {/* top */}
          <View style={styles.cardTop}>
            <View style={{ flex: 1 }}>
              <Text style={[allStyle.text, allStyle.bold]}>{movie.title}</Text>
            </View>
            <View style={{ justifyContent: "flex-end", paddingRight: 8 }}>
              <Text style={[allStyle.text, allStyle.bold]}>{movie.year}</Text>
            </View>
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
                  <Text style={[allStyle.text, allStyle.bold]}>Director: </Text>
                </View>
                <View>
                  <Text style={[allStyle.text]}>{movie.director}</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={[allStyle.text, allStyle.bold]}>
                    Cinematographer: &nbsp;
                  </Text>
                </View>
                <View>
                  <Text style={[allStyle.text]}>{movie.cinematographer}</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={[allStyle.text, allStyle.bold]}>Starring: </Text>
                </View>
                <View style={{ width: "81%" }}>
                  <Text style={allStyle.text}>{movie.starring}</Text>
                </View>
              </View>

              <View>
                <Text style={[allStyle.text, allStyle.bold]}>Plot:</Text>

                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                  }}
                >
                  <Text style={[allStyle.text, { flex: 1 }]}>
                    {movie.description}
                  </Text>

                  <View>
                    <Image
                      source={{
                        uri: common_constants.BASE_URL + movie.image,
                      }}
                      style={styles.movieImage}
                    />

                    <Stars
                      rating={movie.ratings_average}
                      reviews={movie.number_of_ratings}
                    />
                  </View>
                </View>

                {Object.keys(displayReview).length > 0 &&
                  displayReview.rating.comment !== "No ratings" && (
                    <View>
                      <View style={{ marginTop: 16 }}>
                        <View style={styles.reviewTopLine} />
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              width: 280,
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{ textAlign: "center", lineHeight: 22 }}
                            >
                              <Text style={[allStyle.text, { fontSize: 20 }]}>
                                "
                              </Text>
                              <Text
                                style={[
                                  allStyle.text,
                                  allStyle.bold,
                                  { fontSize: 18 },
                                ]}
                              >
                                {displayReview.rating.comment}
                              </Text>
                              <Text style={[allStyle.text, { fontSize: 20 }]}>
                                "
                              </Text>
                            </Text>
                          </View>
                          <View style={{ width: "27%" }}>
                            <Stars
                              rating={displayReview.rating.rating}
                              reviews={movie.number_of_ratings}
                              displayText='false'
                              theColor='#002b36'
                            />
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={allStyle.text}>&mdash;</Text>
                              <Text style={allStyle.text}>
                                {displayReview.user}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}

                {store.userLoggedIn && (
                  <View style={{ marginTop: 8 }}>
                    <View style={styles.reviewTopLine} />
                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: "row",
                        marginRight: 10,
                      }}
                    >
                      <View style={{ width: "50%", paddingRight: 5 }}>
                        <TouchableOpacity
                          style={[styles.button]}
                          onPress={() => openBottomSheet("movie")}
                        >
                          <Text style={[allStyle.text, allStyle.bold]}>
                            Add New Movie
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={{ width: "50%", paddingLeft: 5 }}>
                        <TouchableOpacity
                          style={[styles.button]}
                          onPress={() => openBottomSheet("rating")}
                        >
                          <Text style={[allStyle.text, allStyle.bold]}>
                            Add Rating
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
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
            {addMovieOrRating === "movie" && (
              <FormMovie addOrEdit='add' closeAction={closeBottomSheet} />
            )}

            {addMovieOrRating === "rating" && (
              <FormRating closeAction={closeBottomSheet} movieObject={movie} />
            )}
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </ScrollView>
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
    backgroundColor: "#227c77",
  },
  cardBottom: {
    backgroundColor: "#29968c",
    height: 486,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
  reviewTopLine: {
    borderBottomColor: "rgba(255,255,255,.5)",
    borderBottomWidth: 1,
    width: "80%",
    marginLeft: "8%",
    marginBottom: 4,
  },
  movieImage: {
    width: 160,
    height: 130,
    marginRight: 10,
    marginLeft: 10,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#002b36",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default MovieInfo;
