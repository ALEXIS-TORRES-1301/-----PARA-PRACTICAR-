import {Book} from '../domain/model/book.entity';
import {BookResource, BooksResponse} from './books-response';

/**
 * Maps catalog book resources into book entities.
 *
 * @author Alexis Calin Torres Huaman
 */
export class BookAssembler {
  /**
   * Converts a BooksResponse to an array of Book entities.
   * @param response - The API response containing books.
   * @returns An array of Book entities.
   */
  toEntitiesFromResponse = (response: BooksResponse): Book[] =>
    (response.works ?? []).map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a BookResource to a Book entity, using the name of the first author.
   * @param resource - The resource to convert.
   * @returns The converted Book entity.
   */
  toEntityFromResource = (resource: BookResource): Book =>
    new Book({
      key: resource.key,
      title: resource.title,
      authorName: resource.authors?.[0]?.name
    });
}
