export const getServerData = async () => {
  const response = await fetch('https://dummyjson.com/products/1');
  return await response.json();
};