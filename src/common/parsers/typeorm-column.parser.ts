import { ColumnOptions, ValueTransformer } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

export class TypeOrmColumnParser {
  static toTransformer(
    options?: ColumnOptions,
  ): ValueTransformer | ValueTransformer[] {
    if (options && options.transformer) {
      return options.transformer;
    }

    return {
      to: (value: string) => {
        if (value && typeof value === 'string') {
          return value.trim();
        }

        return value;
      },
      from: (value: string) => value,
    };
  }

  static toEncryptedTransformer() {
    return new EncryptionTransformer({
      key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: 'ff5ac19190424b1d88f9419ef949ae56',
    });
  }

  static toName(propertyKey: string, options?: ColumnOptions) {
    if (options && options.name) {
      return options.name;
    }

    return this.camelToSnakeCase(propertyKey);
  }

  private static camelToSnakeCase(value: string) {
    const toSnakeCase = value.replace(/[A-Z]/g, (x) => `_${x.toLowerCase()}`);

    return toSnakeCase;
  }
}
