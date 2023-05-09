// srouce: https://stackoverflow.com/questions/39999367/how-do-i-reference-a-local-image-in-react

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

import './Header.css';

const logoImage = require('../Images/logoTrybeTunes.png').default;
const profileImage = require('../Images/profile.png').default;

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      username: '',
    };
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ loading: false, username: name });
  }

  render() {
    const { tab } = this.props;
    const { loading, username } = this.state;

    let loadingMessage;
    if (loading) {
      loadingMessage = <Loading />;
    }

    return (
      <div data-testid="header-component" className="header container">
        <div>
          <img
            src={ logoImage }
            alt="Logo TrybeTunes"
          />
        </div>
        <div className={ (tab === 'search') ? 'black' : '' }>
          <Link data-testid="link-to-search" className="link" to="/search">
            <p>Pesquisa</p>
          </Link>
        </div>
        <div className={ (tab === 'favorites') ? 'black' : '' }>
          <Link
            data-testid="link-to-favorites"
            className="link"
            to="/favorites"
          >
            <p>Músicas Favoritas</p>
          </Link>
        </div>
        <div className={ (tab === 'profile') ? 'black' : '' }>
          <Link data-testid="link-to-profile" className="link" to="/profile">
            <p>Perfil</p>
          </Link>
        </div>
        <div className="containerProfile">
          <p className="profileName" data-testid="header-user-name">{username}</p>
          {loadingMessage}
          <img
            src={ profileImage }
            alt="Logo TrybeTunes"
          />
        </div>
      </div>
    );
  }
}
Header.propTypes = {
  tab: PropTypes.string.isRequired,
};

export default Header;
