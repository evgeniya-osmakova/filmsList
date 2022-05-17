/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useEffect, useState } from 'react';
import { Film } from '@/models/models';
import FilmsListDom from '@/pages/FilmsList/FilmsList.dom';
import useRequest from '@/hooks/useRequest';
import { getPopularFilms, getUpcomingFilms, searchFilms } from '@/api/films';

const FilmsList = () => {
  const { data, loading: isLoading, error: errorInfo, refetch } = useRequest(() => getUpcomingFilms(1));

  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPopular, setShowPopular] = useState(false);
  const [search, setSearch] = useState("");

  const loadFilms = useCallback(async (fn: any) => {
    try {
      setLoading(true);
      const filmsList = await fn();
      setFilms(filmsList.results);
      setTotalPages(filmsList.total_pages);
      setError(null);
    } catch (err: any) {
      setError((typeof err === 'string') ? err : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadUpcomingFilms = (page = 1) => {
    loadFilms(() => getUpcomingFilms(page));
  };

  const loadPopularFilms = (page = 1) => {
    loadFilms(() => getPopularFilms(page));
  };

  const loadSearchedFilms = useCallback((page = 1) => {
    loadFilms(() => searchFilms({page: page, query: search}));
  }, [loadFilms, search]);

  useEffect(() => {
    if (!search) {
      setFilms([]);
      setPage(1);
      setTotalPages(1);
      setError(null);
      return;
    }
    loadSearchedFilms(1);
  }, [search, loadSearchedFilms]);

  useEffect(() => {
    if (films.length === 0 && search) {
      setError("Not found");
      return;
    }
    if (films.length === 0 && data && showUpcoming) {
      setFilms(data.results);
      setTotalPages(data.total_pages);
      return;
    }
  }, [data, films, search, showUpcoming]);

  useEffect(() => {
    if (errorInfo) {
      setError("Failed to load data");
    }
  }, [errorInfo]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const loadNewPage = (page: number) => {
    if (showUpcoming) {
      loadUpcomingFilms(page);
      return;
    }
    if (showPopular) {
      loadPopularFilms(page);
      return;
    }
    loadSearchedFilms(page);
  };

  const onNextClick = () => {
    setPage((prevState) => prevState + 1);
    loadNewPage(page + 1);
  };

  const onBackClick = () => {
    setPage((prevState) => prevState - 1);
    loadNewPage(page - 1);
  };

  return <FilmsListDom pagination={{page, setPage, totalPages, onNextClick, onBackClick}}
                       data={{films, loading, error, refetch}}
                       upcomingFilms={{loadUpcomingFilms, showUpcoming, setShowUpcoming}}
                       popularFilms={{loadPopularFilms, showPopular, setShowPopular}}
                       searchData={{search, setSearch}}
  />;
};

export default FilmsList;
