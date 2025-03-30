import { Routes, Route } from "react-router-dom";
import Category from "../../routes/category/category.component";

import "./shop.styles.scss";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchCategoriesStart} from "../../store/categories/category.action";


const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Dispatching fetchCategoriesStart');
        dispatch(fetchCategoriesStart());
    }, [dispatch]);

    return (
    <Routes>
      <Route index element={<Category />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
