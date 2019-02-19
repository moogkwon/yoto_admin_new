import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup
} from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NotificationActions from '../../redux/NotificationRedux'
import ModalConfirm from '../Modals/ModalConfirm'
import Pager from '../Pager'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

class Notifications extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModalDelete: false,
      search: props.query.search || '',
      notification: {}
    }
  }

  componentDidMount () {
    this.getNotifications(true)
  }

  getNotifications () {
    const query = this.props.query.asMutable({ deep: true })
    query.search = ''
    query.page = 1
    query.perPage = 10
    this.setState({ search: '' })
    this.props.getNotifications(query)
  }

  onClickDelete (notification) {
    this.setState({ notification }, () => this.refs.confirmDelete.toggle())
  }

  onPageChange (page) {
    const query = this.props.query.asMutable()
    query.page = page
    this.props.getNotifications(query)
  }

  onSearch () {
    const query = this.props.query.asMutable({ deep: true })
    query.search = this.state.search
    query.page = 1
    query.perPage = 10
    this.props.getNotifications(query)
  }

  renderRow (notification, index) {
    // const notificationLink = `/notifications/${notification._id}`
    const color = notification.status === 'sent' ? 'success' : 'secondary'
    const no = index + 1 + (this.props.query.page - 1) * this.props.query.perPage

    return (
      <tr key={notification._id}>
        <td>{no}</td>
        <td><strong>{notification.title}</strong></td>
        <td><strong>{notification.content}</strong></td>
        <td>{notification.user_ids.length ? notification.user_ids.length : 'Any' }</td>
        <td>{dayjs(notification.created_at).format('MM/DD HH:mm')}</td>
        <td>{notification.send_time ? dayjs(notification.send_time).format('MM/DD HH:mm') : 'N/A'}</td>
        <td>{notification.sent_count || 'N/A'}</td>
        <td><Badge color={color}>{notification.status}</Badge></td>
        <td>
          <Button
            className='btn btn-sm btn-brand btn-danger'
            onClick={() => this.onClickDelete(notification)}>
            <i className='icon-close icons d-block' />
          </Button>
        </td>
      </tr>
    )
  }

  render () {
    const notificationList = this.props.notifications

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <div>
                  <i className='fa fa-align-justify' /> Notifications
                </div>
              </CardHeader>
              <CardBody>
                <div className='form-inline mb-3'>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='fa fa-search' />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type='text'
                        placeholder='Search'
                        value={this.state.search}
                        onChange={e => this.setState({ search: e.target.value })}
                        onKeyPress={e => e.key === 'Enter' && this.onSearch()}
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className='ml-2'>
                    <Button onClick={() => this.getNotifications(true)}><i className='icon-refresh icons' /></Button>
                  </FormGroup>
                  <div className='flex-fill' />
                  <FormGroup>
                    <Link className='btn btn-primary btn-sm' to='/notifications/add'><i className='icon-plus icons' /></Link>
                  </FormGroup>
                </div>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope='col'>No</th>
                      <th scope='col'>Title</th>
                      <th scope='col'>Body</th>
                      <th scope='col'>Users</th>
                      <th scope='col'>Created</th>
                      <th scope='col'>Send time</th>
                      <th scope='col'>Sent count</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notificationList.map((notification, index) => this.renderRow(notification, index))}
                  </tbody>
                </Table>

                <Pager
                  totalItems={this.props.query.total}
                  pageSize={this.props.query.perPage}
                  activePage={this.props.query.page}
                  onSelect={page => this.onPageChange(page)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <ModalConfirm
          ref='confirmDelete'
          color='danger'
          action='Delete'
          message='Are you sure you want to delete notification?'
          onConfirm={() => this.props.deleteNotification(this.state.notification._id)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications,
    query: state.notification.query
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(NotificationActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
