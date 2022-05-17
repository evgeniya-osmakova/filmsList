import { api, doFetch, key, lang } from './helpers';
import { FilmsListData, FilmDetails } from '@/models/models';

export const getFilmDetails= async (id: number) =>
  doFetch<FilmDetails>(`${api}/movie/${id}?api_key=${key}&language=${lang}`);

export const getUpcomingFilms= async (page: number) =>
  doFetch<FilmsListData>(`${api}/movie/upcoming?api_key=${key}&language=${lang}&page=${page}`);

export const getPopularFilms= async (page: number) =>
  doFetch<FilmsListData>(`${api}/movie/popular?api_key=${key}&language=${lang}&page=${page}`);
