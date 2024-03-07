// LikedCocktailsContext.js

import React, { createContext, useState, useContext } from 'react';

const LikedCocktailsContext = createContext();

export const LikedCocktailsProvider = ({ children }) => {
  const [likedCocktails, setLikedCocktails] = useState(new Set());

  const toggleLike = (idDrink) => {
    setLikedCocktails((current) => {
      const modified = new Set(current);
      if (modified.has(idDrink)) {
        modified.delete(idDrink);
      } else {
        modified.add(idDrink);
      }
      return modified;
    });
  };

  return (
    <LikedCocktailsContext.Provider value={{ likedCocktails, toggleLike }}>
      {children}
    </LikedCocktailsContext.Provider>
  );
};

export const useLikedCocktails = () => useContext(LikedCocktailsContext);
