import { DataService } from './../services/data.service';
import { Todo } from './../shared/entities/Todo';
import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
          ,
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  goalText: string;
  itemCount: number;
  goals = Array<Todo>();
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.getGoals();
  }

  getGoals() {
    this.dataService.getGoals().subscribe((response) => {
      this.goals = response as Array<Todo>;
      this.itemCount = this.goals.length;
    },
  (error) => console.log(error));
  }
  addGoal() {
    if (this.goalText) {
      this.dataService.addGoal(this.goalText).subscribe((response) => {
        this.goals.push(response as Todo);
        this.goalText = '';
        this.itemCount = this.goals.length;
      },
    (error) => console.log(error));
    }
  }
  removeItem(id) {
    this.dataService.removeGoal(id['$oid']).subscribe((response) => {
      var index = this.goals.findIndex(r => r._id === id);
      if (index > -1) {
        this.goals.splice(index, 1);
        this.itemCount = this.goals.length;
      }
    });
  }
}
