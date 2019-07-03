import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environemnt
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { RecipeEffects } from './recipes/store/recipe.effects';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      SharedModule,
      CoreModule,
      StoreModule.forRoot(fromApp.appReducer),
      StoreDevtoolsModule.instrument({
         maxAge: 25, // Retains last 25 states
         logOnly: environment.production, // Restrict extension to log-only mode
       }),
       EffectsModule.forRoot([AuthEffects, RecipeEffects]),
   ],
   bootstrap: [
      AppComponent
   ],
   providers: [
      LoggingService
   ]
})
export class AppModule {}
