import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  GREY_29,
  GREY_203,
  GREY_236,
} from '../constants/colors';

const Layout = styled.div`
  font-family: 'Fira Sans', sans-serif;
  color: ${GREY_29};
`;

const Background = styled.div`
  background-color: ${GREY_236};
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: -1;
`;

const ListContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-top: 150px;
  margin-bottom: 100px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 3px;
  background-color: white;
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ListItem = styled.div`
  box-sizing: border-box;
  padding: 7px 15px;
  background-color: ${GREY_236};
  margin-top: 4px;
  border-radius: 3px;
  cursor: pointer;
  color: ${GREY_29};

  &:hover {
    background-color: ${GREY_203}
  }
`;

const InactiveListItem = styled(ListItem)`
  &:hover {
    background-color: ${GREY_236};
  }
  cursor: not-allowed;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

const projects = [
  {
    slug: 'birds',
    title: 'Birds',
    active: true,
  },
  {
    slug: 'game_of_life',
    title: 'Game of Life',
    active: false,
  },
];

const ActiveLink: FC<{ title: string; slug: string; }> = ({ title, slug }) => (
  <StyledLink to={`/canvas-toy/${slug}`}>
    <ListItem>
      {title}
    </ListItem>
  </StyledLink>
);

const InactiveLink: FC<{ title: string; }> = ({ title }) => (
  <InactiveListItem>
    {title} (Coming soon)
  </InactiveListItem>
);

const FrontPage: FC = () => (
  <Layout>
    <Background />
    <ListContainer>
      <h1>Neat Stuff</h1>
      <List>
        {projects.map(item => (
          item.active
            ? <ActiveLink title={item.title} slug={item.slug} />
            : <InactiveLink title={item.title} />
        ))}
      </List>
    </ListContainer>
  </Layout>
);

export default FrontPage;