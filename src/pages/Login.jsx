import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      buttonDisabled: true,
      status: 'login',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.nameValidation = this.nameValidation.bind(this);
    this.login = this.login.bind(this);
  }

  onInputChange(event) {
    const { value } = event.target;

    this.setState({ username: value }, this.nameValidation);
  }

  nameValidation() {
    const { username } = this.state;
    const minCharacterCount = 3;
    if (username.length >= minCharacterCount) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  async login() {
    this.setState({ status: 'loading' });
    const { username } = this.state;
    await createUser({ name: username });
    this.setState({ status: 'redirect' });
  }

  render() {
    const { username, buttonDisabled, status } = this.state;

    let statusMessage;
    if (status === 'loading') {
      statusMessage = <Loading />;
    } else if (status === 'redirect') {
      statusMessage = <Redirect to="/search" />;
    }

    return (
      <div data-testid="page-login">
        <h1>Escreva seu nome</h1>
        <input
          data-testid="login-name-input"
          value={ username }
          onChange={ this.onInputChange }
          type="text"
          placeholder="nome..."
        />
        <button
          data-testid="login-submit-button"
          onClick={ this.login }
          disabled={ buttonDisabled }
          type="submit"
        >
          Entrar
        </button>

        {statusMessage }
      </div>
    );
  }
}

export default Login;
