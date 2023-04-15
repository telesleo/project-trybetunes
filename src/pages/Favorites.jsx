import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicList from '../components/MusicList';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      loading: true,
    };

    this.updateFavoriteSongs = this.updateFavoriteSongs.bind(this);
  }

  async componentDidMount() {
    this.updateFavoriteSongs();
  }

  async updateFavoriteSongs() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, loading: false });
  }

  render() {
    const { updateCurrSongUrl } = this.props;
    const { favoriteSongs, loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header tab="favorites" />
        {(loading) ? <Loading /> : <MusicList
          songs={ favoriteSongs }
          updateSongs={ this.updateFavoriteSongs }
          updateCurrSongUrl={ updateCurrSongUrl }
        />}
      </div>
    );
  }
}

Favorites.propTypes = {
  updateCurrSongUrl: PropTypes.func.isRequired,
};

export default Favorites;
