import React from 'react';
import FilmItem from '@/blocks/FilmItem';
import { styled } from '@stitches/react';
import { Container } from '@/styles/base';
import { Film } from '@/models/models';
import Routes, { Pages } from '@/routes';
import { Link } from 'react-router-dom';
import Pagination from '@/components/Pagination';

const BookmarksLink = styled(Link, {
  display: "block",
  marginLeft: "2rem",
  marginTop: "2rem",
  marginBottom: "2rem"
});

const FilmsWrapper = styled('section', {
  padding: "1rem",
  height: "100%",
});

const Error = styled('h5', {
  height: "2rem",
  color: "red",
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
});

const Input = styled('input', {
  height: "2rem",
  width: "100%",
  maxWidth: "30rem",
  marginTop: "0.5rem",
});

const CheckboxLabel = styled('label', {
  cursor: "pointer",
})

const Checkbox = styled('input', {
  variants: {
    position: {
      first: {
        marginLeft: 0,
      },
      notFirst: {
        marginLeft: "1rem",
      }
    }
  },
  defaultVariants: {
    position: 'notFirst',
  }
});

type FilmsListProps = {
  pagination: {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
    onNextClick: () => void,
    onBackClick: () => void,
  }
  data: {
    films: Film[],
    loading: boolean,
    error: null | string,
  }
  upcomingFilms: {
    loadUpcomingFilms: () => void,
    showUpcoming: boolean,
    setShowUpcoming: React.Dispatch<React.SetStateAction<boolean>>,
  },
  popularFilms: {
    loadPopularFilms: () => void,
    showPopular: boolean,
    setShowPopular: React.Dispatch<React.SetStateAction<boolean>>,
  }
  searchData: {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
  }
}

const FilmsListDom: React.FC<FilmsListProps> = ({data, upcomingFilms, popularFilms, pagination, searchData}) => {
  const { search, setSearch } = searchData;
  const { films, loading, error } = data;
  const { page, setPage } = pagination;
  const {loadUpcomingFilms, showUpcoming, setShowUpcoming} = upcomingFilms;
  const {loadPopularFilms, showPopular, setShowPopular} = popularFilms;

  const clearPaginationState = () =>  {
    if (page !== 1) {
      setPage(1);
    }
  }

  const onShowUpcomingClick = () => {
    setShowUpcoming(true);
    if (search) {
      setSearch("");
    }
    if (showPopular) {
      setShowPopular(false);
    }
    clearPaginationState();
    loadUpcomingFilms();
  }

  const onShowPopularClick = () => {
    setShowPopular(true);
    if (search) {
      setSearch("");
    }
    if (showUpcoming) {
      setShowUpcoming(false);
    }
    clearPaginationState();
    loadPopularFilms();
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPopular(false);
    setShowUpcoming(false);
    setSearch(e.target.value);
    if (page !== 1) {
      setPage(1);
    }
  }

  return (
    <>
      <BookmarksLink to={Routes[Pages.Bookmarks].path}>
        Bookmarks
      </BookmarksLink>
      <Container content="center" css={{marginTop: "3rem"}}>
        <label>
          Search for a film from <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">https://www.themoviedb.org/</a>
          <Input placeholder="Spider-Man: Far From Home" onChange={onSearchChange} value={search} />
        </label>
      </Container>
      <Container content="center" css={{marginTop: "1rem"}}>
        <CheckboxLabel>
          <Checkbox type="checkbox" name="upcoming" position="first" checked={showUpcoming} onChange={onShowUpcomingClick} />
          Upcoming films
        </CheckboxLabel>
        <CheckboxLabel>
          <Checkbox type="checkbox" name="popular" checked={showPopular} onChange={onShowPopularClick} />
          Popular films
        </CheckboxLabel>
      </Container>
      <Error>{error}</Error>
      {loading && films.length === 0 && <Container content="center">...Loading</Container>}
      <Pagination {...pagination} />
        <FilmsWrapper>
          {films.map((filmsData) => <FilmItem key={filmsData.id} filmsData={filmsData} />)}
        </FilmsWrapper>
      <Pagination {...pagination} />
    </>
  );
}

export default FilmsListDom;
