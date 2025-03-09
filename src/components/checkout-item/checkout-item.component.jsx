import "./checkout-item.styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, removeItem, subsItemToCart} from "../../store/carts/cart.action";
import {selectCartItems} from "../../store/carts/cart.selector";

const CheckoutItem = ({ item }) => {
  const { name, price, quantity, imageUrl } = item;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addItemHandler = () => dispatch(addItemToCart(cartItems,item));
  const subsItemHandler = () => dispatch(subsItemToCart(cartItems,item));
  const removeItemHandler = () => dispatch(removeItem(cartItems,item));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => subsItemHandler(item)}>
          &#10094;
        </div>
        <span className="value"> {quantity} </span>
        <div className="arrow" onClick={() => addItemHandler(item)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => removeItemHandler(item)}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
