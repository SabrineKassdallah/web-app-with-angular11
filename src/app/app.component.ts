import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'web-cat-app';
  constructor(private http:HttpClient) {}

  ngOnInit() {
    this.http.get('/api/status').subscribe(data => {
      console.log("hello", data ) 
    });
  }
}
