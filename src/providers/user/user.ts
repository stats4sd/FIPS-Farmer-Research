import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular'
import { NotificationsProvider } from '../notifications/notifications';
// auth
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection  } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserProvider {
  user: any;
  private obsDoc: AngularFirestoreDocument<any>;
  private obsCollection:AngularFirestoreCollection<any>
  items: Observable<any[]>;

  constructor(public notifications: NotificationsProvider, public events: Events, private afAuth: AngularFireAuth, private afs:AngularFirestore) {
    console.log('user provider loaded')
    this._registerLoginListener()

  }

  login(form) {
    return this.afAuth.auth.signInWithEmailAndPassword(form.email, form.password)
  }
  getUser(){
    return this.user ? this.user : {displayName:null}
  }
  register(form) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(form.email, form.password)
        .then(user => {
          let displayName: string = form.firstName + " " + form.lastName
          this.user = user
          //this.user.displayName = displayName
          let profile = this.afAuth.auth.currentUser
          profile.updateProfile({
            displayName: displayName,
            photoURL: null
          })
            .then(res => {
              resolve(this.user)
            })
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  changePassword(oldPass, newPass) {
    return new Promise((resolve, reject) => {
      var user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPass
      );
      user.reauthenticateWithCredential(credential)
        .then(_ => {
          user.updatePassword(newPass)
            .then(res => {
              console.log('res', res)
              resolve('success')
            })
        })
        .catch(err => reject(err))
    })
  }
  logout() {
    this.user = null;
    return firebase.auth().signOut()
  }

  _registerLoginListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log('user signed in', user)
        this.user = user
        this.notifications.showToast('Signed in as '+user.displayName)
        this.events.publish('user:signedIn', user)
      }
      else {
        console.log('no user signed in')
        // User is signed out.
      }
    });
  }
}
