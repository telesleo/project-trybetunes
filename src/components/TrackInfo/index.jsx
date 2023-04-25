import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

class TrackInfo extends React.Component {
  render() {
    const { trackName, artistName, artworkUrl, playing } = this.props;

    return (
      <div className={ styles['track-info'] }>
        <div className={ styles['track-and-artist'] }>
          <h4 className={ styles['track-name'] }>{ trackName || '' }</h4>
          <p className={ styles['artist-name'] }>{ artistName || '' }</p>
        </div>
        { (artworkUrl) && (
          <img
            className={ `${styles['album-cover']} ${(playing) && styles.rotating}` }
            src={ artworkUrl }
            alt="Album cover"
          />
        ) }
      </div>
    );
  }
}

TrackInfo.propTypes = {
  trackName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  artworkUrl: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
};

export default TrackInfo;
