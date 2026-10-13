import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweryAssembler} from './brewery-assembler';
import {BreweriesResponse} from './breweries-response';

const breweriesApiEndpointUrl = `${environment.breweriesProviderApiBaseUrl}${environment.breweriesProviderBreweriesEndpointPath}`;

/**
 * Encapsulates the Open Brewery DB HTTP operations for breweries.
 *
 * @author Alexis Calin Torres Huaman
 */
export class BreweriesApiEndpoint extends ErrorHandlingEnabledBaseType {
  /**
   * Creates an instance of BreweriesApiEndpoint.
   * @param http - The HttpClient for making HTTP requests.
   * @param assembler - The assembler for converting resources into entities.
   */
  constructor(private http: HttpClient, private assembler: BreweryAssembler) {
    super();
  }

  /**
   * Fetches the breweries of a brewery type.
   * @param breweryType - Brewery type used as `by_type` filter.
   * @returns Stream with the brewery collection.
   */
  getByType = (breweryType: BreweryType): Observable<Brewery[]> =>
    this.http.get<BreweriesResponse>(breweriesApiEndpointUrl, {
      params: {by_type: breweryType, per_page: environment.breweriesProviderPageSize}
    }).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response)),
      catchError(this.handleError('Failed to fetch breweries'))
    );
}
