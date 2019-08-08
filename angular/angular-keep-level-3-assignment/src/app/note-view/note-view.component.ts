import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  public note: Note= new Note();
  public notes: Array<Note>= [];
  public errMessage: string;
  constructor(private noteService: NotesService) { }

  ngOnInit() {
    this.noteService.getNotes().subscribe(data => {
        this.notes = data;
      },
      err => {
        this.errMessage = err.message;
        return Observable.throw(this.errMessage);
      });
  }

}
