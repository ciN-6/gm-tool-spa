import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Monster } from './srb-model/models/monster/types';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.local';
import * as util from '../util/util'
import { Spell } from './srb-model/models/spell/types';


const apiRootUrl = "/api";
const monsters = "/monsters"
const spells = "/spells"
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

  public getSpell(spellName: string): Observable<Spell> {
    let key = util.transformIntoKey(spellName);
    let url = environment.dnd5eSrdApi + apiRootUrl + spells + spacer + key;
    return this.http.get<Spell>(url);
  }

  public getAllSpells(): Observable<any> {
    let url = environment.dnd5eSrdApi + apiRootUrl + spells;
    console.log("Calling : ", url);
    return this.http.get<Spell[]>(url);
  }


  public getSpellsFiltered(level: string, school: string): Observable<Spell[]> {
    let option = { params: { level: level, school: school } }
    let url = environment.dnd5eSrdApi + apiRootUrl + spells;
    return this.http.get<Spell[]>(url, option);
  }

}
