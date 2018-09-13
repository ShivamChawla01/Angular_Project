import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animation/app.animation';
import { baseURL } from '../shared/baseURL';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {'[@flyInOut]': 'true',
  'style': 'display: block;'},
animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  constructor( private leaderservice: LeaderService,
    @Inject('baseURL') private BaseURL) { }
  leader: Leader[];
  errmess: string;
  ngOnInit() {
    
    this.leaderservice.getLeaders()
    .subscribe(leader => this.leader=leader, errmess => this.errmess=errmess);
    

  }

}
