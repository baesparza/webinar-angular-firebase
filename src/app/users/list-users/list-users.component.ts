import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html'
})
export class ListUsersComponent implements OnInit, OnDestroy {

  users: Array<any>;
  usersSub: Subscription;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.usersSub = this.firestore.collection('users')
      .valueChanges()
      .subscribe(users => this.users = users);
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

}
