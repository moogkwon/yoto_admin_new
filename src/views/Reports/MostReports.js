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
import ReportActions from '../../redux/ReportRedux'
import ModalConfirm from '../Modals/ModalConfirm'
import Avatar from 'react-avatar'
import ModalVideoPlay from '../Modals/ModalVideoPlay'
import Pager from '../Pager'

class MostReport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModalDelete: false,
      search: props.mostQuery.search || ''
    }
  }

  componentDidMount () {
    this.getMostReports(true)
  }

  getMostReports () {
    const mostQuery = this.props.mostQuery.asMutable({ deep: true })
    mostQuery.search = ''
    mostQuery.page = 1
    mostQuery.perPage = 10
    mostQuery.where.is_blocked = { $ne: true }
    mostQuery.where.reported_count = { $gt: 0 }
    this.setState({ search: '' })
    this.props.getMostReports(mostQuery)
  }

  onClickBlock (user) {
    this.setState({ user }, () => this.refs.confirmBlock.toggle())
  }

  onPageChange (page) {
    const mostQuery = this.props.mostQuery.asMutable()
    mostQuery.page = page
    this.props.getMostReports(mostQuery)
  }

  onSearch () {
    const mostQuery = this.props.mostQuery.asMutable({ deep: true })
    mostQuery.search = this.state.search
    mostQuery.page = 1
    mostQuery.perPage = 10
    this.props.getMostReports(mostQuery)
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
        <td>{user.reported_count}</td>
        <td>{user.reported_nude}</td>
        <td>{user.reported_mean}</td>
        <td>{user.reported_inappropriate}</td>
        <td>{user.reported_other}</td>
        <td><Badge color={color}>{status}</Badge></td>
        <td>
          <Button className='btn btn-sm btn-brand btn-warning' onClick={() => this.onClickBlock(user)}><i className='icon-shield icons d-block' /></Button>
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
                  <i className='fa fa-align-justify' /> Most reported users
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
                    <Button onClick={() => this.getMostReports(true)}><i className='icon-refresh icons' /></Button>
                  </FormGroup>
                </div>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope='col'>ID</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Avatar</th>
                      <th scope='col'>Reported</th>
                      <th scope='col'>Nude</th>
                      <th scope='col'>Mean</th>
                      <th scope='col'>Inappropriate</th>
                      <th scope='col'>Other</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) => this.renderRow(user, index))}
                  </tbody>
                </Table>

                <Pager
                  totalItems={this.props.mostQuery.total}
                  pageSize={this.props.mostQuery.perPage}
                  activePage={this.props.mostQuery.page}
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
    users: state.report.mostReports,
    mostQuery: state.report.mostQuery
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(ReportActions, dispatch),
    ...bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MostReport)
