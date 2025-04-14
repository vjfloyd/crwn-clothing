import "./checkout-item.styles.scss";
import {useDispatch} from "react-redux";
import {addItemToCart, removeItem, subsItemToCart} from "../../store/carts/cart.reducer";

const CheckoutItem = ({ item }) => {
  const { name, price, quantity, imageUrl } = item;

  const dispatch = useDispatch();

  const addItemHandler = () => dispatch(addItemToCart(item));
  const subsItemHandler = () => dispatch(subsItemToCart(item));
  const removeItemHandler = () => dispatch(removeItem(item));

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
