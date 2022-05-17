import React, { useEffect, useState } from 'react';
import { Film } from '@/models/models';
import FilmsListDom from '@/pages/FilmsList/FilmsList.dom';
import useRequest from '@/hooks/useRequest';
import { getPopularFilms, getUpcomingFilms } from '@/api/films';

const FilmsList = () => {
  const { data, loading: isLoading, error: errorInfo } = useRequest(() => getUpcomingFilms(1));

  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(isLoading);
  const [error, setError] = useState(errorInfo);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPopular, setShowPopular] = useState(false);

  useEffect(() => {
    if (films.length === 0 && data) {
      setFilms(data.results);
      setTotalPages(data.total_pages);
    }
  }, [data, films])

  const loadUpcomingFilms = async (page: number = 1) => {
    try {
      setLoading(true);
      const filmsList = await getUpcomingFilms(page);
      setFilms(filmsList.results);
      setTotalPages(filmsList.total_pages);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const loadPopularFilms = async (page: number = 1) => {
    try {
      setLoading(true);
      const filmsList = await getPopularFilms(page);
      setFilms(filmsList.results);
      setTotalPages(filmsList.total_pages);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const loadData = (page: number) => {
    if (showUpcoming) {
      loadUpcomingFilms(page);
      return;
    }
    if (showPopular) {
      loadPopularFilms(page);
      return;
    }
  }

  const onNextClick = () => {
    setPage((prevState) => prevState + 1);
    loadData(page + 1);
  }

  const onBackClick = () => {
    setPage((prevState) => prevState - 1);
    loadData(page - 1);
  }

  return <FilmsListDom pagination={{page, totalPages, onNextClick, onBackClick}}
                       data={{films, loading, error}}
                       upcomingFilms={{loadUpcomingFilms, showUpcoming, setShowUpcoming}}
                       popularFilms={{loadPopularFilms, showPopular, setShowPopular}}
  />;
};

export default FilmsList;
