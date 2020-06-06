import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { PreloadTaskResolver } from './tasks/update-task/preload.resolver';
import { UpdateTaskComponent } from './tasks/update-task/update-task.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ViewUserInfoComponent } from './users/view-user-info/view-user-info.component';


const routes: Routes = [
  { path: 'usuarios', component: ListUsersComponent },
  { path: 'usuarios/:uid', component: ViewUserInfoComponent },
  { path: 'usuarios/:uid/tarea/nuevo', component: CreateTaskComponent },
  { path: 'usuarios/:uid/tarea/:taskId/actualizar', component: UpdateTaskComponent, resolve: { task: PreloadTaskResolver } },
  { path: '**', redirectTo: '/usuarios', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
