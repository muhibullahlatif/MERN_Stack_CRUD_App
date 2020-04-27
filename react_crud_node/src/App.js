import React from 'react';
import './App.css';
import PostMessages from './components/PostMessages';
import { Provider } from 'react-redux';
import { store } from './actions/store';
import { Container, AppBar, Typography } from '@material-ui/core';
import ButterToast, { POS_CENTER, POS_TOP } from 'butter-toast';

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth='xl'>
        <AppBar position='static' color='inherit'>
          <Typography variant='h2' align='center' style={{marginTop:20,marginBottom:20}}>CRUD Application (React / Node / MongoDB)</Typography>
        </AppBar>
        <PostMessages />
        <ButterToast position={{vertical:POS_TOP, horizontal:POS_CENTER}} />
      </Container>
    </Provider>
  );
}

export default App;
