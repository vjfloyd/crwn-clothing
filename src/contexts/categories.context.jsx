import { createContext, useEffect, useState } from "react";

import SHOP_DATA from "../shop-data.js";
import {
  addCollectionsAndDocuments,
  getCategoriesAndCollections,
} from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: [],
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  // useEffect(() => {
  //   addCollectionsAndDocuments("categories", SHOP_DATA);
  // });

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndCollections();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
