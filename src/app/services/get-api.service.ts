import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { report } from 'process';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {
  private username: string;
  private clientid='f3571d8e55e169540825';
  private clientsecret ='a6c2b7d8f7c691e771b1908873e1322028e097c4';
  private headers;
  
  

  constructor(
    private http: HttpClient
  ) { 
    console.log("service is now ready!");
    this.username = 'nidhipawar5';
  
    this.headers= new HttpHeaders()
    .set('Accept', 'application/vnd.github.mercy-preview+json')
  }

  getProfileInfo(){
  	return this.http.get("https://api.github.com/users/" + this.username + "?client_id=" + this.clientid + "&client_secret=" + this.clientsecret)
  	.pipe(map(res =>{return res}));
  }

  getProfileRepos(numberOfRepo, pageNumber){
  	return this.http.get("https://api.github.com/users/" + this.username + "/repos?client_id=" + this.clientid + "&client_secret=" + this.clientsecret+ "&per_page=" + numberOfRepo + "&page=" + pageNumber)
  	.pipe(map(res => {return res}));
  }

  getRepoTopics(repoId: string){
    return this.http.get("https://api.github.com/repos/"+this.username+"/" +repoId + "/languages", { 'headers': this.headers})
    .pipe(map(res => {return res }));
  }
 
  
  
  updateProfile(username:string){
  	this.username = username;
  }
}