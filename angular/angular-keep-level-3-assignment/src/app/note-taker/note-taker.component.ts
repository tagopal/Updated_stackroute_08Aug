import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  public note: Note= new Note();
  public notes: Array<Note>= [];
  public errMessage: string;
  constructor(private notesService: NotesService) {}

  ngOnInit() {
  }

  takeNotes() {
    if (this.note.title === '' && this.note.text === '') {
          this.errMessage = 'Title and Text both are required fields';
          return Observable.throw(this.errMessage);
     }else if (this.note.title === '') {
          this.errMessage = 'Please provide title';
          return Observable.throw(this.errMessage);
     }else if (this.note.text === '') {
          this.errMessage = 'Please provide text';
          return Observable.throw(this.errMessage);
     }else {
        this.notes.push(this.note);
        this.notesService.addNote({title: this.note.title, text: this.note.text}).subscribe(data => {},
          err => {
            this.errMessage = err.message;
            const index: number =  this.notes.findIndex(note => note.title === this.note.title);
            this.notes.splice(index, 1);
            return Observable.throw(this.errMessage);
          });
     }
     this.note = new Note();
  }
}
