import React from 'react';
import PropTypes from 'prop-types';
import styles from '../AudioPlayer/style.module.css';

const HALF = 50;

class Volume extends React.Component {
  constructor() {
    super();

    this.state = {
      muted: false,
    };
  }

  getVolumeIcon = () => {
    const { volume } = this.props;
    const { muted } = this.state;

    if (muted) {
      return 'volume_mute';
    }

    if (volume > HALF) {
      return 'volume_up';
    } if (volume > 1) {
      return 'volume_down';
    }
    return 'volume_mute';
  }

  changeVolume = ({ target }) => {
    const { audio, setVolume } = this.props;

    audio.volume = target.value / 100;
    this.setState({ muted: false });
    setVolume(target.value);
  }

  muteUnmute = () => {
    const { audio } = this.props;

    this.setState((prevState) => ({
      muted: (prevState.volume === 0) ? true : !prevState.muted,
    }), () => {
      const { volume } = this.props;
      const { muted } = this.state;
      if (muted) {
        audio.volume = 0;
      } else {
        audio.volume = volume / 100;
      }
    });
  }

  render() {
    const { volume } = this.props;
    const { muted } = this.state;

    return (
      <>
        <input
          className={ styles.range }
          type="range"
          onChange={ this.changeVolume }
          value={ (muted) ? 0 : volume }
          style={ {
            background: `linear-gradient(to right, #422550 0%, #422550
        ${(muted) ? 0 : volume}%, #494949 
        ${(muted) ? 0 : volume}%, #494949 100%)`,
          } }
        />
        <button
          className={ styles.button }
          type="button"
          onClick={ this.muteUnmute }
        >
          <span className="material-symbols-outlined">
            { this.getVolumeIcon() }
          </span>
        </button>
      </>
    );
  }
}

Volume.propTypes = {
  audio: PropTypes.shape({
    volume: PropTypes.number,
  }).isRequired,
  volume: PropTypes.string.isRequired,
  setVolume: PropTypes.func.isRequired,
};

export default Volume;
