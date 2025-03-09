import "./product-card.styles.scss";

import Button from "../button/button.component";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../store/carts/cart.action";
import {selectCartItems} from "../../store/carts/cart.selector";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addItemHandler = () => dispatch(addItemToCart(cartItems,product));

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
