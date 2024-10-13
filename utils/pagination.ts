export const getPaginatedData = (
  currentPage: number,
  items_per_page: number,
  data: any
) => {
  const startIndex = (currentPage - 1) * items_per_page;
  const endIndex = startIndex + items_per_page;
  console.log("hhhhhhhhhhhhhhhhhhhh",data);
  
  return data.slice(startIndex, endIndex);
};
