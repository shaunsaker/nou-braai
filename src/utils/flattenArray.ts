export const flattenArray = (array: any[]): any[] => {
  const flattened: any[] = [];

  array.forEach((item) => {
    if (Array.isArray(item)) {
      flattened.push(...item);
    } else {
      flattened.push(item);
    }
  });

  return flattened;
};
