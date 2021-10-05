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
  noOfRepo: number=10;
  Repo:any;
  noProfileFound: number = 1;
  
  constructor(private getApi: GetApiService) { 
    
  }

  findProfile(){
    this.getApi.updateProfile(this.username);
    this.getApi.getProfileInfo().subscribe(profile=>{
      console.log("profile", profile);
      this.profile=profile;
    }, () => {
      console.log("no profile found");
      this.noProfileFound = 2;
      this.profile = undefined;
    });

    
    this.getApi.getProfileRepos(this.noOfRepo, 1).subscribe(repos=>{
      console.log(repos);
      this.repos=repos;
    }, () => {
      console.log("no repos for this user")
    });
    
    this.getApi.getRepoTags().subscribe(Repo=>{
      console.log(Repo);
      this.Repo=Repo;
    }, () => {
      console.log("no tags for this user")
    });
  }

  getRepoPaginated(pageNumber) {
    this.getApi.getProfileRepos(this.noOfRepo, pageNumber).subscribe(repos=> {
      this.repos = repos;
    }, () => {
      console.log('No Repos Found')
    })
  }


  ngOnInit() {
    
  }

}
