import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.validForms = this.validForms.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const profile = await getUser();
    this.setState({
      name: profile.name,
      email: profile.email,
      description: profile.description,
      image: profile.image,
      loading: false,
    });
  }

  onInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value, buttonDisabled: !this.validForms() });
  }

  saveProfile() {
    const { name, email, description, image } = this.state;
    this.setState({ loading: true }, async () => {
      await updateUser({ name, email, image, description });
      const { history } = this.props;
      history.push('/profile');
    });
  }

  validForms() {
    const { name, image, email, description } = this.state;
    if ([name, image, email, description].some((input) => input === '')) {
      return false;
    }
    return email.includes('@');
  }

  render() {
    const { name, email, description, image, loading, buttonDisabled } = this.state;

    const content = (
      <form>
        <label htmlFor="name">
          {'Name: '}
          <input
            data-testid="edit-input-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="email">
          {'Email: '}
          <input
            data-testid="edit-input-email"
            type="text"
            name="email"
            value={ email }
            onChange={ this.onInputChange }

          />
        </label>
        <label htmlFor="description">
          {'Descrição: '}
          <input
            data-testid="edit-input-description"
            type="text"
            name="description"
            value={ description }
            onChange={ this.onInputChange }

          />
        </label>
        <label htmlFor="image">
          {'Foto de Perfil: '}
          <input
            data-testid="edit-input-image"
            type="text"
            name="image"
            value={ image }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          data-testid="edit-button-save"
          type="submit"
          disabled={ buttonDisabled }
          onClick={ this.saveProfile }
        >
          Salvar
        </button>
      </form>
    );

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {(loading) ? <Loading /> : content }
      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.isRequired,
};

export default ProfileEdit;
