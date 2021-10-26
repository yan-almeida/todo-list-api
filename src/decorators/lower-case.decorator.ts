/**
 *
 * @returns Converts all the alphabetic characters in a string to lowercase.
 */
export function LowerCase(): PropertyDecorator {
  return (target, propertyKey) => {
    let value = target[propertyKey];

    const getter = () => value;

    const setter = (val: string) => {
      if (val) {
        value = val.toLowerCase();
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}
