import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-user-info',
  templateUrl: './view-user-info.component.html'
})
export class ViewUserInfoComponent {

  constructor(private af: AngularFirestore, private route: ActivatedRoute) { }


  userObs: Observable<any> = this.route.params
    .pipe(
      map(params => params.uid), // obtengo el id de la ruta
      mergeMap(id => this.af.collection('users').doc(id).valueChanges()), // transformo al nuevo observable
    );

  tasksObs: Observable<any> = this.route.params
    .pipe(
      map(params => params.uid), // obtengo el id de la ruta
      mergeMap(id => this.af.collection('users').doc(id).collection('tasks').valueChanges()), // transformo al nuevo observable
    );

}
