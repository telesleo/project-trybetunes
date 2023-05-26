import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './style.module.css';

class AlbumPreview extends React.Component {
  render() {
    const { albumId, albumName, artworkUrl, artistId, artistName } = this.props;

    return (
      <Link
        to={ {
          pathname: `/album/${albumId}`,
          artistId,
          artistName,
        } }
        data-testid={ `link-to-album-${albumId}` }
        className="link"
      >
        <div className={ styles['album-preview'] }>
          <img
            className={ styles['album-artwork'] }
            src={ artworkUrl }
            alt="artwork of the album"
          />
          <div className={ styles['album-info'] }>
            <h3>{ albumName }</h3>
            <h5>{ artistName }</h5>
          </div>
        </div>
      </Link>
    );
  }
}

AlbumPreview.propTypes = {
  albumId: PropTypes.number.isRequired,
  albumName: PropTypes.string.isRequired,
  artworkUrl: PropTypes.string.isRequired,
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default AlbumPreview;
