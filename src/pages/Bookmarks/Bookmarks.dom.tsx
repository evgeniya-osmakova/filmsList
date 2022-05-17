import React from 'react';
import { useBookmarks } from '@/BookmarksContext';
import { FilmDetails } from '@/models/models';
import { Container } from '@/styles/base';
import Button from '@/components/Button';
import Routes, { Pages } from '@/routes';
import { styled } from '@stitches/react';
import { Link } from 'react-router-dom';

const BackLink = styled(Link, {
  display: "block",
  marginLeft: "2rem",
  marginTop: "2rem",
  marginBottom: "2rem"
});

const Error = styled('h5', {
  height: "2rem",
  color: "red",
  margin: "0 auto"
});

const FilmItem = styled(Container, {
  border: "1px solid black",
  padding: "1rem",
  maxWidth: "40rem",
  width: "100%",
  marginRight: "1rem",
});

const Img = styled('img', {
  height: "15rem",
})

type BookmarksDomProps = {
  films: FilmDetails[];
  loading: boolean,
  error: null | string,
  setFilms: React.Dispatch<React.SetStateAction<FilmDetails[]>>,
}

const BookmarksDom: React.FC<BookmarksDomProps> = ({ films, error, loading, setFilms }) => {
  const {setBookmarks} = useBookmarks();

  const removeFromBookmarks = (id: number) => {
    setBookmarks((prevState) => prevState.filter((filmId) => filmId !== id));
    setFilms((prevState) => prevState.filter(({id: filmId}) => filmId !== id))
  }

  return (
    <>
      <BackLink to={Routes[Pages.Main].path}>
        Go to films list
      </BackLink>
      <Error>{error}</Error>
      {loading && films.length === 0 && <Container content="center">...Loading</Container>}
      {films.length === 0 && <Container content="center">Bookmarked films will be displayed here</Container>}
      <Container direction="vertical" align="center" css={{padding: "0 1rem"}}>
        {films.map(({title, id, overview, budget, poster_path, runtime }) => (
          <Container key={id} css={{marginBottom: "1rem"}}>
            <FilmItem>
              <Container direction="vertical" css={{marginRight: "1rem"}}>
                <h5>{title}</h5>
                <p>Budget: {budget}</p>
                <p>Runtime: {runtime}</p>
                {poster_path && <Img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="poster"/>}
              </Container>
              <p>{overview}</p>
            </FilmItem>
            <Button text={"x"} onClick={() => removeFromBookmarks(id)} />
          </Container>
        ))}
      </Container>
    </>
  );
};

export default BookmarksDom;
