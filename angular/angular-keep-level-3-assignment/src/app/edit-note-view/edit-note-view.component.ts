import { Component, Inject, OnInit } from '@angular/core';
import { Note } from '../note';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  constructor( private dialogRef: MatDialogRef<EditNoteViewComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
                private notesService: NotesService) { }

  ngOnInit() {
    this.note = this.notesService.getNoteById(this.data.noteId);
  }

  onSave() {
    this.errMessage = '';
    this.notesService.editNote(this.note).subscribe(editedNote => {
      this.dialogRef.close();
    },
    err => {
      this.errMessage = err.message;
    });
  }
}

