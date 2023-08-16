import { ReactComponent as ShoppingIcon } from "./../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const onClickCartToogle = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={onClickCartToogle}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count"> {cartCount} </span>
    </div>
  );
};

export default CartIcon;
