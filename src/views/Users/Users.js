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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserActions from '../../redux/UserRedux'
import ModalConfirm from '../ModalConfirm/ModalConfirm'

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModalDelete: false
    }
  }

  componentDidMount () {
    this.getUsers()
  }

  getUsers () {
    const query = this.state.query
    this.props.getUsers(query)
  }

  onClickDelete (user) {
    this.setState({ user }, () => this.refs.confirmDelete.toggle())
  }

  onClickReject (user) {
    this.setState({ user }, () => this.refs.confirmReject.toggle())
  }

  onClickBlock (user) {
    this.setState({ user }, () => this.refs.confirmBlock.toggle())
  }

  renderRow (user) {
    const userLink = `/users/${user._id}`
    const status = user.is_blocked ? 'Blocked' : user.profile_rejected ? 'Rejected' : ''
    const color = user.is_blocked ? 'danger' : user.profile_rejected ? 'warning' : 'primary'

    return (
      <tr key={user._id}>
        <th scope='row'><Link to={userLink}>{user._id.substring(20)}</Link></th>
        <td><Link to={userLink}>{user.first_name} {user.last_name}</Link></td>
        <td><Link to={userLink}>{user.first_name} {user.last_name}</Link></td>
        <td>{user.country || 'N/A'}</td>
        <td>{user.birth_year || 'N/A'}</td>
        <td>{user.gender || 'N/A'}</td>
        <td>{user.lgbtq && 'Y'}</td>
        <td><Badge color={color}>{status}</Badge></td>
        <td>
          {user.is_blocked
            ? <Button className='btn btn-sm btn-success' onClick={() => this.props.unblockUser(user._id)}>Unlock</Button>
            : <Button className='btn btn-sm btn-warning' onClick={() => this.onClickBlock(user)}>Block</Button>
          }
          <Button className='btn btn-sm btn-danger ml-1' onClick={() => this.onClickDelete(user)}>Delete</Button>
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
                <div className='d-flex justify-content-between'>
                  <div>
                    <i className='fa fa-align-justify' /> Users
                  </div>
                  <Button color='link' onClick={() => this.getUsers()}><i className='icon-refresh icons' /></Button>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope='col'>ID</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Photo/video</th>
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
          message="Are you sure you want to reject user\'s profile?"
          onConfirm={() => this.props.rejectProfile(this.state.user._id)}
        />
        <ModalConfirm
          ref='confirmBlock'
          color='warning'
          action='Block'
          message='Are you sure you want to block user?'
          onConfirm={() => this.props.blockUser(this.state.user._id)}
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
