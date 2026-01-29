import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app';
import { userReducer } from './app/store/user/user.reducer';
import { taskReducer } from './app/store/tasks/task.reducer';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({ user: userReducer, tasks: taskReducer }),
    provideStoreDevtools({ maxAge: 25 })
  ]
}).catch(err => console.error(err));
