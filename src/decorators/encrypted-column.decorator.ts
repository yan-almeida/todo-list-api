import { TypeOrmColumnParser } from 'src/common/parsers/typeorm-column.parser';
import { Column, ColumnOptions } from 'typeorm';

/**
 * Typeorm wrapper to encrypt column data in database and decrypt in application.
 * If data exists in database, don't forget to migrate column values to encrypted values, otherwise a Invalid IV length will be thrown.
 * @param options - Typeorm Column options - https://github.com/typeorm/typeorm/blob/master/docs/entities.md#column-options
 * @returns
 */
export function EncryptedColumn(options?: ColumnOptions): PropertyDecorator {
  return function (target, propertyKey: string): void {
    Column({
      ...options,
      name: TypeOrmColumnParser.toName(propertyKey, options),
      transformer: TypeOrmColumnParser.toEncryptedTransformer(),
    })(target, propertyKey);
  };
}
