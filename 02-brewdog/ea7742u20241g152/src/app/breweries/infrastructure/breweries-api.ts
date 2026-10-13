import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweriesApiEndpoint} from './breweries-api-endpoint';
import {BreweryAssembler} from './brewery-assembler';

/**
 * Infrastructure facade for breweries endpoint operations.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class BreweriesApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly breweriesEndpoint = new BreweriesApiEndpoint(this.http, new BreweryAssembler());

  /**
   * Retrieves the breweries of a brewery type.
   * @param breweryType - Brewery type to query.
   * @returns Stream with the brewery collection.
   */
  getBreweriesByType = (breweryType: BreweryType): Observable<Brewery[]> =>
    this.breweriesEndpoint.getByType(breweryType);
}
