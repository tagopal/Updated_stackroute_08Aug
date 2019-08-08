import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {

  constructor( private dialog: MatDialog, private activateRoute: ActivatedRoute, private routerService: RouterService) {
    const noteId = +this.activateRoute.snapshot.paramMap.get('noteId');
    this.dialog.open(EditNoteViewComponent, {
      data: {
        noteId: noteId
      }
    }).afterClosed().subscribe(result => {
      this.routerService.routeBack();
    });
  }

}
