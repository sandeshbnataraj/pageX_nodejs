import React from 'react'
import './login.scss';
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import isEmail from 'validator/lib/isEmail';

import {
  faAddressBook, faEnvelope, faLock, faUser, faPhone
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginView extends React.Component {
  constructor() {
    super()
    this.state = {
      dob: null, isLoginUserNameEmpty: false, isLoginPasswordEmpty: false,
      isSignUpFullNameEmpty: false, isSignUpEmailEmpty: false, isSignUpPaswordEmpty: false,
      isSignUpPhoneEmpty: false, isSignUpEmailInValid: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateOfBirth = this.handleDateOfBirth.bind(this)
    this.birthDate = null
  }
  handleDateOfBirth = (value) => {
    this.birthDate = value
    this.setState({ dob: moment(value).format("YYYY-MM-DD") })
    this.props.clearErrorBorders()
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.clearErrorBorders()
  };

  validateSignUpFormAndSubmit() {
    let isSignUpFullNameEmpty = true, isSignUpEmailEmpty = true, isSignUpPaswordEmpty = true,
      isSignUpPhoneEmpty = true, isSignUpEmailInValid = true;
    if (this.state.first_name && this.state.first_name.trim() !== "") {
      isSignUpFullNameEmpty = false;
    }
    if (this.state.email && this.state.email.trim() !== "") {
      isSignUpEmailEmpty = false;
      isSignUpEmailInValid = isEmail(this.state.email.trim());
    }
    if (this.state.password && this.state.password.trim() !== "") {
      isSignUpPaswordEmpty = false;
    }
    if (this.state.phone && this.state.phone.trim() !== "") {
      isSignUpPhoneEmpty = false;
    }

    if (isSignUpPhoneEmpty || isSignUpPaswordEmpty || isSignUpEmailEmpty || isSignUpFullNameEmpty || isSignUpEmailInValid) {
      this.setState({ isSignUpPhoneEmpty, isSignUpPaswordEmpty, isSignUpEmailEmpty, isSignUpFullNameEmpty, isSignUpEmailInValid });
    } else {
      this.setState({ isSignUpPhoneEmpty, isSignUpPaswordEmpty, isSignUpEmailEmpty, isSignUpFullNameEmpty, isSignUpEmailInValid });
      this.props.signup(this.state);
    }
  }

  validateLoginFormAndSubmit() {
    let isLoginUserNameEmpty = true, isLoginPasswordEmpty = true;
    if (this.state.email && this.state.email.trim() !== "") {
      isLoginUserNameEmpty = false;
    }
    if (this.state.password && this.state.password.trim() !== "") {
      isLoginPasswordEmpty = false;
    }
    if (isLoginPasswordEmpty || isLoginUserNameEmpty) {
      this.setState({ isLoginPasswordEmpty, isLoginUserNameEmpty });
    } else {
      this.setState({ isLoginPasswordEmpty, isLoginUserNameEmpty });
      this.props.login(this.state);
    }
  }

  render() {
    return (
      <div
        id='container'
        className={
          //click triggered showing the right panel active
          //else it shows the container
          this.props.signUpCondition
            ? 'slide-design-container slide-design-right-panel-active slide-design-sign-up-container'
            : 'slide-design-container'
        }
      >
        {this.props.signUpCondition ? <div className='slide-design-form-container slide-design-sign-up-container'>
          <form className='slide-design-form signupArea' action='#'>
            <h1 className='slide-design-header mb-5'>Create Account</h1>
            {
              this.props.message
              && (
                <span className='slide-design-a' style={{ color: 'red' }}>{this.props.message}</span>
              )
            }

            <div className={this.props.signUpFailed ? 'input-group login-failed-border mt-3' : 'input-group mt-3'}>
              <div className="input-group-prepend">
                <span className="input-group-text"> <FontAwesomeIcon
                  icon={faAddressBook}
                /></span>
              </div>

              <input
                name='first_name'
                className="form-control"
                type='text'
                placeholder='Full name'
                onChange={this.handleChange}
              />
            </div>
            {this.state.isSignUpFullNameEmpty && <div className="alert text-danger w-100 text-left m-0 p-0">

              <i className="fa fa-warning"></i > Full name is required</div>}

            <div className={this.props.signUpFailed ? 'input-group login-failed-border mt-3' : 'input-group mt-3'}>
              <div className="input-group-prepend">
                <span className="input-group-text"><FontAwesomeIcon
                  icon={faEnvelope}
                /></span>
              </div>

              <input
                name='email'
                className={this.props.signUpFailed ? 'form-control login-failed-border' : 'form-control'}
                type='email'
                placeholder='Email'
                onChange={this.handleChange}
              />
            </div>

            {this.state.isSignUpEmailEmpty && <div className="alert text-danger w-100 text-left m-0 p-0">
              <i className="fa fa-warning"></i > Email is required</div>}
            {this.state.isSignUpEmailInValid && !this.state.isSignUpEmailEmpty && <div className="alert text-danger w-100 text-left m-0 p-0">
              <i className="fa fa-warning"></i > Email is invalid</div>}


            <div className={this.props.signUpFailed ? 'input-group login-failed-border mt-3' : 'input-group mt-3'}>
              <div className="input-group-prepend">
                <span className="input-group-text"><FontAwesomeIcon
                  icon={faLock}
                /></span>
              </div>

              <input
                name='password'
                className="form-control"
                type='password'
                placeholder='Password'
                onChange={this.handleChange}
              />
            </div>
            {this.state.isSignUpPaswordEmpty && <div className="alert text-danger w-100 text-left m-0 p-0">
              <i className="fa fa-warning"></i > Password is required</div>}

            <div className={this.props.signUpFailed ? 'input-group login-failed-border mt-3' : 'input-group mt-3'}>
              <div className="input-group-prepend">
                <span className="input-group-text"><FontAwesomeIcon
                  icon={faPhone}
                /></span>
              </div>

              <input
                name='phone'
                className="form-control"
                type="text"
                placeholder="Phone"
                onChange={this.handleChange}
              />
            </div>
            {this.state.isSignUpPhoneEmpty && <div className="alert text-danger w-100 text-left m-0 p-0">
              <i className="fa fa-warning"></i > Phone is required</div>}


            <button
              className='btn btn-block btn-lg btn-primary mt-2 btnLogin'
              onClick={(e) => { e.preventDefault(); this.validateSignUpFormAndSubmit() }}
            >
              Sign up
                </button>

            {this.props.signUpFailed && <div className="alert text-danger w-100 text-left m-0 p-0"><i className="fa fa-warning"></i > Sign up error! Try again</div>}

            <p className="mt-5">Already have an account? </p>
            <button
              className='btnSignUpNow mt-2'
              onClick={(e) => { e.preventDefault(); this.props.handleSignUpCondition() }}
            >
              Login now!
                  </button>
          </form>
        </div> :
          <div className='slide-design-form-container slide-design-sign-in-container'>
            <form className='slide-design-form loginArea'>

              {
                this.props.message
                  ? (
                    <h1 className='slide-design-header mb-5'>{this.props.message}</h1>
                  )
                  : (
                    <h1 className='slide-design-header mb-5'>Sign in</h1>
                  )
              }
              <div className={this.props.login_failed ? 'input-group login-failed-border' : 'input-group'}>
                <div className="input-group-prepend">
                  <span className="input-group-text"><FontAwesomeIcon
                    icon={faUser}
                  /></span>
                </div>

                <input
                  className="form-control"
                  name='email'
                  type='email'
                  id='email'
                  placeholder='Username'
                  onChange={this.handleChange}
                />
              </div>
              {this.state.isLoginUserNameEmpty && <div className="alert text-danger w-100 text-left m-0 p-0"><i className="fa fa-warning"></i > Username is required</div>}

              <div className={this.props.login_failed ? 'input-group login-failed-border mt-3' : 'input-group mt-3'}>
                <div className="input-group-prepend">
                  <span className="input-group-text"><FontAwesomeIcon
                    icon={faLock}
                  /></span>
                </div>
                <input
                  className="form-control"
                  name='password'
                  type='password'
                  id='password'
                  placeholder='Password'
                  onChange={this.handleChange}
                />
              </div>
              {this.state.isLoginPasswordEmpty && <div className="alert text-danger w-100 text-left m-0 p-0"><i className="fa fa-warning"></i > Password is required</div>}

              <button
                className='btn btn-block btn-lg btn-primary mt-3 btnLogin'
                onClick={(e) => { e.preventDefault(); this.validateLoginFormAndSubmit() }}
              >
                Login
                </button>

              {this.props.login_failed && <span className="alert text-danger w-100 text-left m-0 p-0"><i className="fa fa-warning"></i > Invalid credentials</span>}
              <a className='mt-2 forgotPassword' href='#'>Forgot your password?</a>
              <p className="mt-5">Don't have an account? </p>
              <button
                className='btnSignUpNow mt-2'
                onClick={(e) => { e.preventDefault(); this.props.handleSignUpCondition() }}
              >
                Sign up now!
                  </button>
            </form>
          </div>}
        <div className='slide-design-overlay-container'>
          <div className='slide-design-overlay'>
            <div className='slide-design-overlay-panel slide-design-overlay-left'>
              {/* <h1 className='slide-design-white slide-design-right slide-design-header'>
                Welcome Back!
                  </h1>
              <p className='slide-design-right slide-design-p'>
                To keep connected with us please login with your personal info
                  </p>
              <button
                id='signIn'
                className='slide-design-button slide-design-button-ghost slide-design-right'
                onClick={this.props.handleSignUpCondition}
              >
                Sign In
                  </button> */}
            </div>
            <div className='slide-design-overlay-panel slide-design-overlay-right'>
              {/* <h1 className='slide-design-header slide-design-white slide-design-move'>
                Hello, Friend!
                  </h1>
              <p className='slide-design-move slide-design-p'>
                Enter your personal details and start journey with us
                  </p>

              <button
                className='slide-design-button slide-design-button-ghost slide-design-move'
                id='signUp'
                onClick={this.props.handleSignUpCondition}
              >
                Sign Up
                  </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginView