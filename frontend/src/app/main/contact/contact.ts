import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class Contact implements OnInit {
  contacts: any[] = [];
  view: 'table' | 'grid' = 'table';
  showForm = false;

  currentContact = { id: null, name: '', email: '', phone: '' };
  editMode = false;

  constructor(private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.http.get<any[]>('/api/contacts').subscribe((data) => {
      this.contacts = data;
    });
  }

  openFormForNew() {
    this.editMode = false;
    this.currentContact = { id: null, name: '', email: '', phone: '' };
    this.showForm = true;
  }

  openFormForEdit(contact: any) {
    this.editMode = true;
    this.currentContact = { ...contact };
    this.showForm = true;
  }

  saveContact() {
    if (this.editMode) {
      this.http
        .put(`/api/contacts/${this.currentContact.id}`, this.currentContact)
        .subscribe(() => {
          this.closeForm();
          this.loadContacts();
        });
    } else {
      this.http.post('/api/contacts', this.currentContact).subscribe(() => {
        this.closeForm();
        this.loadContacts();
      });
    }
  }

  deleteContact(id: number) {
    this.http.delete(`/api/contacts/${id}`).subscribe(() => {
      this.loadContacts();
    });
  }

  closeForm() {
    this.showForm = false;
    this.editMode = false;
    this.currentContact = { id: null, name: '', email: '', phone: '' };
  }

  goBack() {
    this.location.back();
  }
}
