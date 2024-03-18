import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { TokenManagerComponent } from './token-manager/token-manager.component';
import { TurnOrderComponent } from './turn-order/turn-order.component';

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
    TokenManagerComponent,
    TurnOrderComponent
  ]
})
export class AppComponent {
  title = 'gm-tool';

  showTokenManager = true;
  showTurnOrder = true;

  public toggleTokenManager(){
    this.showTokenManager = !this.showTokenManager;
  }

  public toggleTurnOrder(){
    this.showTurnOrder = !this.showTurnOrder;
  }

}
