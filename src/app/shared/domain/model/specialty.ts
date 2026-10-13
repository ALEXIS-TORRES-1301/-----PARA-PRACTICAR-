/**
 * Literary specialty shared by bookstores and the external book catalog.
 *
 * @remarks
 * Values match the Open Library subject identifiers used to query books.
 *
 * @author Alexis Torres
 */
export type Specialty = 'fantasy' | 'science_fiction' | 'history' | 'mystery' | 'romance' | 'science';

/**
 * Every supported specialty, in display order.
 */
export const SPECIALTIES: readonly Specialty[] = [
  'fantasy', 'science_fiction', 'history', 'mystery', 'romance', 'science'
];

/**
 * Builds the kebab-case translation key for a specialty.
 *
 * @param specialty - Specialty to translate.
 * @returns Translation key such as `specialties.science-fiction`.
 */
export const specialtyTranslationKey = (specialty: Specialty): string =>
  `specialties.${specialty.replaceAll('_', '-')}`;
