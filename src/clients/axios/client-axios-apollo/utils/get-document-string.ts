import { DocumentNode } from 'graphql';
import { print } from 'graphql/language/printer';

export const getDocumentString = (query: DocumentNode): string => {
  return (
    print(query)
      /** Removes graphql comments */
      .replace(/#.+\n/g, '')
      /** Removes new line symbols */
      .replace(/\n/g, ' ')
      /** Removes sequential spaces */
      .replace(/\s\s+/g, ' ')
      .trim()
  );
};
