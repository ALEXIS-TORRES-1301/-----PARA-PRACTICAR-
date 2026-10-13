import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseEntity} from '../domain/model/base-entity';
import {BaseResource, BaseResponse} from './base-response';
import {BaseAssembler} from './base-assembler';

/**
 * Provides generic CRUD operations for a single REST endpoint.
 *
 * @typeParam TEntity - Domain entity handled by the endpoint.
 * @typeParam TResource - Resource representation exchanged with the API.
 * @typeParam TResponse - Response envelope returned for collection queries.
 * @typeParam TAssembler - Mapper that translates between entities and resources.
 * @author Alexis Torres
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>
> {
  protected constructor(
    protected http: HttpClient,
    protected endpointUrl: string,
    protected assembler: TAssembler
  ) {}

  /**
   * Fetches all entities from the configured endpoint.
   * @returns Stream with the mapped entity collection.
   */
  getAll(): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl).pipe(
      map(response => Array.isArray(response)
        ? response.map(resource => this.assembler.toEntityFromResource(resource))
        : this.assembler.toEntitiesFromResponse(response as TResponse)),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  /**
   * Creates a new entity in the remote endpoint.
   *
   * @remarks
   * The identifier is omitted so the backend generates it.
   *
   * @param entity - Entity to persist.
   * @returns Stream with the created entity returned by the API.
   */
  create(entity: TEntity): Observable<TEntity> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id, ...resource} = this.assembler.toResourceFromEntity(entity);
    return this.http.post<TResource>(this.endpointUrl, resource).pipe(
      map(created => this.assembler.toEntityFromResource(created)),
      catchError(this.handleError('Failed to create entity'))
    );
  }

  /**
   * Builds a reusable HTTP error handler for endpoint operations.
   * @param operation - Name of the operation to include in the error context.
   * @returns Function that maps an HTTP error into a failed observable.
   */
  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let errorMessage: string;
      if (error.status === 404) {
        errorMessage = `${operation}: Resource not found`;
      } else if (error.error instanceof ErrorEvent) {
        errorMessage = `${operation}: ${error.error.message}`;
      } else {
        errorMessage = `${operation}: ${error.statusText || 'Unexpected error'}`;
      }
      return throwError(() => new Error(errorMessage));
    };
  }
}
