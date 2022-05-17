import React, { useEffect, useRef, useState } from 'react';
import BookmarksDom from '@/pages/Bookmarks/Bookmarks.dom';
import { useBookmarks } from '@/BookmarksContext';
import { getFilmDetails } from '@/api/films';
import { FilmDetails } from '@/models/models';

const Bookmarks = () => {
  const {bookmarks} = useBookmarks();

  const [films, setFilms] = useState<FilmDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calledOnce = useRef(false);

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }
    calledOnce.current = true;

    const getFilms = () => {
      Promise.all(
        bookmarks.map((id) => getFilmDetails(id))
      )
        .then((filmsData) => setFilms(filmsData))
        .catch((err) => setError(err))
        .finally(() => {
          if (films.length === 0) {
            setLoading(false);
          }
        })
    }

    if (films.length === 0) {
      setLoading(true);
    }

    getFilms();
  }, [])

  return (
    <BookmarksDom loading={loading} error={error} films={films} setFilms={setFilms}/>
  );
};

export default Bookmarks;
