// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};
export const firebase = {
  apiKey: "AIzaSyB0YURPLCLiFvQSIXGdR4VATzWikw4N1Mo",
  authDomain: "mydo-ad304.firebaseapp.com",
  databaseURL: "https://mydo-ad304.firebaseio.com",
  projectId: "mydo-ad304",
  storageBucket: "mydo-ad304.appspot.com",
  messagingSenderId: "855265169596"
};
export interface Item {
  titulo: string;
  fecha: string;
  descripcion:string;
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
