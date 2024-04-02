import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Monster } from './srb-model/models/monster/types';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.local';
import * as util from '../util/util'


const apiRootUrl = "/api";
const monsters = "/monsters"
const spacer = "/"

@Injectable({
  providedIn: 'root'
})
export class SrbApiService {

  constructor(private http: HttpClient) { }
  public getMonster(monsterName: string): Observable<Monster> {
    let key = util.transformIntoKey(monsterName);
    let url = environment.dnd5eSrdApi + apiRootUrl + monsters + spacer + key;
    return this.http.get<Monster>(url);
  }

}
