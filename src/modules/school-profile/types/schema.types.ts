export type SchemaTranslator = (
  key: string,
  values?: Record<string, string | number>,
) => string;
