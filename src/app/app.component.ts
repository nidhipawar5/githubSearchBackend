import { Component } from '@angular/core';
import { GetApiService } from './get-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetApiService],
})
export class AppComponent {
  title = 'fyle-project';
  constructor(private api:GetApiService){

  }
  ngOnInit(){
    this.api.apiCall().subscribe((data)=>{
      console.warn("get api data",data);
      //this.title=data['title'];
    })
  }
}
