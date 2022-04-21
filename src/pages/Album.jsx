import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
// import MusicCard from '../components/MusicCard';
import MusicList from '../components/MusicList';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      loading: true,
      artistName: '',
      collectionName: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const songs = await getMusics(id);
    this.setState({
      songs,
      loading: false,
      artistName: songs[0].artistName,
      collectionName: songs[0].collectionName,
    });
  }

  render() {
    const { songs, loading, artistName, collectionName } = this.state;

    const content = (
      <>
        <h2 data-testid="album-name">{collectionName}</h2>
        <h3 data-testid="artist-name">{artistName}</h3>
        <MusicList
          songs={ songs.slice(1, songs.length) }
        />
      </>
    );

    return (
      <div data-testid="page-album">
        <Header />
        { (loading) ? <Loading /> : content }
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.isRequired,
  id: PropTypes.isRequired,
  params: PropTypes.isRequired,
};

export default Album;
