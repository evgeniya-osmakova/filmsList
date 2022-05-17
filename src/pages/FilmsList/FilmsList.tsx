import React, { useEffect, useState } from 'react';
import { Film } from '@/models/models';
import FilmsListDom from '@/pages/FilmsList/FilmsList.dom';
import useRequest from '@/hooks/useRequest';
import { getPopularFilms, getUpcomingFilms, searchFilms } from '@/api/films';

const FilmsList = () => {
  const { data, loading: isLoading, error: errorInfo } = useRequest(() => getUpcomingFilms(1));

  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(isLoading);
  const [error, setError] = useState(errorInfo);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPopular, setShowPopular] = useState(false);
  const [search, setSearch] = useState("");

  const loadFilms = async (fn: any) => {
    try {
      setLoading(true);
      const filmsList = await fn();
      setFilms(filmsList.results);
      setTotalPages(filmsList.total_pages);
      if (error) {
        setError(null);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const loadUpcomingFilms = (page: number = 1) => {
    loadFilms(() => getUpcomingFilms(page))
  }

  const loadPopularFilms = (page: number = 1) => {
    loadFilms(() => getPopularFilms(page))
  }

  const loadSearchedFilms = (page: number = 1) => {
    loadFilms(() => searchFilms({page: page, query: search}))
  }

  useEffect(() => {
    if (!search) {
      setFilms([]);
      if (totalPages !== 1) {
        setTotalPages(1);
      }
      if (page !== 1) {
        setPage(1);
      }
      if (error) {
        setError(null);
      }
      return;
    }
    loadSearchedFilms(1);
  }, [search])

  useEffect(() => {
    if (films.length === 0 && search) {
      setError("Not found")
    }
    if (films.length === 0 && data && showUpcoming) {
      setFilms(data.results);
      setTotalPages(data.total_pages);
    }
  }, [data, films])

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
  }

  const onNextClick = () => {
    setPage((prevState) => prevState + 1);
    loadNewPage(page + 1);
  }

  const onBackClick = () => {
    setPage((prevState) => prevState - 1);
    loadNewPage(page - 1);
  }

  return <FilmsListDom pagination={{page, setPage, totalPages, onNextClick, onBackClick}}
                       data={{films, loading, error}}
                       upcomingFilms={{loadUpcomingFilms, showUpcoming, setShowUpcoming}}
                       popularFilms={{loadPopularFilms, showPopular, setShowPopular}}
                       searchData={{search, setSearch}}
  />;
};

export default FilmsList;
