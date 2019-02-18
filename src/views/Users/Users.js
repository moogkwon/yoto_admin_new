import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
import UserActions from '../../redux/UserRedux'
import ModalConfirm from '../ModalConfirm/ModalConfirm'
import Avatar from 'react-avatar'
import ModalVideoPlay from '../ModalVideoPlay/ModalVideoPlay'
import PaginationComponent from '../PaginationComponent/PaginationComponent'

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModalDelete: false,
      search: props.query.search || ''
    }
  }

  componentDidMount () {
    this.getUsers(true)
  }

  getUsers () {
    const query = this.props.query.asMutable({ deep: true })
    query.search = ''
    query.page = 1
    query.perPage = 10
    delete query.where.is_blocked
    this.setState({ search: '' })
    this.props.getUsers(query)
  }

  onClickDelete (user) {
    this.setState({ user }, () => this.refs.confirmDelete.toggle())
  }

  onClickBlock (user) {
    this.setState({ user }, () => this.refs.confirmBlock.toggle())
  }

  showUserVideo (user) {
    this.setState({ user }, () => this.refs.videoPlayer.toggle())
  }

  onPageChange (page) {
    const query = this.props.query.asMutable()
    query.page = page
    this.props.getUsers(query)
  }

  onChangeFilterBlock (value) {
    const query = this.props.query.asMutable({ deep: true })
    if (value === 'blocked') {
      query.where.is_blocked = true
    } else if (value === 'unblocked') {
      query.where.is_blocked = { $ne: true }
    } else {
      delete query.where.is_blocked
    }
    query.page = 1
    query.perPage = 10
    this.props.getUsers(query)
  }

  onSearch () {
    const query = this.props.query.asMutable({ deep: true })
    query.search = this.state.search
    query.page = 1
    query.perPage = 10
    this.props.getUsers(query)
  }

  renderRow (user) {
    const userLink = `/users/${user._id}`
    const status = user.is_blocked ? 'Blocked' : user.profile_rejected ? 'Rejected' : ''
    const color = user.is_blocked ? 'danger' : user.profile_rejected ? 'warning' : 'primary'

    return (
      <tr key={user._id}>
        <td><Link to={userLink}>{user._id.substring(20)}</Link></td>
        <td><Link to={userLink}><strong>{user.name}</strong></Link></td>
        <td>
          <Link to={userLink}>
            <Avatar
              size={30}
              round='15px'
              name={user.name}
              src={user.avatar_url}
            />
          </Link>
        </td>
        <td>
          {user.profile_photo_url
            ? (
              <Button style={{ padding: 0 }} onClick={() => this.showUserVideo(user)}>
                <Avatar
                  size={30}
                  src={user.profile_photo_url}
                />
              </Button>
            )
            : user.profile_video_url
              ? (
                <Button onClick={() => this.showUserVideo(user)}>
                  <i className='icon icon-control-play' />
                </Button>
              )
              : 'N/A'
          }
        </td>
        <td>{user.location_country || 'N/A'}</td>
        <td>{user.birth_year || 'N/A'}</td>
        <td>{user.gender || 'N/A'}</td>
        <td>{user.lgbtq && 'Y'}</td>
        <td><Badge color={color}>{status}</Badge></td>
        <td>
          {user.is_blocked
            ? <Button className='btn btn-sm btn-brand btn-success' onClick={() => this.props.unblockUser(user._id)}><i className='icon-action-undo icons d-block' /></Button>
            : <Button className='btn btn-sm btn-brand btn-warning' onClick={() => this.onClickBlock(user)}><i className='icon-shield icons d-block' /></Button>
          }
          <Button className='btn btn-sm btn-brand btn-danger ml-1' onClick={() => this.onClickDelete(user)}><i className='icon-close icons d-block' /></Button>
        </td>
      </tr>
    )
  }

  render () {
    const userList = this.props.users

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <div>
                  <i className='fa fa-align-justify' /> Users
                </div>
              </CardHeader>
              <CardBody>
                <div className='row ml-2'>
                  <FormGroup row>
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

                  <FormGroup className='ml-4'>
                    <Input
                      type='select'
                      className='form-control'
                      value={this.props.query.where.is_blocked === true ? 'blocked' : this.props.query.where.is_blocked !== undefined ? 'unblocked' : ''}
                      onChange={e => this.onChangeFilterBlock(e.target.value)}
                    >
                      <option value=''>{'-- All --'}</option>
                      <option value='blocked'>Blocked</option>
                      <option value='unblocked'>Unblocked</option>
                    </Input>
                  </FormGroup>

                  <FormGroup className='ml-2'>
                    <Button onClick={() => this.getUsers(true)}><i className='icon-refresh icons' /></Button>
                  </FormGroup>
                </div>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope='col'>ID</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Avatar</th>
                      <th scope='col'>Profile</th>
                      <th scope='col'>Country</th>
                      <th scope='col'>Born</th>
                      <th scope='col'>Gender</th>
                      <th scope='col'>LGBTQ</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) => this.renderRow(user, index))}
                  </tbody>
                </Table>

                <PaginationComponent
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
          message='Are you sure you want to delete user?'
          onConfirm={() => this.props.deleteUser(this.state.user._id)}
        />
        <ModalConfirm
          ref='confirmReject'
          color='warning'
          action='Reject'
          message="Are you sure you want to reject user's profile?"
          onConfirm={() => this.props.rejectProfile(this.state.user._id)}
        />
        <ModalConfirm
          ref='confirmBlock'
          color='warning'
          action='Block'
          message='Are you sure you want to block user?'
          onConfirm={() => this.props.blockUser(this.state.user._id)}
        />

        <ModalVideoPlay
          ref='videoPlayer'
          onReject={() => this.refs.confirmReject.toggle()}
          user={this.state.user}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    query: state.user.query
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
