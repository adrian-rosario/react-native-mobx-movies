React Native, using Mobx

# react-native-mobx-movies

A work in progress. Exploring the [movies React](https://github.com/adrian-rosario/django-react-movies) project in Expo / React Native, utilizing the same Django API endpoints, Mobx, Google fonts, React Native Vector Icons, ScrollView, etc.

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
<img src="./screenshots/home.png" alt="home" style="width:150px" />
<img src="./screenshots/mission.png" alt="mission" style="width:150px" />
<img src="./screenshots/login.png" alt='not logged in'
style="width:150px"
/>
<img src="./screenshots/logout.png" alt="logged in" style="width:150px" />
</div>
