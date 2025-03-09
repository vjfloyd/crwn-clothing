import { ReactComponent as ShoppingIcon } from "./../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectCartIsOpen} from "../../store/carts/cart.selector";
import {setCartOpen} from "../../store/carts/cart.action";

const CartIcon = () => {

  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectCartIsOpen);
  const cartCount = useSelector(selectCartCount);

  const onClickCartToogle = () =>
        dispatch(setCartOpen(!isCartOpen));


  return (
    <div className="cart-icon-container" onClick={onClickCartToogle}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count"> {cartCount} </span>
    </div>
  );
};

export default CartIcon;
