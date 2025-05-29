import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AosService } from './core/services/aos.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'assignment-task';

  constructor(private aosService: AosService) {}
  ngOnInit(): void {
    this.aosService.init();
  }
}
