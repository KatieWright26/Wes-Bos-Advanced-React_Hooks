import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { Header } from './Header';
import { Meta } from './Meta';
import { theme, StyledPage, Inner } from './styles/ContainerStyles';

export default function Page({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{children}</Inner>
      </StyledPage>
    </ThemeProvider>
  );
}

Page.propTypes = {
  children: PropTypes.object,
};
