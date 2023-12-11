
function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getServerData = async () => {
  const response = await fetch('https://dummyjson.com/products/1');
  await wait(3000);
  return await response.json();
};