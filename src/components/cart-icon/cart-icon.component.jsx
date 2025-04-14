import { ReactComponent as ShoppingIcon } from "./../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectCartIsOpen} from "../../store/carts/cart.selector";
import {setCartOpen} from "../../store/carts/cart.reducer";


const CartIcon = () => {

  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectCartIsOpen);
  const cartCount = useSelector(selectCartCount);

  const onClickCartToggle = () =>
        dispatch(setCartOpen(!isCartOpen));


  return (
    <div className="cart-icon-container" onClick={onClickCartToggle}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count"> {cartCount} </span>
    </div>
  );
};

export default CartIcon;
