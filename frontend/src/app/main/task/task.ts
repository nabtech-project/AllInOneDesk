import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.html',
  styleUrls: ['./task.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class Task implements OnInit {
  tasks: any[] = [];
  view: 'table' | 'grid' = 'table';
  showForm = false;

  currentTask: any = {
    id: null,
    title: '',
    dueDate: '',
    dueDateLocal: '',
    completed: false
  };

  editMode = false;

  constructor(private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<any[]>('/api/tasks').subscribe((data) => {
      this.tasks = data;
      this.tasks.forEach(task => {
        task.dueDateLocal = this.formatDateTimeLocal(task.dueDate);
      });
    });
  }

  openFormForNew() {
    this.editMode = false;
    this.currentTask = { id: null, title: '', dueDate: '', dueDateLocal: '', completed: false };
    this.showForm = true;
  }

  openFormForEdit(task: any) {
    this.editMode = true;
    this.currentTask = { ...task };
    this.currentTask.dueDateLocal = this.formatDateTimeLocal(task.dueDate);
    this.showForm = true;
  }

  saveTask() {
    this.currentTask.dueDate = new Date(this.currentTask.dueDateLocal).toISOString();

    if (this.editMode) {
      this.http
        .put(`/api/tasks/${this.currentTask.id}`, this.currentTask)
        .subscribe(() => {
          this.closeForm();
          this.loadTasks();
        });
    } else {
      this.http.post('/api/tasks', this.currentTask).subscribe(() => {
        this.closeForm();
        this.loadTasks();
      });
    }
  }

  deleteTask(id: number) {
    this.http.delete(`/api/tasks/${id}`).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleComplete(task: any) {
    task.completed = !task.completed;
    this.http.put(`/api/tasks/${task.id}`, task).subscribe(() => {
      this.loadTasks();
    });
  }

  closeForm() {
    this.showForm = false;
    this.editMode = false;
    this.currentTask = { id: null, title: '', dueDate: '', dueDateLocal: '', completed: false };
  }

  goBack() {
    this.location.back();
  }

  private formatDateTimeLocal(dateTime: string): string {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    const pad = (n: number) => n.toString().padStart(2, '0');
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
  }
}
