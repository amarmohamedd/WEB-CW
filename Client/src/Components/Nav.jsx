import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const location = useLocation();
  const hideOnRoutes = ['/auth/login', '/auth/register'];

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <StyledNav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          CookedN2
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-lg-0">
            <NavItem to="/Recipe/create-Recipe">Create Recipe</NavItem>
            <NavItem to="/RecipeList">Saved Recipe</NavItem>
            <NavItem to="/Mainscreen">Recipes</NavItem>
          </ul>
          <div>
            {isLoggedIn ? (
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            ) : (
              <Link to="/auth/login" className="btn btn-outline-light me-2">
                logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </StyledNav>
  );
}

const NavItem = ({ to, children }) => {
  const location = useLocation();

  return (
    <li className={`nav-item ${location.pathname === to ? 'active' : ''}`}>
      <Link className="nav-link" to={to}>
        {children}
      </Link>
    </li>
  );
};

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

const StyledNav = styled.nav`
  background-color: black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

export default Nav;
