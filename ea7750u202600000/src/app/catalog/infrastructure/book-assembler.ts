import {Injectable} from '@angular/core';
import {Book} from '../domain/model/book.entity';
import {SubjectResponse, WorkResource} from './subject-response';

/**
 * Maps Open Library work resources into book entities.
 *
 * @author Alexis Torres
 */
@Injectable({providedIn: 'root'})
export class BookAssembler {
  /**
   * Converts a subject response into book entities.
   * @param response - The Open Library subject response.
   * @returns An array of Book entities.
   */
  toEntitiesFromResponse = (response: SubjectResponse): Book[] =>
    (response.works ?? []).map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a work resource into a Book entity, using the first author name.
   * @param resource - The work resource to convert.
   * @returns The converted Book entity.
   */
  toEntityFromResource = (resource: WorkResource): Book =>
    new Book({
      key: resource.key,
      title: resource.title,
      authorName: resource.authors?.[0]?.name
    });
}
