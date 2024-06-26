import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

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
    const { song, updateCurrentSong } = this.props;
    const { trackName, trackId } = song;
    const { favorited, loading } = this.state;

    return (
      <>
        <p>{trackName}</p>
        <div className="trackContainer">
          {/* <div>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
          </div> */}
          <button
            type="button"
            onClick={ () => { updateCurrentSong(song); } }
          >
            Play
          </button>
          <div>
            <label htmlFor={ trackId }>
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                id={ trackId }
                type="checkbox"
                checked={ favorited }
                onChange={ this.onCheckboxChange }
              />
            </label>
          </div>
          {(loading) ? <Loading /> : <> </>}
        </div>
      </>
    );
  }
}
MusicCard.propTypes = {
  favoriteSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
  song: PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  changeFavoriteSongs: PropTypes.func.isRequired,
  updateCurrentSong: PropTypes.func.isRequired,
};

export default MusicCard;
