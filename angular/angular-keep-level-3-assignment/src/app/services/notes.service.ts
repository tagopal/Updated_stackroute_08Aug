
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../note';
import 'rxjs/add/operator/map';
import { tap } from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class NotesService {
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  token: any;
  constructor(private http: HttpClient, private _authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);  }

  fetchNotesFromServer() {
    this.token = this._authService.getBearerToken();
    return this.http.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    });
  }



  getNotes(): Observable<Array<Note>> {
    return this.notesSubject;
  }

  addNote({title, text}): Observable<Note> {
    this.token = this._authService.getBearerToken();
    return this.http.post<Note>('http://localhost:3000/api/v1/notes', {title, text}, {
          headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
    }).pipe(tap(addedNote => {
            this.notes.push(addedNote);
            this.notesSubject.next(this.notes);
          }));
  }
  getNoteById(noteId) {
    const note = this.notes.find( note => note.id === noteId);
    return Object.assign({}, note);
  }

  editNote(note): Observable<Note> {
    this.token = this._authService.getBearerToken();
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(tap(editedNote => {
      const note = this.notes.find( note => note.id === editedNote.id);
      Object.assign(note, editedNote);
      this.notesSubject.next(this.notes);
    }));
  }
}
