import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicList extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      loading: true,
    };

    this.changeFavoriteSongs = this.changeFavoriteSongs.bind(this);
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, loading: false });
  }

  async changeFavoriteSongs(song, add) {
    if (add) {
      await addSong(song);
    } else {
      await removeSong(song);
    }
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });

    const { updateSongs } = this.props;
    if (updateSongs !== undefined) {
      updateSongs();
    }
  }

  render() {
    const { songs, updateCurrentSong } = this.props;
    const { favoriteSongs, loading } = this.state;

    const listOfSongs = [...songs].map((song, index) => (
      <li key={ index }>
        <MusicCard
          song={ song }
          changeFavoriteSongs={ this.changeFavoriteSongs }
          favoriteSongs={ favoriteSongs }
          updateCurrentSong={ updateCurrentSong }
        />
      </li>
    ));

    const songElements = (
      <ol>
        {listOfSongs}
      </ol>
    );

    return (
      <div>
        {(loading) ? <Loading /> : songElements }
      </div>
    );
  }
}
MusicList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateSongs: PropTypes.func.isRequired,
  updateCurrentSong: PropTypes.func.isRequired,
};

export default MusicList;
