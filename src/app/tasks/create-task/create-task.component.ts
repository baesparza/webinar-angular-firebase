import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html'
})
export class CreateTaskComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private af: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  newTaskForm: FormGroup;

  ngOnInit(): void {
    this.newTaskForm = this.fb.group({
      label: [null, Validators.required]
    });
  }

  async save() {

    const { valid, value } = this.newTaskForm;

    if (valid) {
      const uid = this.route.snapshot.params.uid;
      const batch = this.af.firestore.batch();


      const taskId = this.af.createId();
      const taskRef = this.af.collection('users').doc(uid).collection('tasks').doc(taskId).ref;
      const label = value.label;
      const createAt = firestore.FieldValue.serverTimestamp();


      const userRef = this.af.collection('users').doc(uid).ref;
      const numberOfTasks = firestore.FieldValue.increment(1);


      batch.update(userRef, { numberOfTasks });
      batch.set(taskRef, { label, createAt, id: taskId });

      try {
        await batch.commit();
        alert('Se guardo correctamente')
        await this.router.navigate(['/usuarios', uid]);
      } catch (error) {
        alert('Ocurrió un error al guardar');
        console.log(error)
      }
    }
    else
      alert('Formulario incompleto')
  }

}
