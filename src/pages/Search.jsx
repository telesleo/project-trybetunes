import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchValue: '',
      searchDisabled: true,
      searchResults: [],
      showArtists: false,
      loading: false,
      artistSearched: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.searchValidation = this.searchValidation.bind(this);
    this.search = this.search.bind(this);
  }

  onInputChange(event) {
    const { value } = event.target;
    this.setState({ searchValue: value }, this.searchValidation);
  }

  async search() {
    const { searchValue } = this.state;

    this.setState({ loading: true, searchResults: [], showArtists: false });

    const searchResults = await searchAlbumsAPI(searchValue);

    this.setState({
      searchValue: '',
      searchResults,
      loading: false,
      showArtists: true,
      artistSearched: searchValue,
    });
  }

  searchValidation() {
    const { searchValue } = this.state;
    if (searchValue.length < 2) {
      this.setState({ searchDisabled: true });
    } else {
      this.setState({ searchDisabled: false });
    }
  }

  render() {
    const {
      searchValue,
      searchDisabled,
      loading,
      showArtists,
      artistSearched,
    } = this.state;
    const { searchResults } = this.state;

    let searchElements;
    if (loading) {
      searchElements = <Loading />;
    } else {
      searchElements = (
        <>
          <input
            data-testid="search-artist-input"
            className="searchBar"
            value={ searchValue }
            type="text"
            onChange={ this.onInputChange }
          />
          <button
            data-testid="search-artist-button"
            className="searchButton"
            disabled={ searchDisabled }
            onClick={ this.search }
            type="submit"
          >
            Pesquisar
          </button>
        </>
      );
    }

    let artists;
    if (showArtists) {
      if (searchResults.length > 0) {
        const listOfArtists = searchResults.map((artist, index) => (
          <li key={ index }>
            <Link
              to={ {
                pathname: `/album/${artist.collectionId}`,
                artistId: artist.artistId,
                artistName: artist.artistName,
              } }
              data-testid={ `link-to-album-${artist.collectionId}` }
              className="link"
            >
              {artist.collectionName}
            </Link>
          </li>));

        artists = (
          <>
            <h2>{`Resultado de álbuns de: ${artistSearched}` }</h2>
            <ul className="list">
              {listOfArtists}
            </ul>
          </>
        );
      } else {
        artists = <h2>Nenhum álbum foi encontrado</h2>;
      }
    }

    return (
      <div data-testid="page-search">
        <Header tab="search" />
        <div className="page">
          {searchElements}
          {artists}
        </div>
      </div>
    );
  }
}

export default Search;
