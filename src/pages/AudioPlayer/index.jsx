import React from 'react';
import PropTypes from 'prop-types';

const RANGE_UPDATE_RATE = 5;

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
    this.audio.currentTime = (target.value / 100) * this.audio.duration;
    this.setState({ playerRange: target.value });
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
      <div>
        <input
          type="range"
          onChange={ this.changeAudioTime }
          onMouseDown={ this.startTimeMove }
          onMouseUp={ this.endTimeMove }
          value={ playerRange }
        />
        <button
          type="button"
          onClick={ (playing) ? this.pauseMusic : this.playMusic }
        >
          {(playing) ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          onChange={ this.changeVolume }
          value={ volume }
        />
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  currentSongUrl: PropTypes.string.isRequired,
};

export default AudioPlayer;
