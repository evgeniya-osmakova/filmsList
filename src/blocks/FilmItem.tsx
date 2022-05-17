import React, { useState } from 'react';
import { Film } from '@/models/models';
import { styled } from '@stitches/react';
import { Container } from '@/styles/base';
import Button from '@/components/Button';
import { useBookmarks } from '@/BookmarksContext';

const Wrapper = styled(Container, {
  position: 'relative',
  border: "1px solid black",
  padding: "1rem",
  maxWidth: "800px",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "2rem",
});

const FilmItem: React.FC<{filmsData: Film}> = ({ filmsData }) => {
  const { bookmarks, setBookmarks } = useBookmarks();
  const { title, release_date, poster_path, vote_average, id } = filmsData;
  const [hasAdded, setHasAdded] = useState(bookmarks.includes(id));

  const addToBookmarks = () => {
    setBookmarks((prevState) => [...prevState, id]);
    setHasAdded(true);
  }

  const removeFromBookmarks = () => {
    setBookmarks((prevState) => prevState.filter((filmId) => filmId !== id));
    setHasAdded(false);
  }

  return (
    <Wrapper direction="vertical">
      <h3>{title}</h3>
      <Container content="between" css={{flexWrap: "wrap", borderTop: "1px solid black"}}>
        <h5>Average vote: {vote_average}</h5>
        <p>Release date {release_date}</p>
      </Container>
      {poster_path && <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="poster"/>}
      {hasAdded && <Button text={'Remove from bookmarks'} onClick={removeFromBookmarks}/>}
      {!hasAdded && <Button text={'Add to bookmarks'} onClick={addToBookmarks}/>}
    </Wrapper>
  );
};

export default FilmItem;
