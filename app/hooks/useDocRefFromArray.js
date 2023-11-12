export const useDocRefFromArray = (array, query) => {
  const foundItem = array.find(item => item.id === query);
  return foundItem ? foundItem.idDoc : null;
};

export const useDocRefFromArrayName = (array, query) => {
  const foundItem = array.find(item => item.name === query);
  return foundItem ? foundItem.idDoc : null;
};
