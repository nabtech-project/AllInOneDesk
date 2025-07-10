import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Dashboard } from './main/dashboard/dashboard';
import { Contact } from './main/contact/contact';
import { Note } from './main/note/note';
import { Task } from './main/task/task';
import { Event } from './main/event/event';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'dashboard', component: Dashboard },
    { path: 'contact', component: Contact },
    { path: 'note', component: Note },
    { path: 'task', component: Task },
    { path: 'event', component: Event },
    { path: '**', redirectTo: '' }
];
