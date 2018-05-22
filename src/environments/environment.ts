// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB-LyVPPmP2jWRfBOtBgvBS2S8SNcjfWyw",
    authDomain: "user-check-in.firebaseapp.com",
    databaseURL: "https://user-check-in.firebaseio.com",
    projectId: "user-check-in",
    storageBucket: "user-check-in.appspot.com",
    messagingSenderId: "1093290791386"
  }
};
