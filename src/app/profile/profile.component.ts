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
  tags:any=[];
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
    this.totalPages=[];
    this.getApi.getProfileInfo().subscribe((profile: any)=>{
      this.totalRecordsCount = profile.public_repos;
      let totalPaginator =  Math.ceil(profile.public_repos / this.noOfRepo);
      for (var i=1;i<=totalPaginator;i++) {
        this.totalPages.push(i);
      }
      console.log("total pages", this.totalPages)
      this.profile=profile;
    }, () => {
      console.log("no profile found");
      this.noProfileFound = 2;
      this.profile = undefined;
    });

    
    this.getApi.getProfileRepos(this.noOfRepo, 1).subscribe(repos=>{
      this.noProfileFound=1;
      console.log(repos);
      this.repos=repos;
      this.repos.forEach((element) => {
        this.getApi.getRepoTopics(element.name).subscribe(tags => {
          let temptags=[];
          for(const key in tags){
            temptags.push(key);
          }
          this.tags.push(temptags);
          
        })
      })
      console.log("tags",this.tags);
    }, () => {
      console.log("no repos for this user")
    });
    
    
    
  }
  
  getRepoPaginated(pageNumber) {
    this.tags = []
    this.pageNumber = pageNumber;
    this.getApi.getProfileRepos(this.noOfRepo, pageNumber).subscribe(repos=> {
      this.repos.repo = repos;
      this.repos.repo.forEach((element) => {
        this.getApi.getRepoTopics(element.name).subscribe(tags => {
          let temptags=[]
          for(const key in tags){
            console.log("key", key)
            temptags.push(key);
          }
          this.tags.push(temptags);
          
        })
        this.repos.tags = this.tags;

      })
    }, () => {
      console.log('No Repos Found')
    })
  }


  ngOnInit() {
    
  }

}
