import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
    const { loading, username } = this.state;

    let loadingMessage;
    if (loading) {
      loadingMessage = <Loading />;
    }

    return (
      <div data-testid="header-component">
        Header
        <Link data-testid="link-to-search" to="/search"> Pesquisa </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Músicas Favoritas </Link>
        <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
        <h3 data-testid="header-user-name">{ username }</h3>
        { loadingMessage }
      </div>
    );
  }
}

export default Header;
