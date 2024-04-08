import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { routes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { TurnOrderEffects } from './app/store/Effects/turn-order.effects';
import { SpellsEffects } from './app/store/Effects/spells.effects';
import { graphqlProvider } from './app/graphql.provider';
import { MarkdownModule } from 'ngx-markdown';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, MarkdownModule.forRoot()),
    provideAnimations(),
    provideRouter(routes),
    provideEffects(TurnOrderEffects, SpellsEffects),
    provideStore(),
    provideRouterStore(), provideHttpClient(), graphqlProvider
  ]
});

