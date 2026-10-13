import {Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {LogoDevApi} from '../../../infrastructure/logo-dev-api';
import {environment} from '../../../../../environments/environment';

/**
 * Application shell with toolbar, sidenav navigation and routed content.
 *
 * @author Alexis Torres
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule,
    TranslatePipe, LanguageSwitcher
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  private readonly logoDevApi = inject(LogoDevApi);
  private readonly breakpointObserver = inject(BreakpointObserver);

  /** URL of the institutional logo provided by Logo.dev. */
  protected readonly logoUrl = this.logoDevApi.getUrlToLogo(environment.institutionDomain);

  /** True on handset screens, where the sidenav overlays the content. */
  protected readonly isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches)),
    {initialValue: false});

  /** Sidenav mode adapted to the screen size. */
  protected readonly sidenavMode = computed(() => this.isHandset() ? 'over' : 'side');

  /** Navigation options shown in the sidenav. */
  protected readonly options = [
    {link: '/bookstores/overview', label: 'option.bookstore-overview', icon: 'store'},
    {link: '/inventory/receipts/new', label: 'option.receive-books', icon: 'library_add'}
  ];
}
