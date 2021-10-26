import { TransformFnParams } from 'class-transformer';

export const ParseNumberTransform = (property: TransformFnParams) => {
  return Number(property.value);
};
