import React, { createContext, useContext, useState } from 'react';

type BookmarksContextType ={
  bookmarks: number[],
  setBookmarks:  React.Dispatch<React.SetStateAction<number[]>>,
};

export const BookmarksReactContext = createContext<BookmarksContextType>({} as BookmarksContextType);

export const BookmarksContext: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  return (
    <BookmarksReactContext.Provider value={{ bookmarks, setBookmarks }}>
      {children}
    </BookmarksReactContext.Provider>
  );
};

export function useBookmarks() {
  return useContext(BookmarksReactContext);
}
