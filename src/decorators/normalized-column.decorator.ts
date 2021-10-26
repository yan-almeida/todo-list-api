import { Column, ColumnOptions } from 'typeorm';
import { TypeOrmColumnParser } from '../common/parsers/typeorm-column.parser';

/**
 * Typeorm wrapper transforms property name from 'camelCase' in the app and to 'snake_case' in the database - and sanitizes the value, by default, removing white space.
 * @param options - Typeorm Column options - https://github.com/typeorm/typeorm/blob/master/docs/entities.md#column-options
 * @returns
 */
export function NormalizedColumn(options?: ColumnOptions): PropertyDecorator {
  return function (target, propertyKey: string): void {
    Column({
      ...options,
      transformer: TypeOrmColumnParser.toTransformer(propertyKey),
      name: TypeOrmColumnParser.toName(propertyKey, options),
    })(target, propertyKey);
  };
}
