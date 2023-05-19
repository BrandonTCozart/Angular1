import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Objective } from '../Model/Objective';
import { CommunicationServiceService } from '../Services/communication-service.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  objectiveId!: number;
  objective: Objective = new Objective();
  loaderShow: boolean = true;

  constructor(private route: ActivatedRoute, private objectiveService: CommunicationServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.objectiveId = params['id'];
    });

    this.objectiveService.GetObjectiveById(this.objectiveId).subscribe({
      next: (x) => {this.objective = x;},
      error: (e) => { console.log(e) },
      complete: () => { this.loaderShow = false; }
    });
  }

}
