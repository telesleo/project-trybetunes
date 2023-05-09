import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import Volume from '../Volume';
import TrackInfo from '../TrackInfo';

const RANGE_UPDATE_RATE = 1000;
const ONE_MINUTE_IN_SECONDS = 60;

class AudioPlayer extends React.Component {
  constructor() {
    super();

    this.state = {
      audio: new Audio(),
      playerRange: 0,
      playing: false,
      movingRange: false,
      volume: 50,
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.updatePlayerRange, RANGE_UPDATE_RATE);
  }

  componentDidUpdate(prevProps) {
    const { currentSong } = this.props;

    if (currentSong && prevProps.currentSong !== currentSong) {
      this.updateAudioUrl(currentSong.previewUrl);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setVolume = (newVolume) => this.setState({ volume: newVolume });

  updateAudioUrl = (newUrl) => {
    const { volume, audio } = this.state;

    audio.pause();

    const newAudio = new Audio(newUrl);
    newAudio.volume = volume / 100;
    newAudio.addEventListener('ended', () => {
      this.setState({ playing: false, playerRange: 100 });
      this.updatePlayerRange();
    });

    this.setState({ audio: newAudio }, () => {
      this.playMusic();
      this.setState({ playerRange: 0 });
    });

    return newAudio;
  }

  playMusic = () => {
    const { currentSong } = this.props;
    const { audio } = this.state;

    if (!currentSong?.previewUrl) return;

    audio.play();
    this.setState({ playing: true });

    this.updatePlayerRange();

    console.log('play');
  }

  pauseMusic = () => {
    const { audio } = this.state;

    audio.pause();
    this.setState({ playing: false });
  }

  changeAudioTime = ({ target }) => {
    const { audio } = this.state;

    if (audio.duration > 0) {
      audio.currentTime = (target.value / 100) * audio.duration;
      audio.pause();
      this.setState({ playerRange: target.value });
    }
  }

  updatePlayerRange = () => {
    const { movingRange, audio, playing } = this.state;

    if (movingRange || !playing) return;

    this.setState({ playerRange: (audio.currentTime * 100) / audio.duration });
  }

  startTimeMove = () => {
    const { audio } = this.state;

    audio.pause();

    this.setState({ movingRange: true });
  }

  endTimeMove = () => {
    const { playing } = this.state;
    if (playing) this.playMusic();

    this.setState({ movingRange: false });
  }

  formatTime = (seconds) => {
    if (!seconds) return null;

    const minutes = Math.floor(seconds / ONE_MINUTE_IN_SECONDS);
    const remainingSeconds = parseInt(seconds % ONE_MINUTE_IN_SECONDS, 10)
      .toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  }

  render() {
    const { currentSong } = this.props;
    const { playerRange, playing, audio, volume } = this.state;

    return (
      <div className={ styles.player }>
        <div className={ styles['player-content'] }>
          <div className={ styles['player-div'] }>
            <button
              className={ `${styles['play-button']} ${styles.button}` }
              type="button"
              onClick={ (playing) ? this.pauseMusic : this.playMusic }
            >
              <span className="material-symbols-outlined">
                {(playing) ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <p className={ styles['track-time'] }>
              { this.formatTime(audio.currentTime) || '0:00' }
            </p>
            <input
              className={ styles.range }
              type="range"
              onChange={ this.changeAudioTime }
              onMouseDown={ this.startTimeMove }
              onMouseUp={ this.endTimeMove }
              value={ playerRange || 0 }
              style={ {
                background: `linear-gradient(to right, #422550 0%, #422550
                ${playerRange}%, #494949 
                ${playerRange}%, #494949 100%)`,
              } }
            />
            <p className={ styles['track-time'] }>
              {this.formatTime(audio.duration) || '0:00' }
            </p>
            <Volume audio={ audio } volume={ volume } setVolume={ this.setVolume } />
          </div>
          <TrackInfo
            trackName={ currentSong?.trackName }
            artistName={ currentSong?.artistName }
            artworkUrl={ currentSong?.artworkUrl100 }
            playing={ playing }
          />
        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  currentSong: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }),
};

AudioPlayer.defaultProps = {
  currentSong: PropTypes.shape({
    previewUrl: undefined,
    trackName: undefined,
    artistName: undefined,
    artworkUrl100: undefined,
  }),
};

export default AudioPlayer;
