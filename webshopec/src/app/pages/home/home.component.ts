import { Component, OnInit } from '@angular/core';

const ROWS_HEIGHT: {[id:number]: number} = {1: 400 , 3: 335, 4: 350};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];

  onColumnsCountChange(colsNum: number) {
    this.cols = colsNum;
  }

  onShowCategory(nwCategory: string) {
     this.category = nwCategory;
     this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
