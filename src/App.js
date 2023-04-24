import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './App.css';
import AudioPlayer from './components/AudioPlayer';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentSongUrl: '',
    };
  }

  updateCurrSongUrl = (newUrl) => {
    this.setState({ currentSongUrl: newUrl });
  }

  render() {
    const { currentSongUrl } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/search" component={ Search } />
            <Route
              exact
              path="/album/:id"
              render={ (props) => (
                <Album { ...props } updateCurrSongUrl={ this.updateCurrSongUrl } />
              ) }
            />
            <Route
              exact
              path="/favorites"
              render={ (props) => (
                <Favorites { ...props } updateCurrSongUrl={ this.updateCurrSongUrl } />
              ) }
            />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route exact component={ NotFound } />
          </Switch>
        </BrowserRouter>
        <AudioPlayer currentSongUrl={ currentSongUrl } />
      </div>
    );
  }
}

export default App;
