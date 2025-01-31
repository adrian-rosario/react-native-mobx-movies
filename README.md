React Native, using Mobx

# react-native-mobx-movies

A work in progress. Exploring the [movies React](https://github.com/adrian-rosario/django-react-movies) project in Expo / React Native, utilizing the same Django API endpoints, Mobx, Google fonts, React Native Vector Icons, ScrollView, Bootswatch Solar theme.

To note, the Django server must be run with:

```bash
python manage.py runserver 0.0.0.0:8000
```

and edit the `/react-native-mobx/src/common/common_constants.js` file for the local IP address:

```bash
  BASE_URL: "http://192.0.0.0:8000", // use local ip address
```

<div style="text-align:center">

<img src='./screenshots/movies-mobile-id.png' alt="movies mobile interactive design" style="width:100%"  />

<img src="./screenshots/01-home.png" alt="home, not logged in" style="width:150px" />
<img src="./screenshots/02-mission.png" alt="mission" style="width:150px" />
<img src="./screenshots/03-login.png" alt="login" style="width:150px" />
<img src="./screenshots/04-new-user.png" alt="new user" style="width:150px" />
<img src="./screenshots/05-new-user-errors.png" alt="new user, error" style="width:150px" />
<img src="./screenshots/06-new-user-error2.png" alt="new user, error 2" style="width:150px" />
<img src="./screenshots/07-home-logged-in.png" alt="home, logged in" style="width:150px" />
<img src="./screenshots/08-add-new-movie.png" alt="add new movie" style="width:150px" />
<img src="./screenshots/09-add-new-movie-errors.png" alt="add new movie, errors" style="width:150px" />
<img src="./screenshots/10-new-rating.png" alt="new rating" style="width:150px" />
<img src="./screenshots/11-new-rating-success.png" alt="new rating, success" style="width:150px" />
<img src="./screenshots/12-new-rating-error.png" alt="new rating, error" style="width:150px" />

<img src='./screenshots/animated-new-movie.gif' alt="new movie" style="width:150px" />

<img src='./screenshots/animated-new-user-success.gif' alt="new user success" style="width:150px" />

<img src='./screenshots/animated-review-success.gif' alt="new review" style="width:150px" />

</div>
