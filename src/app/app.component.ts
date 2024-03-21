import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [    
    MatButtonModule, 
    RouterModule,
    RouterOutlet
  ]
})
export class AppComponent {
  title = 'gm-tool';
}
