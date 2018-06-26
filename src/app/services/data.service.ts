import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  URL = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }

  addGoal(goal: string) {
    const data = { todo_name : goal };
    return this.http.post(this.URL + '/goals', data);
  }

  getGoals() {
    return this.http.get(this.URL + '/goals');
  }
  removeGoal(id) {
    return this.http.delete(this.URL + '/goals/' + id);
  }
}
