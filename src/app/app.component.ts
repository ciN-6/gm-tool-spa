import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { TokenManagerComponent } from './token-manager/token-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MatSidenavModule, 
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    TokenManagerComponent]
})
export class AppComponent {
  title = 'gm-tool';

  showTokenManager = true;


  public toggleTokenManager(){
    this.showTokenManager = !this.showTokenManager;
  }

}
