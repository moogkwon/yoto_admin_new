import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormGroup
} from 'reactstrap'
import Validator from 'validatorjs'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AuthActions from '../../../redux/AuthRedux'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        email: '',
        password: ''
      }
    }
  }

  formSubmit () {
    let rules = {
      email: 'required',
      password: 'required'
    }
    let validation = new Validator(this.state.data, rules)
    if (validation.fails()) {
      this.setState({ errors: validation.errors })
      return false
    } else {
      this.setState({ errors: null })
      this.props.login(this.state.data)
    }
  }

  render () {
    return (
      <div className='app flex-row align-items-center'>
        <Container>
          <Row className='justify-content-center'>
            <Col md='6'>
              <CardGroup>
                <Card className='p-6'>
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className='text-muted'>Sign In to your account</p>
                      <FormGroup className='mb-3'>
                        <InputGroup>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='icon-user' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type='text'
                            placeholder='Email'
                            autoComplete='email'
                            value={this.state.data.email}
                            onChange={event => this.setState({ data: { ...this.state.data, email: event.target.value } })}
                            className={classNames({ 'is-invalid': this.state.errors && this.state.errors.has('email') })}
                          />
                          {this.state.errors && this.state.errors.has('email') && (
                            <div className='invalid-feedback'>{this.state.errors.first('email')}</div>
                          )}
                        </InputGroup>
                      </FormGroup>
                      <InputGroup className='mb-4'>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='icon-lock' />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type='password'
                          placeholder='Password'
                          autoComplete='current-password'
                          value={this.state.data.password}
                          onChange={event => this.setState({ data: { ...this.state.data, password: event.target.value } })}
                          className={classNames({ 'is-invalid': this.state.errors && this.state.errors.has('password') })}
                        />
                        {this.state.errors && this.state.errors.has('password') && (
                          <div className='invalid-feedback'>{this.state.errors.first('password')}</div>
                        )}
                      </InputGroup>
                      <Row>
                        <Col xs='6'>
                          <Button color='primary' className='px-4' onClick={() => this.formSubmit()}>Login</Button>
                        </Col>
                        <Col xs='6' className='text-right'>
                          <Button color='link' className='px-0'>Forgot password?</Button>
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
        </Container>
      </div>
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
