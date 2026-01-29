import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { addTask, updateTask, deleteTask, toggleTaskCompletion, clearTasks } from './task.actions';
import { login, logout } from '../user/user.actions';

export interface TaskState {
  tasks: Task[];
}

// Persistance par utilisateur
const saveTasksToStorage = (email: string, tasks: Task[]) => {
  localStorage.setItem(`tasks_${email}`, JSON.stringify(tasks));
};

const loadTasksFromStorage = (email: string): Task[] => {
  const saved = localStorage.getItem(`tasks_${email}`);
  return saved ? JSON.parse(saved) : [];
};

// état initial vide
export const initialState: TaskState = { tasks: [] };

export const taskReducer = createReducer(
  initialState,

  // Ajouter une tâche
  on(addTask, (state: TaskState, { task }) => {
    const email = localStorage.getItem('current_user');
    if (!email) return state;
    const tasks = [...state.tasks, task];
    saveTasksToStorage(email, tasks);
    return { ...state, tasks };
  }),

  // Mettre à jour une tâche
  on(updateTask, (state: TaskState, { task }) => {
    const email = localStorage.getItem('current_user');
    if (!email) return state;
    const tasks = state.tasks.map(t => t.id === task.id ? task : t);
    saveTasksToStorage(email, tasks);
    return { ...state, tasks };
  }),

  // Supprimer une tâche
  on(deleteTask, (state: TaskState, { taskId }) => {
    const email = localStorage.getItem('current_user');
    if (!email) return state;
    const tasks = state.tasks.filter(t => t.id !== taskId);
    saveTasksToStorage(email, tasks);
    return { ...state, tasks };
  }),

  // Cocher/décocher une tâche
  on(toggleTaskCompletion, (state: TaskState, { taskId }) => {
    const email = localStorage.getItem('current_user');
    if (!email) return state;
    const tasks = state.tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    saveTasksToStorage(email, tasks);
    return { ...state, tasks };
  }),

  // Clear tasks (au logout si nécessaire)
  on(clearTasks, (state: TaskState) => ({ tasks: [] })),

  // Au login : charger les tâches correspondant à l'utilisateur
  on(login, (state, { email }) => {
    localStorage.setItem('current_user', email);
    const tasks = loadTasksFromStorage(email);
    return { ...state, tasks };
  }),

  // Au logout : supprimer current_user
  on(logout, (state: TaskState) => {
    localStorage.removeItem('current_user');
    return { tasks: [] };
  })
);
