export const categoriesSelector = (state) =>
  state.categories.categoriesArray.reduce((acc, category) => {
    const { title, items } = category;
    console.log(title, items);
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

// const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
//   const { title, items } = docSnapshot.data();
//   acc[title.toLowerCase()] = items;
//   return acc;
// }, {});
