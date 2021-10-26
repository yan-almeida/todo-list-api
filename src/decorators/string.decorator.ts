/**
 *
 * @returns Returns a string representation of a string.
 */
export function String(): PropertyDecorator {
  return (target, propertyKey) => {
    let value = target[propertyKey];

    const getter = () => value;

    const setter = (val: string) => {
      if (val) {
        value = val.toString();
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}
