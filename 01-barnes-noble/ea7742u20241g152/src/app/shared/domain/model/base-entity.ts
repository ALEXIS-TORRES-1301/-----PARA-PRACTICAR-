/**
 * Minimal contract implemented by domain entities across bounded contexts.
 *
 * @author Alexis Calin Torres Huaman
 */
export interface BaseEntity {
  /**
   * Unique identifier for the entity.
   */
  id: number;
}
