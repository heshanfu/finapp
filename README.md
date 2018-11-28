# Open source finance application
> written with Vue.js and Firebase.

Finapp helps you to control personal finances easily and efficiently.

## Demo
- https://themerise.com/
- https://ilko.me/finapp/

## Setup

### Project setup
```
# clone the repo
$ git clone https://github.com/ilkome/finapp.git finapp

# go into app's directory
$ cd finapp

# install app's dependencies
$ npm install
```

### Firebase setup
- Create a Firebase project in the [Firebase console](https://console.firebase.google.com/)
- Go to the Authentication tab and enable Google authentication.
- Go to the Database tab and enable Firestore.
- Select Realtime Database and go to Rules tab.
- Change rules to:
```
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "currencies": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```
- Go to the Project Overviw and click Add Firebase to your web app.
- You need to replace config in app's directory `/src/firebase.js` with your properties.
```
apiKey: 'YOUR_CONFIG',
authDomain: 'YOUR_CONFIG',
databaseURL: 'YOUR_CONFIG',
projectId: 'YOUR_CONFIG',
storageBucket: 'YOUR_CONFIG',
messagingSenderId: 'YOUR_CONFIG'
```


## Development

#### Compiles and hot-reloads
```
npm run dev
```

## Production
#### Compiles and minifies for production
```
npm run build
```
