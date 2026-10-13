import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Bookstore} from '../domain/model/bookstore.entity';
import {BookstoreResource, BookstoresResponse} from './bookstores-response';

/**
 * Maps bookstore entities to and from API resources.
 *
 * @author Alexis Calin Torres Huaman
 */
export class BookstoreAssembler implements BaseAssembler<Bookstore, BookstoreResource, BookstoresResponse> {
  /**
   * Converts a response envelope into bookstore entities.
   * @param response - The API response containing bookstores.
   * @returns An array of Bookstore entities.
   */
  toEntitiesFromResponse = (response: BookstoresResponse): Bookstore[] =>
    response.bookstores.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a BookstoreResource to a Bookstore entity.
   * @param resource - The resource to convert.
   * @returns The converted Bookstore entity.
   */
  toEntityFromResource = (resource: BookstoreResource): Bookstore =>
    new Bookstore({
      id: resource.id,
      name: resource.name,
      specialty: resource.specialty,
      minimumCopies: resource.minimumCopies
    });

  /**
   * Converts a Bookstore entity to a BookstoreResource.
   * @param entity - The entity to convert.
   * @returns The converted BookstoreResource.
   */
  toResourceFromEntity = (entity: Bookstore): BookstoreResource => ({
    id: entity.id,
    name: entity.name,
    specialty: entity.specialty,
    minimumCopies: entity.minimumCopies
  });
}
