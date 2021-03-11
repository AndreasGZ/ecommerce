import React from "react";
import {Link} from "react-router-dom";
import { ReactComponent as Logo} from "../../assets/crown.svg";
import {auth} from "../../firebase/firebase";
import {connect} from "react-redux";
import CartIcon from "../cart-icon/cart-icon";
import { createStructuredSelector} from "reselect";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import {selectCartHidden} from "../../redux/cart/cartSelectors";
import {selectCurrentUser} from "../../redux/user/userSelectors";
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from "./header.styled";
import {signOutStart} from "../../redux/user/userActions";

const Header = ({currentUser, hidden, signOutStart}) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">
        SHOP
      </OptionLink>
      <OptionLink to="/shop">
        CONTACT
      </OptionLink>
      {
        currentUser ?
        <OptionLink as="div" onClick={signOutStart}>
          SIGN OUT
        </OptionLink> :
        <OptionLink to="/signin">
          SIGN IN
        </OptionLink>
      }
      <CartIcon />
    </OptionsContainer>
    {hidden ? null :
    <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
