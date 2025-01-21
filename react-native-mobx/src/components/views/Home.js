import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import { allStyle } from "../../styles/allStyle";
import Header from "../view-ui/Header";
import MoviesHorizonatlScrsoll from "../view-ui/MoviesHorizonatlScrsoll";
import PullQuote from "../view-ui/PullQuote";
import MovieInfo from "../view-ui/MovieInfo";
import { LinearGradient } from "expo-linear-gradient";
import { observer } from "mobx-react-lite";
import store from "../../store/store";

const Home = observer(() => {
  const [displayMovie, setDisplayMovie] = useState({});
  const [displayReview, setDisplayReview] = useState({});
  const [theMovies, setTheMovies] = useState([]);
  const { moviesResolved, ratingsForMovieResolved } = store;
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (!moviesResolved) {
      store.fetcMovies();
    }

    if (moviesResolved) {
      setTheMovies(store.movies);

      if (firstLoad) {
        setDisplayMovie(store.movies[0]);
        store.fetchRatingsForMovie(store.movies[0].id);
        setFirstLoad(false);
      }

      if (ratingsForMovieResolved) {
        setDisplayReview(store.randomRatingForMovie);
      }
    }
  }, [moviesResolved, ratingsForMovieResolved]);

  // from pull quote double tap
  const loadMovieAndReview = (movieId, theReview) => {
    setDisplayMovie(theMovies.find((item) => item.id === movieId));
    setDisplayReview(theReview);
  };

  // from horizontal scroll area double tap
  const scrollAreaLoadMovie = (movieId) => {
    store.fetchRatingsForMovie(movieId);
    const theMovie = theMovies.find((item) => item.id === movieId);
    setDisplayMovie(theMovie);
  };

  return (
    <LinearGradient
      colors={["#002b36", "#000000", "#002b36"]}
      start={{ x: 0, y: 0.25 }}
      end={{ x: 0, y: 0.75 }}
      style={allStyle.gradient}
    >
      <View style={allStyle.topJar}>
        <Header />

        {store.ratingDetails && (
          <PullQuote
            loadAction={(movieId, reviewId) =>
              loadMovieAndReview(movieId, reviewId)
            }
          />
        )}

        <MoviesHorizonatlScrsoll
          theMovies={theMovies}
          buttonAction={scrollAreaLoadMovie}
        />

        {moviesResolved &&
          displayMovie &&
          Object.keys(displayMovie).length > 0 && (
            <MovieInfo
              movieObject={displayMovie}
              displayReview={displayReview}
            />
          )}

        {!moviesResolved &&
          Object.keys(displayMovie).length === 0 &&
          !(<ActivityIndicator size='large' color='#fff' />)}
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({});

export default Home;
