/**
 * Author resource included in a book resource from the catalog provider.
 *
 * @author Alexis Calin Torres Huaman
 */
export interface AuthorResource {
  /**
   * Full name of the author.
   */
  name: string;
}

/**
 * Resource representation of a book (Open Library work).
 */
export interface BookResource {
  /**
   * Work key, for example `/works/OL27448W`.
   */
  key: string;

  /**
   * Title of the work.
   */
  title: string;

  /**
   * Authors of the work; may be missing or empty.
   */
  authors?: AuthorResource[];
}

/**
 * Response envelope returned by the subjects endpoint (`/subjects/{specialty}.json`).
 */
export interface BooksResponse {
  /**
   * The books (works) returned by the API.
   */
  works: BookResource[];
}
