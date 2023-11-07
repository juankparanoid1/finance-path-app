const useDocRefFromArray = (array, query) => {
  const foundItem = array.find(item => item.id === query);
  return foundItem ? foundItem.idDoc : null;
};

export default useDocRefFromArray;
