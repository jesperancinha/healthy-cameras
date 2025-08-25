import { Buffer } from 'buffer';
(window as any).Buffer = Buffer;

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app/app-routing.module';
import { APP_PROVIDERS } from './app/app.module';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      MatCardModule,
      MatButtonModule,
      MatInputModule,
      MatTableModule,
      MatSelectModule,
      FormsModule,
      FlexLayoutModule,
      AppRoutingModule
    ),
    provideHttpClient(),
    ...APP_PROVIDERS
  ]
}).catch(err => console.error(err));
