import "./product-card.styles.scss";

import Button from "../button/button.component";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../../store/carts/cart.reducer";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch();
  const addItemHandler = () => dispatch(addItemToCart(product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt="" />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button onClick={addItemHandler} buttonType="inverted">
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
