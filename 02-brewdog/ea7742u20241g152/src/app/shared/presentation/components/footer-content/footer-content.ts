import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Displays BrewDog institutional information, copyright and distribution network status.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-footer-content',
  imports: [MatIconModule, TranslatePipe],
  templateUrl: './footer-content.html',
  styleUrl: './footer-content.css'
})
export class FooterContent {

}
