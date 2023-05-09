import React from 'react';
import PropTypes from 'prop-types';
import styles from '../AudioPlayer/style.module.css';
import volumeStyles from './style.module.css';

const HALF = 50;

class Volume extends React.Component {
  constructor() {
    super();

    this.state = {
      muted: false,
      active: false,
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

  activate = () => {
    this.setState({ active: true });
  }

  deactivate = () => {
    this.setState({ active: false });
  }

  render() {
    const { volume } = this.props;
    const { muted, active } = this.state;

    return (
      <div className={ volumeStyles.volume }>
        <div
          className={ volumeStyles['volume-range'] }
          style={ { display: (active) ? 'flex' : 'none' } }
          onPointerEnter={ this.activate }
          onPointerLeave={ this.deactivate }
        >
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
        </div>
        <button
          className={
            styles.button
          }
          type="button"
          onClick={ this.muteUnmute }
          onPointerEnter={ this.activate }
          onPointerLeave={ this.deactivate }
        >
          <span
            className={
              `${'material-symbols-outlined'} ${volumeStyles['volume-icon']}`
            }
          >
            { this.getVolumeIcon() }
          </span>
        </button>
      </div>
    );
  }
}

Volume.propTypes = {
  audio: PropTypes.shape({
    volume: PropTypes.number,
  }).isRequired,
  volume: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired,
};

export default Volume;
