import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import './App.css';
import AudioPlayer from './components/AudioPlayer';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentSong: {},
    };
  }

  updateCurrentSong = (song) => {
    this.setState({ currentSong: song });
  }

  render() {
    const { currentSong } = this.state;

    return (
      <div>
        <BrowserRouter>
          <div className="content">
            <Route exact path="/" component={ Login } />
            <Route exact path="/search" component={ Search } />
            <Route
              exact
              path="/album/:id"
              render={ (props) => (
                <Album { ...props } updateCurrentSong={ this.updateCurrentSong } />
              ) }
            />
            <Route
              exact
              path="/favorites"
              render={ (props) => (
                <Favorites { ...props } updateCurrentSong={ this.updateCurrentSong } />
              ) }
            />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
          </div>
          <div className="audio-player">
            <Route
              path={
                ['/search', '/favorites', '/profile', '/profile/edit', '/album/:id']
              }
              render={ () => (
                <AudioPlayer currentSong={ currentSong } />
              ) }
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
