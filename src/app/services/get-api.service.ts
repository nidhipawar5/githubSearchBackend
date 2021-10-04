import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {
  
  private username: string;
  private clientid='f3571d8e55e169540825';
  private clientsecret ='a6c2b7d8f7c691e771b1908873e1322028e097c4';
  
  

  constructor(
    private http: HttpClient
  ) { 
    console.log("service is now ready!");
    this.username = 'nidhipawar5'; }

  getProfileInfo(){
  	return this.http.get("https://api.github.com/users/" + this.username + "?client_id=" + this.clientid + "&client_secret=" + this.clientsecret)
  	.pipe(map(res =>{return res}));
  }

  getProfileRepos(numberOfRepo, pageNumber){
  	return this.http.get("https://api.github.com/users/" + this.username + "/repos?client_id=" + this.clientid + "&client_secret=" + this.clientsecret)
  	.pipe(map(res => {return res}));
  }

  getRepoTags(){
    return this.http.get("https://api.github.com/users/"+this.username+"/repo_id/topics")
    .pipe(map(res => {return res}));
  }
  
  updateProfile(username:string){
  	this.username = username;
  }
}