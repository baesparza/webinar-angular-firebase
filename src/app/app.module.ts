import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseModule } from './firebase.module';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { PreloadTaskResolver } from './tasks/update-task/preload.resolver';
import { UpdateTaskComponent } from './tasks/update-task/update-task.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ViewUserInfoComponent } from './users/view-user-info/view-user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    ViewUserInfoComponent,
    CreateTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirebaseModule,
    ReactiveFormsModule
  ],
  providers: [PreloadTaskResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
