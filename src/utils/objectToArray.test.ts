import { objectToArray } from './objectToArray';

describe('objectToArray', () => {
  it('works', () => {
    const object1 = {
      foo: 'bar',
    };
    const object2 = {
      baz: 'bus',
    };
    const object = {
      1: object1,
      2: object2,
    };
    const result = objectToArray(object);
    const expected = [object1, object2];
    expect(result).toEqual(expected);
  });
});
