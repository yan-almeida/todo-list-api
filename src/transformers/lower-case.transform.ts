import { TransformFnParams } from 'class-transformer';

export const LowerCaseTransform = (property: TransformFnParams) => {
  return String(property.value).toLocaleLowerCase();
};
