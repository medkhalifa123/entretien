import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <-- Ajouté
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Task } from '../../models/task.model';
import { selectAllTasks } from '../../store/tasks/task.selectors';
import { toggleTaskCompletion, deleteTask, updateTask } from '../../store/tasks/task.actions';
import { TaskState } from '../../store/tasks/task.reducer';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],  // <-- Ajouté FormsModule ici
  templateUrl: './task-list.html',
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  editingTaskId: string | null = null;
  editedTitle: string = '';
  editedDescription: string = '';
  editedPriority: number = 3;
  editedDueDate: string = '';

  constructor(private store: Store<{ tasks: TaskState }>) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  toggleComplete(id: string): void {
    this.store.dispatch(toggleTaskCompletion({ taskId: id }));
  }

  removeTask(id: string): void {
    this.store.dispatch(deleteTask({ taskId: id }));
  }

  startEditing(task: Task): void {
    this.editingTaskId = task.id;
    this.editedTitle = task.title;
    this.editedDescription = task.description;
    this.editedPriority = task.priority;
    this.editedDueDate = task.dueDate;
  }

  saveTask(): void {
    if (!this.editingTaskId) return;
    const updatedTask: Task = {
      id: this.editingTaskId,
      title: this.editedTitle,
      description: this.editedDescription,
      priority: this.editedPriority,
      dueDate: this.editedDueDate,
      completed: false
    };
    this.store.dispatch(updateTask({ task: updatedTask }));
    this.editingTaskId = null;
  }

  cancelEdit(): void {
    this.editingTaskId = null;
  }
}
