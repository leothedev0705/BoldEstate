import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (property) => {
    setFavorites(prev => [...prev, property]);
  };

  const removeFromFavorites = (propertyId) => {
    setFavorites(prev => prev.filter(property => property.id !== propertyId));
  };

  const isFavorite = (propertyId) => {
    return favorites.some(property => property.id === propertyId);
  };

  const toggleFavorite = (property) => {
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}; 