import { Component, OnInit } from '@angular/core';
import { ExampleDataService } from '../service/example-data.service';


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: [ './example.component.scss' ]
})
export class ExampleComponent implements OnInit {
  public content: string;
  public error: any;

  constructor(private readonly exampleDataService: ExampleDataService) { }

  ngOnInit(): void {
    this.exampleDataService.read().subscribe(
      exampleData => {
        this.content = exampleData.content;
        this.error = null;
      }, error => {
        this.error = error;
      }
    );
  }

  saveContent() {
    this.exampleDataService.save({ content: this.content }).subscribe(
      () => {
        this.error = null;
      },
      error => {
        this.error = error;
      }
    );
  }
}
