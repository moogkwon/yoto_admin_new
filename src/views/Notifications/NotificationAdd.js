import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Input,
  FormGroup,
  CardGroup,
  Form,
  CardHeader,
  Label,
  Table,
  Badge
} from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NotificationActions from '../../redux/NotificationRedux'
import UserActions from '../../redux/UserRedux'
import Validator from 'validatorjs/dist/validator'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import countryList from 'react-select-country-list'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import Avatar from 'react-avatar'
import union from 'lodash/union'
import filter from 'lodash/filter'
import map from 'lodash/map'

class NotificationAdd extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notification: {
        title: '',
        content: '',
        send_time: null,
        activity: '',
        country: '',
        gender: '',
        lgbtq: '',
        birth_year_min: '',
        birth_year_max: '',
        user_ids: []
      },
      countries: countryList().getData(),
      isShowUsers: false,
      isCheckAll: false
    }
  }

  componentDidMount () {
    this.getUserCount()
  }

  toggle () {
    this.setState(state => ({ isShowModal: !state.isShowModal }))
  }

  formSubmit () {
    let rules = {
      title: 'required',
      content: 'required'
    }
    const notification = this.state.notification
    let validation = new Validator(notification, rules)
    if (validation.fails()) {
      this.setState({ errors: validation.errors })
      return false
    } else {
      this.setState({ errors: null })
      this.props.createNotification(notification)
    }
  }

  getUserCount () {
    const query = this.getQuery()
    this.props.getUserCount(query)
    this.state.isShowUsers && this.props.getUsers(query)
  }

  getQuery () {
    const notification = this.state.notification
    const query = {
      where: {
        is_admin: { $ne: true }
      },
      page: 1,
      perPage: 1000
    }
    if (notification.activity === 'online') {
      query.where.is_online = true
    } else if (notification.activity === 'offline') {
      query.where.is_online = { $ne: true }
    }
    if (notification.country) {
      query.where.location_country_code = notification.country
    }
    if (notification.gender) {
      query.where.gender = notification.gender
    }
    if (notification.lgbtq) {
      query.where.lgbtq = notification.lgbtq
    }
    if (notification.birth_year_min && notification.birth_year_max) {
      query.where.$and = [
        { birth_year: { $gte: Number(notification.birth_year_min) } },
        { birth_year: { $lte: Number(notification.birth_year_max) } }
      ]
    } else if (notification.birth_year_min) {
      query.where.birth_year = { $gte: Number(notification.birth_year_min) }
    } else if (notification.birth_year_max) {
      query.where.birth_year = { $lte: Number(notification.birth_year_max) }
    }
    return query
  }

  getUsers () {
    const query = this.getQuery()
    this.props.getUsers(query)
  }

  onCheckboxChange (id, checked) {
    const notification = this.state.notification
    if (checked) {
      notification.user_ids = union(notification.user_ids, [id])
    } else {
      notification.user_ids = filter(notification.user_ids, uid => uid !== id)
    }
    const isCheckAll = notification.user_ids.length === this.props.users.length
    this.setState({ notification, isCheckAll })
  }

  checkAll (isCheckAll) {
    const notification = this.state.notification
    if (isCheckAll) {
      notification.user_ids = map(this.props.users, '_id')
    } else {
      notification.user_ids = []
    }
    this.setState({ notification, isCheckAll })
  }

  renderRow (user) {
    const status = user.is_blocked ? 'Blocked' : user.profile_rejected ? 'Rejected' : ''
    const color = user.is_blocked ? 'danger' : user.profile_rejected ? 'warning' : 'primary'

    return (
      <tr key={user._id}>
        <td>
          <FormGroup check inline>
            <Input
              className='form-check-input'
              type='checkbox'
              id={`checkbox_${user._id}`}
              name={`checkbox_${user._id}`}
              value='1'
              checked={this.state.notification.user_ids.includes(user._id)}
              onChange={event => this.onCheckboxChange(user._id, event.target.checked)}
            />
          </FormGroup>
        </td>
        <td>{user._id.substring(20)}</td>
        <td><strong>{user.name}</strong></td>
        <td>
          <Avatar
            size={30}
            round='15px'
            name={user.name}
            src={user.avatar_url || ''}
          />
        </td>
        <td>{user.location_country || 'N/A'}</td>
        <td>{user.birth_year || 'N/A'}</td>
        <td>{user.gender || 'N/A'}</td>
        <td>{user.lgbtq && 'Y'}</td>
        <td><Badge color={color}>{status}</Badge></td>
      </tr>
    )
  }

  render () {
    const notification = this.state.notification

    return (
      <div className='animated fadeIn'>
        <Row className=''>
          <Col md='12'>
            <CardGroup>
              <Card className='p-6 mb-3'>
                <CardHeader>
                  <div>
                    <i className='icon-plus icon' /> New notification
                  </div>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md='6'>
                        <h3 className='text-muted'>Notification info</h3>
                        <FormGroup className='mb-3'>
                          <Label htmlFor='title'>Title</Label>
                          <Input
                            type='text'
                            id='title'
                            placeholder='Title'
                            autoComplete='title'
                            value={notification.title}
                            onChange={event => this.setState({ notification: { ...notification, title: event.target.value } })}
                            className={classNames({ 'is-invalid': this.state.errors && this.state.errors.has('title') })}
                            onKeyPress={e => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                this.refs.content.focus()
                              }
                            }}
                          />
                          {this.state.errors && this.state.errors.has('title') && (
                            <div className='invalid-feedback'>{this.state.errors.first('title')}</div>
                          )}
                        </FormGroup>
                        <FormGroup className='mb-3'>
                          <Label htmlFor='content'>Content</Label>
                          <Input
                            ref='content'
                            id='content'
                            type='textarea'
                            placeholder='Content'
                            autoComplete='content'
                            value={notification.content}
                            onChange={event => this.setState({ notification: { ...notification, content: event.target.value } })}
                            className={classNames({ 'is-invalid': this.state.errors && this.state.errors.has('content') })}
                            onKeyPress={e => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                this.formSubmit()
                              }
                            }}
                          />
                          {this.state.errors && this.state.errors.has('content') && (
                            <div className='invalid-feedback'>{this.state.errors.first('content')}</div>
                          )}
                        </FormGroup>
                        <FormGroup className='mb-3'>
                          <Label htmlFor='send_time'>Schedule (leave empty to send immediately)</Label>
                          <div className='full-width'>
                            <DatePicker
                              id='send_time'
                              selected={notification.send_time}
                              onChange={date => this.setState({ notification: { ...notification, send_time: date } }, () => this.getUserCount())}
                              showTimeSelect
                              timeFormat='HH:mm'
                              timeIntervals={15}
                              dateFormat='MM/dd/yyyy HH:mm'
                              minDate={dayjs().toDate()}
                              maxDate={dayjs().add(1, 'year').toDate()}
                              timeCaption='time'
                              placeholderText='Send time'
                              className='form-control'
                            />
                          </div>
                          {this.state.errors && this.state.errors.has('send_time') && (
                            <div className='invalid-feedback'>{this.state.errors.first('send_time')}</div>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md='6'>
                        <h3 className='text-muted'>Filter</h3>
                        <Row>
                          <Col md='6'>
                            <FormGroup className='mb-3'>
                              <Label htmlFor='activity'>Activity</Label>
                              <Input
                                type='select'
                                id='activity'
                                className='form-control'
                                value={notification.activity}
                                onChange={event => this.setState({ notification: { ...notification, activity: event.target.value } }, () => this.getUserCount())}
                              >
                                <option value=''>{'-- All --'}</option>
                                <option value='online'>Online</option>
                                <option value='offline'>Offline</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md='6'>
                            <FormGroup className='mb-3'>
                              <Label htmlFor='country'>Country</Label>
                              <Input
                                type='select'
                                id='country'
                                className='form-control'
                                value={notification.country}
                                onChange={event => this.setState({ notification: { ...notification, country: event.target.value } }, () => this.getUserCount())}
                              >
                                <option value=''>{'-- All --'}</option>
                                {this.state.countries.map(country => (
                                  <option key={country.value} value={country.value}>{country.label}</option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md='6'>
                            <FormGroup className='mb-3'>
                              <Label htmlFor='gender'>Gender</Label>
                              <Input
                                type='select'
                                id='gender'
                                className='form-control'
                                value={notification.gender}
                                onChange={event => this.setState({ notification: { ...notification, gender: event.target.value } }, () => this.getUserCount())}
                              >
                                <option value=''>{'-- All --'}</option>
                                <option value='female'>Female</option>
                                <option value='male'>Male</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md='6'>
                            <FormGroup className='mb-3'>
                              <Label htmlFor='lgbtq'>LGBTQ</Label>
                              <Input
                                type='select'
                                id='lgbtq'
                                className='form-control'
                                value={notification.lgbtq}
                                onChange={event => this.setState({ notification: { ...notification, lgbtq: event.target.value } }, () => this.getUserCount())}
                              >
                                <option value=''>{'-- All --'}</option>
                                <option value='yes'>Yes</option>
                                <option value='no'>No</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md='6'>
                            <FormGroup className='mb-3'>
                              <Label htmlFor='gender'>Born from</Label>
                              <Input
                                type='number'
                                min='1900'
                                max='2020'
                                placeholder='Born from'
                                value={notification.birth_year_min}
                                onChange={event => this.setState({ notification: { ...notification, birth_year_min: event.target.value } }, () => this.getUserCount())}
                                className={classNames({ 'is-invalid': this.state.errors && this.state.errors.has('birth_year_min') })}
                                onKeyPress={e => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault()
                                  }
                                }}
                              />
                              {this.state.errors && this.state.errors.has('birth_year_min') && (
                                <div className='invalid-feedback'>{this.state.errors.first('birth_year_min')}</div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md='6'>
                            <FormGroup className='mb-3'>
                              <Label htmlFor='gender'>Born to</Label>
                              <Input
                                type='number'
                                min='1900'
                                max='2020'
                                placeholder='Born from'
                                value={notification.birth_year_max}
                                onChange={event => this.setState({ notification: { ...notification, birth_year_max: event.target.value } }, () => this.getUserCount())}
                                className={classNames({ 'is-invalid': this.state.errors && this.state.errors.has('birth_year_max') })}
                                onKeyPress={e => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault()
                                  }
                                }}
                              />
                              {this.state.errors && this.state.errors.has('birth_year_max') && (
                                <div className='invalid-feedback'>{this.state.errors.first('birth_year_max')}</div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <hr />
                    {/* <Input
                      type='text'
                      placeholder='Search name'
                      autoComplete='name'
                      value={notification.search}
                      onChange={event => this.setState({ notification: { ...notification, search: event.target.value } })}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                        }
                      }}
                    /> */}
                    {this.state.isShowUsers && (
                      <Row className='mt-3'>
                        <Col md='12'>
                          <Table responsive hover>
                            <thead>
                              <tr>
                                <th scope='col'>
                                  <FormGroup check inline>
                                    <Input
                                      className='form-check-input'
                                      type='checkbox'
                                      id='checkboxAll'
                                      name='checkboxAll'
                                      value='1'
                                      checked={this.state.isCheckAll}
                                      onChange={event => this.checkAll(event.target.checked)}
                                    />
                                  </FormGroup>
                                </th>
                                <th scope='col'>ID</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Avatar</th>
                                <th scope='col'>Country</th>
                                <th scope='col'>Born</th>
                                <th scope='col'>Gender</th>
                                <th scope='col'>LGBTQ</th>
                                <th scope='col'>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.users.map((user, index) => this.renderRow(user, index))}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    )}
                    <Row className='mt-3'>
                      <Col md='6'>
                        <Button color='link' onClick={() => this.setState({ isShowUsers: true }, () => this.getUsers())}>{this.props.userCount || 0} user available</Button>
                      </Col>
                      <Col md='6' className='text-right'>
                        <Button color='primary' onClick={() => this.formSubmit()}>Send</Button>
                        <Link color='secondary' className='ml-2' to='/notifications'>Cancel</Link>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userCount: state.user.userCount,
    users: state.user.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(NotificationActions, dispatch),
    ...bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationAdd)
