import React from 'react';
import Loading from './Loading';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorited: false,
    };

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.favorite = this.favorite.bind(this);
  }

  componentDidMount() {
    const { favoriteSongs, song } = this.props;
    const favorited = [...favoriteSongs].some(
      (favSong) => favSong.trackId === song.trackId,
    );
    this.setState({ favorited });
  }

  onCheckboxChange(event) {
    const { checked } = event.target;
    this.setState({ favorited: checked, loading: true }, this.favorite);
  }

  async favorite() {
    const { changeFavoriteSongs, song } = this.props;
    const { favorited } = this.state;
    await changeFavoriteSongs(song, favorited);
    this.setState({ loading: false });
  }

  render() {
    const { song } = this.props;
    const { trackName, previewUrl, trackId } = song;
    const { favorited, loading } = this.state;

    return (
      <>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            type="checkbox"
            checked={ favorited }
            onClick={ this.onCheckboxChange }
          />
        </label>
        {(loading) ? <Loading /> : <> </>}
      </>
    );
  }
}
MusicCard.propTypes = {
  favoriteSongs: PropTypes.isRequired,
  song: PropTypes.isRequired,
  changeFavoriteSongs: PropTypes.isRequired,
};

export default MusicCard;
