import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firestore } from 'firebase/app';

interface Task {
  label: string,
  id: string
}

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html'
})
export class UpdateTaskComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private af: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  updateTaskForm: FormGroup;

  task: Task;

  ngOnInit(): void {
    this.task = this.route.snapshot.data.task;

    this.updateTaskForm = this.fb.group({
      label: [this.task.label, Validators.required]
    });
  }

  async update() {

    const { valid, value } = this.updateTaskForm;

    if (valid) {
      const uid = this.route.snapshot.params.uid;
      const batch = this.af.firestore.batch();

      const taskId = this.task.id;
      const taskRef = this.af.collection('users').doc(uid).collection('tasks').doc<Task>(taskId).ref;
      const label = value.label;
      const updatedAt = firestore.FieldValue.serverTimestamp();

      batch.update(taskRef, { label, updatedAt, id: taskId });

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

  async delete() {

    const uid = this.route.snapshot.params.uid;
    const batch = this.af.firestore.batch();

    const taskId = this.task.id;
    const taskRef = this.af.collection('users').doc(uid).collection('tasks').doc(taskId).ref;

    const userRef = this.af.collection('users').doc(uid).ref;
    const numberOfTasks = firestore.FieldValue.increment(-1);


    batch.update(userRef, { numberOfTasks });
    batch.delete(taskRef);

    try {
      await batch.commit();
      alert('Se elimino correctamente')
      await this.router.navigate(['/usuarios', uid]);
    } catch (error) {
      alert('Ocurrió un error al guardar');
      console.log(error)
    }
  }
}
