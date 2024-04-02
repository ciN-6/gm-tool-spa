import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { routes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import * as turnOrderEffect from './app/store/Effects/turn-order.effects';
import { TurnOrderEffects } from './app/store/Effects/turn-order.effects';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideRouter(routes),
    provideEffects(TurnOrderEffects),
    provideStore(),
    provideRouterStore()
  ]
});

