import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';
import {Specialty} from '../../shared/domain/model/specialty';

/**
 * Resource representation of a bookstore exchanged with the platform API.
 *
 * @author Alexis Calin Torres Huaman
 */
export interface BookstoreResource extends BaseResource {
  /** Unique identifier of the bookstore. */
  id: number;
  /** Display name of the bookstore. */
  name: string;
  /** Specialty of the books sold by the bookstore. */
  specialty: Specialty;
  /** Minimum copies each book should have. */
  minimumCopies: number;
}

/**
 * Response envelope for bookstore collection queries.
 */
export interface BookstoresResponse extends BaseResponse {
  /** Bookstore resources included in the response. */
  bookstores: BookstoreResource[];
}
