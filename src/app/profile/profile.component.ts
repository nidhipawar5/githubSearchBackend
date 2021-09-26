import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../services/get-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile:any;
  repos:any;
  username:string;
  
  constructor(private getApi: GetApiService) { 
    
  }

  findProfile(){
    this.getApi.updateProfile(this.username);
    this.getApi.getProfileInfo().subscribe(profile=>{
      console.log(profile);
      this.profile=profile;
    });

    
    this.getApi.getProfileRepos().subscribe(repos=>{
      console.log(repos);
      this.repos=repos;
    })
  }


  ngOnInit() {
    
  }

}
