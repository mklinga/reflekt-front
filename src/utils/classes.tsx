type ClassNames = string | Array<string | undefined>;

const truthy = (x: string | undefined | null): boolean => !!x;

export default function classes(classNames: ClassNames) {
  if (typeof classNames === 'string') {
    return classNames;
  }

  if (Array.isArray(classNames)) {
    return classNames.filter(truthy).join(' ');
  }

  throw new Error('Invalid input for classNames');
}
