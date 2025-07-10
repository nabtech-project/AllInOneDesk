import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note',
  standalone: true,
  templateUrl: './note.html',
  styleUrls: ['./note.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class Note implements OnInit {
  notes: any[] = [];
  view: 'table' | 'grid' = 'table';
  showForm = false;

  currentNote: any = {
    id: null,
    title: '',
    content: '',
    createdAt: null,
    createdAtLocal: ''
  };

  editMode = false;

  constructor(private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.http.get<any[]>('/api/notes').subscribe((data) => {
      this.notes = data;
      this.notes.forEach(note => {
        note.createdAtLocal = this.formatDateTimeLocal(note.createdAt);
      });
    });
  }

  openFormForNew() {
    this.editMode = false;
    this.currentNote = { id: null, title: '', content: '', createdAt: null, createdAtLocal: '' };
    this.showForm = true;
  }

  openFormForEdit(note: any) {
    this.editMode = true;
    this.currentNote = { ...note };
    this.currentNote.createdAtLocal = this.formatDateTimeLocal(note.createdAt);
    this.showForm = true;
  }

  saveNote() {
    this.currentNote.createdAt = new Date(this.currentNote.createdAtLocal).toISOString();

    if (this.editMode) {
      this.http
        .put(`/api/notes/${this.currentNote.id}`, this.currentNote)
        .subscribe(() => {
          this.closeForm();
          this.loadNotes();
        });
    } else {
      this.http.post('/api/notes', this.currentNote).subscribe(() => {
        this.closeForm();
        this.loadNotes();
      });
    }
  }

  deleteNote(id: number) {
    this.http.delete(`/api/notes/${id}`).subscribe(() => {
      this.loadNotes();
    });
  }

  closeForm() {
    this.showForm = false;
    this.editMode = false;
    this.currentNote = { id: null, title: '', content: '', createdAt: null, createdAtLocal: '' };
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
