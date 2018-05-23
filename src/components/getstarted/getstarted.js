import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import Route from 'react-router-dom/es/Route';
import Link from 'react-router-dom/es/Link';
import Redirect from "react-router-dom/es/Redirect";

import Button from '../button/button';
import Input from '../input/input';

import styles from './getstarted.scss';

class Getstarted extends Component {
  state = {
    login: {
      username: '',
      password: '',
    },
    registration: {
      employeeID: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    authenticating: false,
    usernameIsValid: false,
    passwordsMatch: false,
    error: false
  };

  timeout = null;

  onChangeUsernameHandler = (e, s) => {
    const prevState = {...this.state};

    switch (s) {
      case 1:
        this.setState({
          ...prevState,
          login: {
            ...prevState.login,
            username: e.target.value
          }
        });
        break;
      case 2:
        this.setState({
          ...prevState,
          registration: {
            ...prevState.registration,
            username: e.target.value
          }
        })
    }
  };

  onChangePasswordHandler = (e, s) => {
    const prevState = {...this.state};

    switch (s) {
      case 1:
        this.setState({
          ...prevState,
          login: {
            ...prevState.login,
            password: e.target.value
          }
        });
        break;
      case 2:
        this.setState({
          ...prevState,
          registration: {
            ...prevState.registration,
            password: e.target.value
          }
        });
        break;
    }
  };

  onChangeConfirmPasswordHandler = e => {
    const prevState = {...this.state};

    this.setState({
      ...prevState,
      registration: {
        ...prevState.registration,
      confirmPassword: e.target.value
    }
    })
  };

  onChangeEmployeeIDHandler = e => {
    const prevState = {...this.state};

    this.setState({
      ...prevState,
      registration: {
        ...prevState.registration,
        employeeID: e.target.value
      }
    })
  };

  onKeyUpUsernameHandler = () => {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if(this.state.registration.username.length >= 8) {
        this.setState({...{...this.state}, usernameIsValid: true});
      }
    }, 500)
  };

  onKeyUpConfirmPassword = () => {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if(this.state.registration.password.length >= 8 && (this.state.registration.password === this.state.registration.confirmPassword)) {
        this.setState({...{...this.state}, passwordsMatch: true, error: false});
      } else {
        if(this.state.registration.confirmPassword.length > 0) {
          this.setState({...{...this.state}, passwordsMatch: false, error: true});
        }
      }


    }, 500)
  };

  onSubmit = e => {
    if(e.which === 13) {
      if(this.state.disabled) {

      }
    }
  };

  render() {
    if(this.props.location.pathname === '/get-started/' || this.props.location.pathname === '/get-started') {
      return <Redirect to={`${this.props.match.path}/login`}/>
    }

    const login =
      <div className={styles.form} onKeyPress={e => this.onSubmit(e)}>
        <Input onChangeHandler={e => this.onChangeUsernameHandler(e, 1)} autofocus={true} width={350} name="Username" type="text"/>
        <Input onChangeHandler={e => this.onChangePasswordHandler(e, 1)} width={350} name="Password" type="password"/>
        <p className={styles.forgot}><Link to="">Forgot your password?</Link></p>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button disabled={!(this.state.login.username.length >= 1 && this.state.login.password.length >= 1)} type="submit" width={150} name="Continue" classNames={['primary', 'secondary']} />
        </div>
        <p className={styles.helper}>or <Link to="register">create an account.</Link></p>
        <p className={styles.helper}>Need help? Click <a href="">here.</a></p>
      </div>;

    const register =
      <div className={styles.form} onKeyPress={e => this.onSubmit(e)}>
        <Input
          onChangeHandler={e => this.onChangeEmployeeIDHandler(e)}
          isValid={this.state.registration.employeeID.length >= 8 ? true : null}
          requiredChar={8}
          errorMessage="Invalid Employee ID"
          autofocus={true}
          width={350}
          name="Employee ID" type="text"
          validMessage="Employee ID is valid"/>
        <Input
          onChangeHandler={e => this.onChangeUsernameHandler(e, 2)}
          onKeyUp={this.onKeyUpUsernameHandler}
          isValid={this.state.usernameIsValid}
          requiredChar={8}
          errorMessage="Should be at least 8 characters"
          width={350}
          name="Username"
          type="text"
          validMessage="Username is valid"/>
        <Input
          onChangeHandler={e => this.onChangePasswordHandler(e, 2)}
          isValid={this.state.passwordsMatch}
          requiredChar={8}
          errorMessage="Should be at least 8 characters"
          width={350}
          name="Password"
          type="password"
          validMessage="Passwords match"/>
        <Input
          onChangeHandler={e => this.onChangeConfirmPasswordHandler(e)}
          onKeyUp={this.onKeyUpConfirmPassword}
          error={this.state.error}
          isValid={this.state.passwordsMatch}
          errorMessage="Passwords do not match"
          width={350}
          name="Confirm password"
          type="password"
          validMessage="Passwords match"/>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button onClick={() => console.log(this.state)} type="submit" width={120} name="Next" classNames={['primary', 'secondary']} />
        </div>
        <p className={styles.switchToLogIn}>Already have an account? Log in <Link to="login">here.</Link></p>
      </div>;
    return (
      <DocumentTitle title="Get started">
        <div className={styles.main}>
          <div className={styles.header}>
            <div>
              {
                this.props.location.pathname.includes('/login') ?
                  <p><strong>Log in</strong><br/>to enter <strong>PMS</strong></p> :
                  <p><strong>Create</strong><br/>an account</p>
              }
            </div>
          </div>
          <div className={styles.inside}>
            <Route path={`${this.props.match.path}/login`} render={() => login} />
            <Route path={`${this.props.match.path}/register`} render={() => register} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default Getstarted;
