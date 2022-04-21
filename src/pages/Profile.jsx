import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      profile: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const profile = await getUser();
    this.setState({ profile, loading: false });
  }

  render() {
    const { profile, loading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header tab="profile" />
        {(loading) ? <Loading /> : (
          <div>
            <img data-testid="profile-image" src={ profile.image } alt="Foto Perfil" />
            <h2>{profile.name}</h2>
            <h3>{profile.email}</h3>
            <p>{profile.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
