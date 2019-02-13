import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserActions from '../../redux/UserRedux'

import usersData from './UsersData'

function UserRow (props) {
  const user = props.user
  const userLink = `/users/${user._id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success'
      : status === 'Inactive' ? 'secondary'
        : status === 'Pending' ? 'warning'
          : status === 'Banned' ? 'danger'
            : 'primary'
  }

  return (
    <tr key={user._id}>
      <th scope='row'><Link to={userLink}>{user._id.substring(20)}</Link></th>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.country}</td>
      <td>{user.birth_year}</td>
      <td>{user.gender}</td>
      <td>{user.lgbtq}</td>
      <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
    </tr>
  )
}

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {}
    }
  }

  componentDidMount () {
    this.getUsers()
  }

  getUsers () {
    const query = this.state.query
    this.props.getUsers(query)
  }

  render () {
    const userList = this.props.users

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <div class='d-flex justify-content-between'>
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
                      <th scope='col'>Photo/video</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Country</th>
                      <th scope='col'>Birth</th>
                      <th scope='col'>Gender</th>
                      <th scope='col'>LGBTQ</th>
                      <th scope='col'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user} />
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
