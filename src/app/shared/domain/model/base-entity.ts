/**
 * Minimal contract implemented by domain entities across bounded contexts.
 *
 * @author Alexis Torres
 */
export interface BaseEntity {
  /**
   * Unique identifier for the entity.
   */
  id: number;
}
