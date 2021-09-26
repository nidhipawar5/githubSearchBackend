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
  
  title = 'fyle-project';
  constructor(private api:GetApiService){
    console.log('Github Component Init...');
  }
  ngOnInit(){
   // this.api.getProfileInfo().subscribe((data)=>{
    //  console.warn("get api data",data);
    //  this.title=data['title'];
    //})
  
  }
 
}
