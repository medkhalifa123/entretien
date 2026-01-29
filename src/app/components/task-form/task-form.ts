import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html'
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    priority: new FormControl(3, [Validators.required, Validators.min(1), Validators.max(5)]),
    dueDate: new FormControl('', Validators.required)
  });

  addTask() {
    if (this.form.valid) {
      const task: Task = {
        id: uuidv4(),
        title: this.form.value.title!,
        description: this.form.value.description ?? '',
        priority: this.form.value.priority!,
        dueDate: this.form.value.dueDate!,
        completed: false
      };
      this.taskAdded.emit(task);
      this.form.reset({ priority: 3 });
    }
  }
}
