import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyC2bste4fnhL_QPt_Xh4MCmJUBFPKk40WA",
    authDomain: "webinar-ea0c9.firebaseapp.com",
    databaseURL: "https://webinar-ea0c9.firebaseio.com",
    projectId: "webinar-ea0c9",
    storageBucket: "webinar-ea0c9.appspot.com",
    messagingSenderId: "480506566659",
    appId: "1:480506566659:web:31b369df6e2a7b1f8e9636"
};

@NgModule({
    imports: [
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFirestoreModule.enablePersistence()
    ],
    exports: [
        AngularFireModule,
        AngularFirestoreModule
    ],
})
export class FirebaseModule { }
