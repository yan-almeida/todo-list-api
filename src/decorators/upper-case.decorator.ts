/**
 *
 * @returns Converts all the alphabetic characters in a string to uppercase.
 */
export function UpperCase(): PropertyDecorator {
  return (target, propertyKey) => {
    let value = target[propertyKey];

    const getter = () => value;

    const setter = (val: string) => {
      if (val) {
        value = val.toUpperCase();
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}
