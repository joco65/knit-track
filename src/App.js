import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import MainContentWrapper from 'mui/MainContentWrapper';
import theme from 'mui/knitTrackTheme';

import Header from 'components/Header';
import HomeScreen from 'components/HomeScreen';

import PatternContainer from 'containers/PatternContainer';
import PatternSetup from 'containers/PatternSetup';

const App = () => (

  <ThemeProvider theme={theme}>

    <CssBaseline />

    <Header />

    <MainContentWrapper>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/patterns/new" component={PatternSetup} />
        <Route path="/patterns/:patternId" component={PatternContainer} />
        <Route component={HomeScreen}/>
      </Switch>
    </MainContentWrapper>

  </ThemeProvider>

);

export default App;