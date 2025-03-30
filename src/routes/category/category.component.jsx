import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { Fragment } from "react";
import {selectCategoriesMap, selectCategoryLoading} from "../../store/categories/category.selector";

import "./category.styles.scss";
import {useSelector} from "react-redux";
import Spinner from "../../components/spiner/spinner.component";

const Category = () => {
  const { category } = useParams();
  console.log('category yy=', category);
  const categoriesMap  = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);
  const isLoading = useSelector(selectCategoryLoading);
  console.log('render/re-rendering category component');


  useEffect(() => {
    console.log('effect fired calling setProducts');
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title"> {category.toUpperCase()} </h2>
      {
        isLoading ? ( <Spinner/>) :
            (
                <div className="category-container">
                  {products &&
                      products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                      ))}
                </div>
            )
      }

    </Fragment>
  );
};

export default Category;
