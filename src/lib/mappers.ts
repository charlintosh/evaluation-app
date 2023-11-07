export const withId = <T extends { _id: string }, R extends { id: string }>(
  item: T,
): R => ({
  ...item,
  _id: undefined,
  id: item._id,
});
