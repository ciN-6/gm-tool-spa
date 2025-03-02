import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { DndBeyondCharacterRoot } from './models/dnBeyond.models';


const apiRootUrl = "/character/v5/character";
const spacer = "/"

@Injectable({
  providedIn: 'root'
})
export class DndBeyondService {


  constructor(private http: HttpClient) { }


  public getDndBeyondCharacter(characterId: string): Observable<DndBeyondCharacterRoot | null> {
    if (!characterId) {
      return of(null);
    }
    let url = environment.dndBeyondApi + apiRootUrl + spacer + characterId;
    return this.http.get<DndBeyondCharacterRoot>(url);
  }
}
