import { Routes, Route } from "react-router-dom";
// import CategoriesPreview from "../../routes/category-preview/category-preview.component";
import Category from "../../routes/category/category.component";

import "./shop.styles.scss";
import {useEffect} from "react";
import {fetchCategoriesAsync} from "../../store/categories/category.action";
import {useDispatch} from "react-redux";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, []);

    return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
