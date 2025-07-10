import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event',
  standalone: true,
  templateUrl: './event.html',
  styleUrls: ['./event.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class Event implements OnInit {
  events: any[] = [];
  view: 'table' | 'grid' = 'table';
  showForm = false;

  currentEvent: any = {
    id: null,
    title: '',
    location: '',
    eventDateTime: null,
    eventDateTimeLocal: ''
  };

  editMode = false;

  constructor(private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<any[]>('/api/events').subscribe((data) => {
      this.events = data;
      this.events.forEach(event => {
        event.eventDateTimeLocal = this.formatDateTimeLocal(event.eventDateTime);
      });
    });
  }

  openFormForNew() {
    this.editMode = false;
    this.currentEvent = { id: null, title: '', location: '', eventDateTime: null, eventDateTimeLocal: '' };
    this.showForm = true;
  }

  openFormForEdit(event: any) {
    this.editMode = true;
    this.currentEvent = { ...event };
    this.currentEvent.eventDateTimeLocal = this.formatDateTimeLocal(event.eventDateTime);
    this.showForm = true;
  }

  saveEvent() {
    this.currentEvent.eventDateTime = new Date(this.currentEvent.eventDateTimeLocal).toISOString();

    if (this.editMode) {
      this.http
        .put(`/api/events/${this.currentEvent.id}`, this.currentEvent)
        .subscribe(() => {
          this.closeForm();
          this.loadEvents();
        });
    } else {
      this.http.post('/api/events', this.currentEvent).subscribe(() => {
        this.closeForm();
        this.loadEvents();
      });
    }
  }

  deleteEvent(id: number) {
    this.http.delete(`/api/events/${id}`).subscribe(() => {
      this.loadEvents();
    });
  }

  closeForm() {
    this.showForm = false;
    this.editMode = false;
    this.currentEvent = { id: null, title: '', location: '', eventDateTime: null, eventDateTimeLocal: '' };
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
