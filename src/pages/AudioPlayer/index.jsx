import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

const RANGE_UPDATE_RATE = 5;
const HALF = 50;

class AudioPlayer extends React.Component {
  constructor() {
    super();

    this.state = {
      playerRange: 0,
      playing: false,
      movingRange: false,
      volume: 50,
    };

    this.audio = new Audio();
  }

  componentDidMount() {
    this.interval = setInterval(this.updatePlayerRange, RANGE_UPDATE_RATE);
    this.updateAudio();
  }

  componentDidUpdate(prevProps) {
    const { currentSongUrl } = this.props;

    if (prevProps.currentSongUrl !== currentSongUrl) {
      this.updateAudio(currentSongUrl);
      this.playMusic();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getVolumeIcon() {
    const { volume } = this.state;

    if (volume > HALF) {
      return 'volume_up';
    } if (volume > 1) {
      return 'volume_down';
    }
    return 'volume_mute';
  }

  updateAudio = (newUrl) => {
    this.audio.pause();
    this.audio = new Audio(newUrl);
    this.audio.addEventListener('ended', () => this.setState({ playing: false }));
  }

  playMusic = () => {
    this.audio.play();
    this.setState({ playing: true });
  }

  pauseMusic = () => {
    this.audio.pause();
    this.setState({ playing: false });
  }

  changeAudioTime = ({ target }) => {
    if (this.params && this.params.currentSongUrl) {
      this.audio.currentTime = (target.value / 100) * this.audio.duration;
      this.setState({ playerRange: target.value });
    }
  }

  updatePlayerRange = () => {
    const { movingRange } = this.state;

    if (movingRange) {
      return;
    }

    this.setState({ playerRange: (this.audio.currentTime * 100) / this.audio.duration });
  }

  startTimeMove = () => {
    this.setState({ movingRange: true });

    this.audio.pause();
  }

  endTimeMove = () => {
    this.setState({ movingRange: false });

    const { playing } = this.state;
    if (playing) this.playMusic();
  }

  changeVolume = ({ target }) => {
    this.audio.volume = target.value / 100;
    this.setState({ volume: target.value });
  }

  render() {
    const { playerRange, playing, volume } = this.state;

    return (
      <div className={ styles.player }>
        <div className={ styles['player-content'] }>
          <div>
            <button
              className={ styles['play-button'] }
              type="button"
              onClick={ (playing) ? this.pauseMusic : this.playMusic }
            >
              <span className="material-symbols-outlined">
                {(playing) ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <input
              className={ styles.range }
              type="range"
              onChange={ this.changeAudioTime }
              onMouseDown={ this.startTimeMove }
              onMouseUp={ this.endTimeMove }
              value={ playerRange || 0 }
              style={ {
                background: `linear-gradient(to right, #422550 0%, #422550
                ${playerRange}%, #494949 ${playerRange}%, #494949 100%)`,
              } }
            />
          </div>
          <div>
            <input
              className={ styles.range }
              type="range"
              onChange={ this.changeVolume }
              value={ volume }
              style={ {
                background: `linear-gradient(to right, #422550 0%, #422550
                ${volume}%, #494949 ${volume}%, #494949 100%)`,
              } }
            />
            <span className="material-symbols-outlined">
              { this.getVolumeIcon() }
            </span>
          </div>
        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  currentSongUrl: PropTypes.string.isRequired,
};

export default AudioPlayer;
