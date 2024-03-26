import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { TokenManagerComponent } from '../token-manager/token-manager.component';
import { TurnOrderComponent } from '../turn-order/turn-order.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatSidenavModule, 
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    TokenManagerComponent,
    TurnOrderComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {



  showTokenManager = true;
  showTurnOrder = true;

  public toggleTokenManager(){
    this.showTokenManager = !this.showTokenManager;
  }

  public toggleTurnOrder(){
    this.showTurnOrder = !this.showTurnOrder;
  }

}
