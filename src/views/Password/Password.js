import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap'
import Validator from 'validatorjs/dist/validator'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AuthActions from '../../redux/AuthRedux'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        password: '',
        new_password: '',
        new_password_confirmation: ''
      }
    }
  }

  formSubmit () {
    let rules = {
      password: 'required',
      new_password: 'required|confirmed'
    }
    let validation = new Validator(this.state.data, rules)
    if (validation.fails()) {
      this.setState({ errors: validation.errors })
      return false
    } else {
      this.setState({ errors: null })
      this.props.changePassword(this.state.data)
    }
  }

  render () {
    return (
      <Row className='justify-content-center'>
        <Col md='6'>
          <CardGroup>
            <Card className='p-6'>
              <CardBody>
                <Form>
                  <h1>Change password</h1>
                  <InputGroup className='mb-4'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='icon-lock' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      ref='password'
                      type='password'
                      placeholder='Current Password'
                      autoComplete='current-password'
                      value={this.state.data.password}
                      onChange={event => this.setState({ data: { ...this.state.data, password: event.target.value } })}
                      className={classNames({ 'is-invalid': this.state.errors && this.state.errors.has('password') })}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                        }
                      }}
                    />
                    {this.state.errors && this.state.errors.has('password') && (
                      <div className='invalid-feedback'>{this.state.errors.first('password')}</div>
                    )}
                  </InputGroup>

                  <InputGroup className='mb-4'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='icon-lock' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      ref='new_password'
                      type='password'
                      placeholder='New Password'
                      autoComplete='new-password'
                      value={this.state.data.new_password}
                      onChange={event => this.setState({ data: { ...this.state.data, new_password: event.target.value } })}
                      className={classNames({ 'is-invalid': this.state.errors && this.state.errors.has('new_password') })}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                        }
                      }}
                    />
                    {this.state.errors && this.state.errors.has('new_password') && (
                      <div className='invalid-feedback'>{this.state.errors.first('new_password')}</div>
                    )}
                  </InputGroup>

                  <InputGroup className='mb-4'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='icon-lock' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      ref='password'
                      type='password'
                      placeholder='Confirm new Password'
                      autoComplete='new-password-confirmation'
                      value={this.state.data.new_password_confirmation}
                      onChange={event => this.setState({ data: { ...this.state.data, new_password_confirmation: event.target.value } })}
                      className={classNames({ 'is-invalid': this.state.errors && this.state.errors.has('new_password_confirmation') })}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                        }
                      }}
                    />
                    {this.state.errors && this.state.errors.has('new_password_confirmation') && (
                      <div className='invalid-feedback'>{this.state.errors.first('new_password_confirmation')}</div>
                    )}
                  </InputGroup>
                  <Row>
                    <Col xs='6'>
                      <Button color='primary' className='px-4' onClick={() => this.formSubmit()}>Change password</Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            {/* <Card className='text-white bg-primary py-5 d-md-down-none' style={{ width: '44%' }}>
                  <CardBody className='text-center'>
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to='/register'>
                        <Button color='primary' className='mt-3' active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
          </CardGroup>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
