import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { LoginComponent } from './components/login/login';
import { TaskFormComponent } from './components/task-form/task-form';
import { TaskListComponent } from './components/task-list/task-list';
import { selectIsLoggedIn, selectUserState } from './store/user/user.selectors';
import { logout } from './store/user/user.actions';
import { addTask, clearTasks } from './store/tasks/task.actions';
import { Task } from './models/task.model';
import { UserState } from './store/user/user.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, TaskFormComponent, TaskListComponent],
  templateUrl: './app.html',
})
export class AppComponent {
  isLoggedIn$!: Observable<boolean>;
  email$!: Observable<string | null>;

  constructor(private store: Store) {
    // Observable pour savoir si l'utilisateur est connecté
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);

    // Observable pour récupérer l'email
    this.email$ = this.store.select(selectUserState).pipe(
      map((s: UserState) => s.email)
    );
  }

  // Ajout d'une tâche
  addNewTask(task: Task) {
    this.store.dispatch(addTask({ task }));
  }

  // Déconnexion et suppression des tâches du store (mais persistance par email gérée dans le reducer)
  logoutUser() {
    this.store.dispatch(logout());
    this.store.dispatch(clearTasks());
  }
}
