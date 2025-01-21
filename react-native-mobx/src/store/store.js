import { flow, makeAutoObservable, observable, action } from "mobx";
import { common_constants as constants } from "../common/common_constants";
class Store {
  movies = [];
  ratingDetails = {};
  singleMovie = {};
  ratingsForMovie = {};
  userDetails = {};
  userLoggedIn = false;
  singleRating = {};

  randomRatingForMovie = {};
  randomRatingForMovieUser = "";

  moviesResolved = false;
  ratingsForMovieResolved = false;

  constructor() {
    makeAutoObservable(this, {
      moviesResolved: observable,
      ratingsForMovieResolved: observable,
      setMoviesResolved: action,
      setRatingsForMovieResolved: action,
    });
  }

  setMoviesResolved = () => {
    this.moviesResolved = true;
  };

  setRatingsForMovieResolved = () => {
    this.ratingsForMovieResolved = true;
  };

  fetcMovies = flow(function* () {
    try {
      const response = yield fetch(`${constants.BASE_URL}/api/movies/`);
      this.movies = yield response.json();
      this.setMoviesResolved();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  fetchRandomReview = flow(function* () {
    try {
      const response = yield fetch(`${constants.BASE_URL}/api/rating/random/`);
      this.ratingDetails = yield response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  fetchSingleMovie = flow(function* (id) {
    try {
      const response = yield fetch(`${constants.BASE_URL}/api/movie/${id}`);
      this.singleMovie = yield response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  fetchRatingsForMovie = flow(function* (id) {
    try {
      this.ratingsForMovieResolved = false;

      const response = yield fetch(
        `${constants.BASE_URL}/api/ratings/for-movie/${id}`
      );
      this.ratingsForMovie = yield response.json();

      if (this.ratingsForMovie.ratings.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * this.ratingsForMovie.ratings.length
        );

        const randomRatingNewObject = {
          rating: this.ratingsForMovie.ratings[randomIndex],
          user: this.ratingsForMovie.users[randomIndex].first_name,
        };

        this.randomRatingForMovie = randomRatingNewObject;

        this.setRatingsForMovieResolved();
      } else {
        this.randomRatingForMovie = { rating: { comment: "No ratings" } };
        this.setRatingsForMovieResolved();
      }
    } catch (error) {
      console.error("Error fetching ratings data:", error);
    }
  });

  clearRating() {
    this.randomRatingForMovie = {};
    this.randomRatingForMovieUser = "";
  }

  fetchSingleRating = flow(function* (id) {
    try {
      const response = yield fetch(`${constants.BASE_URL}/api/rating/${id}`);
      this.singleRating = yield response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  userLogin = flow(function* (username, password) {
    try {
      const response = yield fetch(`${constants.BASE_URL}/user/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      this.userDetails = yield response.json();
      this.userLoggedIn = true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  userLogout() {
    this.userLoggedIn = false;
    this.userDetails = null;
  }
}

const store = new Store();
export default store;
