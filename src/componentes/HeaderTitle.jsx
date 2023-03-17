import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function HeaderTitle() {
  const { pathname } = useLocation();
  const [title, setTitle] = useState('');

  const getTitle = useCallback(() => {
    if (pathname === '/meals') {
      setTitle('Meals');
    }
    if (pathname === '/drinks') {
      setTitle('Drinks');
    }
    if (pathname === '/profile') {
      setTitle('Profile');
    }
    if (pathname === '/favorite-recipes') {
      setTitle('Favorite Recipes');
    }
    if (pathname === '/done-recipes') {
      setTitle('Done Recipes');
    }
  }, [pathname]);

  useEffect(() => {
    getTitle();
  }, [getTitle]);

  return (
    <h1
      className="text-3xl font-bold text-violet-900 my-4"
      data-testid="page-title"
    >
      { title }
    </h1>
  );
}

export default HeaderTitle;
