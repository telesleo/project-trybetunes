import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading';
import MusicList from '../../components/MusicList';
import styles from './style.module.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      loading: true,
      artistName: '',
      collectionName: '',
      artwork: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const songs = await getMusics(id);
    this.setState({
      songs,
      loading: false,
      artistName: songs[0].artistName,
      collectionName: songs[0].collectionName,
      artwork: songs[0].artworkUrl100,
    });
  }

  render() {
    const { updateCurrentSong } = this.props;
    const { songs, loading, artistName, collectionName, artwork } = this.state;

    const content = (
      <>
        <h2 data-testid="album-name">{collectionName}</h2>
        <h3 data-testid="artist-name">{artistName}</h3>
        <img className={ styles.artwork } src={ artwork } alt="Album cover" />
        <MusicList
          updateCurrentSong={ updateCurrentSong }
          songs={ songs.slice(1, songs.length) }
        />
      </>
    );

    return (
      <div data-testid="page-album">
        <Header />
        <div className="page">
          {(loading) ? <Loading /> : content}
        </div>

      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  updateCurrentSong: PropTypes.func.isRequired,
};

export default Album;
