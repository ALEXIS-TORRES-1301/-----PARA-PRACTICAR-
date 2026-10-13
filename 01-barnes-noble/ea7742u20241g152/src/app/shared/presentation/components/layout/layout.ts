import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {environment} from '../../../../../environments/environment';

/**
 * Main shell component that hosts the toolbar, sidenav navigation and routed content.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe,
    LanguageSwitcher
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  /**
   * URL of the institutional logo provided by the Logo.dev Logo API.
   */
  protected readonly logoUrl =
    `${environment.logoProviderApiBaseUrl}${environment.institutionDomain}?token=${environment.logoProviderPublishableKey}`;

  /**
   * Array of navigation options for the application's sidenav.
   */
  options = signal([
    {link: '/bookstores/overview', label: 'option.bookstore-overview', icon: 'store'},
    {link: '/inventory/receipts/new', label: 'option.receive-books', icon: 'library_add'}
  ]);
}
