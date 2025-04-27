import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { Fragment } from "react";
import {selectCategoriesMap, selectCategoryLoading} from "../../store/categories/category.selector";

import "./category.styles";
import {useSelector} from "react-redux";
import Spinner from "../../components/spiner/spinner.component";
import {CategoryContainer, CategoryTitle} from './category.styles';


type CategoryRouteParams = {
    category: string;
};


const Category = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  console.log('category yy=', category);
  const categoriesMap  = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  const isLoading = useSelector(selectCategoryLoading);
  console.log('render/re-rendering category component');


  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle> {category.toUpperCase()} </CategoryTitle>
      {
        isLoading ? ( <Spinner/>) :
            (
                <CategoryContainer>
                  {products &&
                      products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                      ))}
                </CategoryContainer>
            )
      }

    </Fragment>
  );
};

export default Category;
