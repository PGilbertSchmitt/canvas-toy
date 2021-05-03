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

  &:hover {
    background-color: ${GREY_203}
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${GREY_29};

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

const projects = [
  {
    slug: 'birds',
    title: 'Birds'
  },
  {
    slug: 'game_of_life',
    title: 'Game of Life'
  },
  {
    slug: 'dope',
    title: 'Dope'
  }
];

const FrontPage: FC = () => (
  <Layout>
    <Background />
    <ListContainer>
      <h1>Neat Stuff</h1>
      <List>
        {projects.map(item => (
          <StyledLink to={`/canvas-toy/${item.slug}`} key={item.slug}>
            <ListItem>
              {item.title}
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </ListContainer>
  </Layout>
);

export default FrontPage;