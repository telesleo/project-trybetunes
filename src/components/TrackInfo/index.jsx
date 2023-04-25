import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

class TrackInfo extends React.Component {
  render() {
    const { trackName, artistName } = this.props;

    return (
      <div className={ styles['track-info'] }>
        <h4>{ trackName || '' }</h4>
        <p className={ styles['artist-name'] }>{ artistName || '' }</p>
      </div>
    );
  }
}

TrackInfo.propTypes = {
  trackName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default TrackInfo;
