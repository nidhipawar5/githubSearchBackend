import { typeWithParameters } from '@angular/compiler/src/render3/util';
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
  pageNumber: number = 1;
  Repo:any;
  noProfileFound: number = 1;

  // Current page number
  currentPageNumber: number = 1;
  // Total records count
  totalRecordsCount: number = 0;
  // Total pages
  totalPages: any = [];
  // Pager
  pager: any = {};
  
  constructor(private getApi: GetApiService) { 
    
  }

  // Fetch new page data
  next() {
    this.getRepoPaginated(this.currentPageNumber + 1)
  }
  
  // Fetch previous page data
  prev() {
    this.getRepoPaginated(this.currentPageNumber - 1)
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
      console.log(Repo + "look for this");
      this.Repo=Repo;
    }, () => {
      console.log("no tags for this user")
    });
  }

  getRepoPaginated(pageNumber) {
    this.pageNumber = pageNumber;
    this.getApi.getProfileRepos(this.noOfRepo, pageNumber).subscribe(repos=> {
      this.repos = repos;
    }, () => {
      console.log('No Repos Found')
    })
  }


  ngOnInit() {
    
  }

}
