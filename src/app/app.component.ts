import { SelectorMatcher } from '@angular/compiler';
import { Component } from '@angular/core';

import { GetApiService } from './services/get-api.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetApiService],
})
export class AppComponent {
  user:any;
  repos:any;
  data:any;
  totalRecords:Number;
  page:Number=1;
  skeletonloader=true;
  
  title = 'fyle-project';
  constructor(private api:GetApiService){
    console.log('Github Component Init...');
    this.api.getProfileInfo().subscribe(data => {
      this.data = data;
      this.skeletonloader = false;
      }, error => console.error(error));
  }
  
  ngOnInit(){
   
  
  }
 
}
