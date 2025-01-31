import { flow, makeAutoObservable, observable, action } from "mobx";
import { common_constants as constants } from "../common/common_constants";
class Store {
  movies = [];
  moviesResolved = false;
  movieIsBeingPosted = false; // spinner
  newMoviePostingCompleted = "";

  ratingDetails = {};
  singleMovie = {};
  ratingsForMovie = {};
  ratingsForMovieResolved = false;
  singleRating = {};
  randomRatingForMovie = {};
  randomRatingForMovieUser = "";
  ratingIsBeingPosted = false; // spinner
  ratingPostedMessage = "";

  userDetails = {};
  userIsLoggingIn = false; // spinner
  userLoggedIn = false;
  registeringNewUser = false; // spinner
  newUserRegistrationCompleted = "";

  errorMessage = "";

  constructor() {
    makeAutoObservable(this, {
      moviesResolved: observable,
      setMoviesResolved: action,
      movieIsBeingPosted: observable, // TODO: spinner, done
      newMoviePostingCompleted: observable,
      // TODO: - ERROR

      ratingsForMovieResolved: observable,
      setRatingsForMovieResolved: action,
      ratingIsBeingPosted: observable, // TODO: spinner, done
      ratingPostedMessage: observable,
      // TODO: - ERROR, done

      userIsLoggingIn: observable, // spinner, done
      // TODO: - ERROR, done
      userDetails: observable,
      userLoggedIn: observable,
      registeringNewUser: observable, // TODO: spinner, done
      newUserRegistrationCompleted: observable, // TODO: , done
      // TODO: - ERROR, done

      errorMessage: observable,
    });
  }

  setMoviesResolved = () => {
    this.moviesResolved = true;
  };

  setRatingsForMovieResolved = () => {
    this.ratingsForMovieResolved = true;
  };

  setUserIsLoggingIn = (theValue) => {
    this.userIsLoggingIn = theValue;
  };

  setUserDetails = (theUserDetails) => {
    this.userDetails = theUserDetails;
  };

  setUserLoggedIn = (theValue) => {
    this.userLoggedIn = theValue;
  };

  setMovieIsBeingPosted = (theValue) => {
    this.movieIsBeingPosted = theValue;
  };

  setnewMoviePostingCompleted = (theValue) => {
    this.newMoviePostingCompleted = theValue;
    setTimeout(() => {
      this.clearnewMoviePostingCompleted();
    }, 3500);
  };

  clearnewMoviePostingCompleted = () => {
    this.newMoviePostingCompleted = "";
  };

  setRatingIsBeingPosted = (theValue) => {
    this.ratingIsBeingPosted = theValue;
  };

  setRatingPostedMessage = (theValue) => {
    this.ratingPostedMessage = theValue;
    setTimeout(() => {
      this.clearRatingPostedMessage();
    }, 3500);
  };

  clearRatingPostedMessage = () => {
    this.ratingPostedMessage = "";
  };

  setRegisteringNewUser = (theValue) => {
    this.registeringNewUser = theValue;
  };

  setError = (theErrorMessage) => {
    this.errorMessage = theErrorMessage;
    setTimeout(() => {
      this.clearError();
    }, 3500);
  };

  clearError = () => {
    this.errorMessage = "";
  };

  setNewUserRegistrationCompleted = (message) => {
    this.newUserRegistrationCompleted = message;
    setTimeout(() => {
      this.clearNewUserRegistrationCompleted();
    }, 3500);
  };

  clearNewUserRegistrationCompleted = () => {
    this.newUserRegistrationCompleted = "";
  };

  // -

  fetcMovies = flow(function* () {
    try {
      const response = yield fetch(`${constants.BASE_URL}/api/movies/`);
      this.movies = yield response.json();
      this.setMoviesResolved();
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

  postNewMovie = flow(function* (newMovieObj) {
    try {
      // =
      this.setMovieIsBeingPosted(true);
      const response = yield fetch(
        `${constants.BASE_URL}/api/movies/new-movie/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.userDetails.token}`,
          },
          body: JSON.stringify(newMovieObj),
        }
      );
      const theResponse = yield response.json();
      if (theResponse.id) {
        this.setnewMoviePostingCompleted(
          `Posting ${theResponse.title} was successful.`
        );
      } else {
        setError(theResponse);
      }
      this.setMovieIsBeingPosted(false);
    } catch (error) {
      console.log(error);
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

  postUserRating = flow(function* (id, review) {
    try {
      this.setRatingIsBeingPosted(true);
      const response = yield fetch(
        `${constants.BASE_URL}/api/new-rating/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.userDetails.token}`,
          },
          body: JSON.stringify(review),
        }
      );
      const theResponse = yield response.json();

      if (theResponse.id) {
        this.setRatingPostedMessage("Rating posted successfully");
      } else {
        this.setError(theResponse.detail);
      }
      this.setRatingIsBeingPosted(false);
    } catch (error) {
      console.log("error: ", error);
    }
  });

  postNewUser = flow(function* (newUserObj) {
    try {
      this.clearError();
      this.setRegisteringNewUser(true);
      const theResponse = yield fetch(`${constants.BASE_URL}/user/new/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newUserObj),
      });

      const theResponseJson = yield theResponse.json();

      if (theResponseJson.id) {
        this.userLogin(newUserObj.email.toLowerCase(), newUserObj.password);
        this.setNewUserRegistrationCompleted(
          `Successfully registered ${theResponseJson.name}, ${theResponseJson.username}`
        );
      } else {
        this.setError(theResponseJson.detail);
      }
      this.setRegisteringNewUser(false);
    } catch (error) {
      console.log(error);
    }
  });

  userLogin = flow(function* (username, password) {
    try {
      this.clearError();
      this.setUserIsLoggingIn(true);
      const response = yield fetch(`${constants.BASE_URL}/user/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const theResponse = yield response.json();

      if (theResponse.token) {
        this.setUserDetails(theResponse);
        this.setUserLoggedIn(true);
        this.setUserIsLoggingIn(false);
      } else {
        this.setUserIsLoggingIn(false);
        this.setError(theResponse.detail);
      }
    } catch (error) {
      console.error(error);
    }
  });

  userLogout() {
    this.setUserLoggedIn(false);
    this.setUserDetails(null);
  }
}

const store = new Store();
export default store;
