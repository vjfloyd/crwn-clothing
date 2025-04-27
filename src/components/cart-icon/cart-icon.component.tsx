import { ReactComponent as ShoppingIcon } from "./../../assets/shopping-bag.svg";
import "./cart-icon.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectCartIsOpen} from "../../store/carts/cart.selector";
import {setCartOpen} from "../../store/carts/cart.action";
import {CartIconContainer, ItemCount} from "./cart-icon.styles";

const CartIcon = () => {

  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectCartIsOpen);
  const cartCount = useSelector(selectCartCount);

  const onClickCartToogle = () =>
        dispatch(setCartOpen(!isCartOpen));


  return (
    <CartIconContainer  onClick={onClickCartToogle}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount> {cartCount} </ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
