import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

import './Profile.css';

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
        <div className="page">
          {(loading) ? <Loading /> : (
            <div>
              <img
                data-testid="profile-image"
                className="profileImage"
                src={ profile.image }
                alt="Foto Perfil"
              />
              <h2>{profile.name}</h2>
              <p>{profile.description}</p>
              <p className="email">{profile.email}</p>
              <Link to="/profile/edit" class="editButton">Editar perfil</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
