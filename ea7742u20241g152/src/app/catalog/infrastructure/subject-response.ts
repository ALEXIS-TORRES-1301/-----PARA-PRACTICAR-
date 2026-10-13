/**
 * Author resource included in an Open Library work.
 *
 * @author Alexis Calin Torres Huaman
 */
export interface AuthorResource {
  /** Full name of the author. */
  name: string;
}

/**
 * Work resource (book) returned by the Open Library subjects endpoint.
 */
export interface WorkResource {
  /** Work key, for example `/works/OL27448W`. */
  key: string;
  /** Title of the work. */
  title: string;
  /** Authors of the work; may be missing or empty. */
  authors?: AuthorResource[];
  /** Year of the first publication. */
  first_publish_year?: number;
  /** Identifier of the cover image. */
  cover_id?: number;
}

/**
 * Response envelope returned by `/subjects/{specialty}.json`.
 */
export interface SubjectResponse {
  /** Subject key, for example `/subjects/fantasy`. */
  key: string;
  /** Subject display name. */
  name: string;
  /** Total number of works in the subject. */
  work_count: number;
  /** Works included in the response. */
  works: WorkResource[];
}
