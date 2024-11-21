import { DocumentNode, OperationDefinitionNode } from 'graphql';

export interface IQuerySpecifications {
  name: string;
  type: 'query' | 'mutation' | 'subscription';
}
export const getQuerySpecifications = (query: string | DocumentNode) => {
  if (typeof query === 'string') {
    const match = query.match(/(query|mutation|subscription)\s+([^\s({]+)/);
    const type: any = match?.[1];
    const name: any = match?.[2];
    return { type, name };
  }

  const queryDefinition: any =
    query?.kind === 'Document' &&
    query?.definitions?.find?.(
      (definition): definition is OperationDefinitionNode =>
        definition?.kind === 'OperationDefinition'
    );
  const type: any = queryDefinition?.operation;
  const name: any = queryDefinition?.name?.value;
  return { type, name };
};
