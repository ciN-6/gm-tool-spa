import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TokenManagerComponent } from './token-manager/token-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MatButtonModule,
    RouterModule,
    TokenManagerComponent]
})
export class AppComponent {
  title = 'gm-tool';

}
