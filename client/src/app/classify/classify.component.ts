import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent implements OnInit {
  recurring: boolean;
  internal: string;
  external: string;

  constructor() { }

  ngOnInit() {
  }

  print(){
    console.log(this.internal);
    console.log(this.external);
    console.log(this.recurring);
  }

}
