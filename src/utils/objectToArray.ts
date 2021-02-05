export const objectToArray = <T>(object: Record<string, T>): T[] => {
  if (!object) {
    return [];
  }

  return Object.keys(object).map((key) => ({
    ...object[key],
  }));
};
