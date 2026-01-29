import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const addTask = createAction('[Task] Add', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete', props<{ taskId: string }>());
export const toggleTaskCompletion = createAction('[Task] Toggle Completion', props<{ taskId: string }>());
export const clearTasks = createAction('[Task] Clear Tasks');
