import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "./../../assets/crown.svg";

import CartIcon from "./../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {
  NavLink,
  NavLiks,
  NavigationContainer,
  LogoContainer,
} from "./navigation.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectCartIsOpen} from "../../store/carts/cart.selector";
import {signOutStart} from "../../store/user/user.action";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectCartIsOpen);

  console.log("navigation", currentUser);

  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLiks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN-IN</NavLink>
          )}
          <CartIcon />
          {isCartOpen && <CartDropdown />}
        </NavLiks>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
