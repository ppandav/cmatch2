import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatchService } from 'src/app/services/match/match.service';


@Component({
  selector: 'app-match-popup',
  templateUrl: './match-popup.component.html',
  styleUrls: ['./match-popup.component.css']
})
export class MatchPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MatchPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public matchService: MatchService) { }

  ngOnInit(): void {
    console.log('data from match pop up - ', this.data);
  }

  close() {
    this.dialogRef.close();
  }


}
