import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { Objective } from '../Model/Objective';

@Injectable({
  providedIn: 'root'
})
export class CommunicationServiceService {

  constructor(private http: HttpClient) { }

  GetObjectives(searchString?: string): Observable<Array<Objective>> {
    if (searchString == null) {
      return this.http.get<Array<Objective>>('Objective');
    } else {
      return this.http.get<Array<Objective>>(`Objective/search/${searchString}`);
    }
  }

  GetObjectiveById(id: number): Observable<any> {
    return this.http.get<number>(`Objective/objective/${id}`);
  }

  CompleteObjective(id: number): Observable<void> {
    return this.http.patch<void>(`Objective/complete/${id}`, id)
  }

  DeleteObjective(id: number): Observable<void> {
    return this.http.delete<void>(`Objective/delete/${id}`);
  }

  AddOrEditObjective(id: number, obj: Objective): Observable<void> {
    if (id) {
      return this.http.patch<void>(`Objective/addEdit/${id}`, obj);
    }
    return this.http.patch<void>(`Objective/addEdit`, obj);
  }

}
