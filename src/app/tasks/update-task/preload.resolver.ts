import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PreloadTaskResolver implements Resolve<any> {

    constructor(private af: AngularFirestore) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        const { uid, taskId } = route.params;

        return this.af.collection('users').doc(uid).collection('tasks').doc(taskId)
            .get()
            .pipe(
                map(snapshot => snapshot.data()),
            );
    }
}