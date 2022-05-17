import React from 'react';
import { styled } from '@stitches/react';
import { Container } from '@/styles/base';

const Icon = styled('div', {
  fontWeight: 700,
  cursor: "pointer",
  "&:hover": {
    opacity: 0.7,
    textDecoration: "underline",
    transition: "opacity 0.5s ease, textDecoration  0.5s ease",
  }
})

const Page = styled('div', {
  fontWeight: 700,
  margin: "0 1.5rem",
})


type PaginationProps = {
  page: number,
  totalPages: number,
  onNextClick: () => void,
  onBackClick: () => void,
}

const Pagination: React.FC<PaginationProps> = ({page, totalPages, onNextClick, onBackClick}) => {
  if (totalPages === 1) {
    return null;
  }

  return (
    <Container content="center">
      {page !== 1 && <Icon onClick={onBackClick}>&#60; Previous page</Icon>}
      <Page>{page}</Page>
      {page !== totalPages && <Icon onClick={onNextClick}>Next page &#62;</Icon>}
    </Container>
  );
};

export default Pagination;
