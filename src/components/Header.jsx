import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

import './Header.css';

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
        <div className={ (tab === 'search') ? 'black' : '' }>
          <Link data-testid="link-to-search" class="link" to="/search">
            <p>Pesquisa</p>
          </Link>
        </div>
        <div className={ (tab === 'favorites') ? 'black' : '' }>
          <Link
            data-testid="link-to-favorites"
            class="link"
            to="/favorites"
          >
            <p>Músicas Favoritas</p>
          </Link>
        </div>
        <div className={ (tab === 'profile') ? 'black' : '' }>
          <Link data-testid="link-to-profile" class="link" to="/profile">
            <p>Perfil</p>
          </Link>
        </div>
        <div>
          <p data-testid="header-user-name">{username}</p>
          {loadingMessage }
        </div>
      </div>
    );
  }
}

export default Header;
