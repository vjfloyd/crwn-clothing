import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
import Category from "../../routes/category/category.component";

import "./shop.styles.scss";
import {useEffect} from "react";
import {getCategoriesAndCollections} from "../../utils/firebase/firebase.utils";
import {useDispatch} from "react-redux";
import {setCategories} from "../../store/categories/category.reducer";

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesArray = async () => {
            const categoryArray = await getCategoriesAndCollections();
            console.log('cat=>',categoryArray);
            dispatch(setCategories(categoryArray));
        };

        getCategoriesArray();
    }, []);

    return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
