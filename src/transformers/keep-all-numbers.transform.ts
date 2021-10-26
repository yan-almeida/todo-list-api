import { TransformFnParams } from 'class-transformer';

export const KeepAllNumbersTransform = (property: TransformFnParams) => {
  return property.value.replace(/\D+/g, '');
};
