export interface Film {
  adult: boolean,
  backdrop_path: string | null,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview : string,
  popularity : number,
  poster_path : string | null,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}

export interface FilmsListData { dates: {maximum: string, minimum: string}, page: number, results: Film[], total_pages: number
  total_results: number }

export interface FilmDetails extends Omit<Film, 'genre_ids'>{
  belongs_to_collection: null | object,
  budget: number,
  genres: {id: number, name: string}[],
  homepage: string | null,
  imdb_id: string | null,
  production_companies: {
    name: string,
    id: number,
    logo_path: string | null,
    origin_country: string,

  }[],
  production_countries: {
    iso_3166_1: string,
    name: string,
  }[],
  revenue: number,
  runtime: number | null,
  spoken_languages: {
    iso_639_1: string,
    name: string,
  }[],
  status: string,
  tagline: string | null,
}
