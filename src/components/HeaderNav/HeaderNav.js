import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-cart.svg';
import { ReactComponent as AddPerson } from '../../assets/add-person.svg';
import { ReactComponent as RemovePerson } from '../../assets/remove-person.svg';
import { ReactComponent as MenuClose } from '../../assets/menu-close.svg';
import Logo from '../Logo/Logo.js';
import css from './HeaderNav.module.css';
import useFocusTrap from '../../hooks/useFocusTrap';
import useAppearanceTransition from '../../hooks/useAppearanceTransition';
import { useAuthContext } from '../../utils/AuthContext';
import { useCartContext } from '../../utils/CartContext';
import Dialog from '../Dialog/Dialog';

const phases = [
  css['nav'],
  css['nav--available'],
  css['nav--visible']
];

function HeaderNav({ shouldBeVisible, close, shouldTrap }) {
  const { isLoggedIn, logout } = useAuthContext();
  const { cartProductsData } = useCartContext();
  const [navClasses, setNavClasses] = useState(phases[0]);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const firstFocusableRef = useRef();
  const defaultFocusableRef = useRef();
  const lastFocusableRef = useRef();

  useFocusTrap(close, shouldTrap, firstFocusableRef.current, lastFocusableRef.current, defaultFocusableRef.current, 60);
  useAppearanceTransition(shouldBeVisible, setNavClasses, phases, 300);
  
  return (
    <>
      <Dialog
        isShown={showLogoutDialog}
        heading="Are you sure?"
        message="Do you really want to log out?"
        onConfirm={() => { setShowLogoutDialog(false); logout(); }}
        onReject={() => setShowLogoutDialog(false)}
      />

      <nav id="header-nav" className={navClasses}>

        <div className={css['nav-top']}>
          <Logo 
            width={175}
            ref={firstFocusableRef}
          />
          <button 
            className="icon-button icon-button--color-1"
            onClick={close}
            ref={defaultFocusableRef}
            aria-label="Close nav."
          >
            <MenuClose aria-hidden="true"/>
          </button>
        </div>

        <ul className={css["pages-list"]}>
          <li><NavLink exact to="/" className={css["pages-link"]} activeClassName={css["pages-link--active"]}>Home</NavLink></li>
          <li><NavLink to="/about" className={css["pages-link"]} activeClassName={css["pages-link--active"]}>About</NavLink></li>
          <li><NavLink exact to="/products" className={css["pages-link"]} activeClassName={css["pages-link--active"]}>Products</NavLink></li>
          {
            isLoggedIn &&
              <li><NavLink to="/checkout" className={css["pages-link"]} activeClassName={css["pages-link--active"]}>Checkout</NavLink></li>
          }
        </ul>

        <ul className={css["profile-list"]}>
          <li>
            <NavLink 
              to="/cart"
              className={css["profile-link"]}
              activeClassName={css["profile-link--active"]}
            >
              Cart 
              <ShoppingCart aria-hidden="true"/>
              {
                cartProductsData.length ? 
                  <span aria-description="Products in cart." className={css['cart-count']}>{cartProductsData.length}</span> 
                : 
                  null
              }
            </NavLink>
          </li>
          <li>
            {
              isLoggedIn ?
                <button 
                  className={css["profile-link"]} ref={lastFocusableRef}
                  onClick={() => setShowLogoutDialog(prev => !prev)}
                >
                  Logout <RemovePerson aria-hidden="true"/>
                </button>
              :
                <NavLink 
                  to="/login"
                  className={css["profile-link"]} 
                  activeClassName={css["profile-link--active"]} 
                  ref={lastFocusableRef}
                >
                  Login <AddPerson aria-hidden="true"/>
                </NavLink>
            }
          </li>
        </ul>
        
      </nav>
    </>
  );
}

HeaderNav.propTypes = {
  shouldBeVisible: PropTypes.bool.isRequired,
  shouldTrap: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default HeaderNav;