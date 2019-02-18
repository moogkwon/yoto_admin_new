import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Badge } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserActions from '../../redux/UserRedux'
import ModalConfirm from '../ModalConfirm'
// import Avatar from 'react-avatar'
import Loading from '../Loading'
// import { Redirect } from 'react-router-dom'
import ModalVideoPlay from '../ModalVideoPlay'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

class User extends Component {
  componentWillMount () {
    this.props.getUser(this.props.match.params.id)
  }

  componentDidUpdate (prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getUser(this.props.match.params.id)
    }
  }

  render () {
    const { user, fetching } = this.props
    if (fetching || !user) return <Loading />
    // if (!user) return <Redirect to='/404' />
    const status = user.is_blocked ? 'Blocked' : user.profile_rejected ? 'Rejected' : '---'
    const color = user.is_blocked ? 'danger' : user.profile_rejected ? 'warning' : 'primary'

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col lg={8}>
            <Card>
              <CardHeader>
                <strong><i className='icon-info pr-1' />Personal information</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={4}>
                    <img src={user.avatar_url} className='img-fluid img-thumbnail' alt='Avatar' />
                    {user.profile_photo_url
                      ? (
                        <Button onClick={() => this.refs.videoPlayer.toggle()} className='mt-1' style={{ padding: 0 }}>
                          <img src={user.profile_photo_url} className='img-fluid img-thumbnail' alt='Profile' />
                        </Button>
                      )
                      : user.profile_video_url
                        ? (
                          <Button onClick={() => this.refs.videoPlayer.toggle()} className='mt-1'>
                            <i className='icon icon-control-play' />
                          </Button>
                        )
                        : <div className='text-info'>No video/photo profile</div>
                    }
                  </Col>
                  <Col lg={8}>
                    <h5 className='text-info mt-1'>{user.name}</h5>
                    <Table responsive>
                      <tbody>
                        <tr>
                          <th className='text-right'>Instagram</th>
                          <td>{user.instagram}</td>
                        </tr>
                        <tr>
                          <th className='text-right'>Gender</th>
                          <td>{user.gender}</td>
                        </tr>
                        <tr>
                          <th className='text-right'>LGBTQ</th>
                          <td>{user.lgbtq ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                          <th className='text-right'>Born</th>
                          <td>{user.birth_year}</td>
                        </tr>
                        <tr>
                          <th className='text-right'>Location</th>
                          <td>{user.location_city}, {user.location_state}, {user.location_country}</td>
                        </tr>
                        <tr>
                          <th className='text-right'>Status</th>
                          <td><Badge color={color}>{status}</Badge></td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className='text-right'>
                      {user.is_blocked
                        ? <Button color='warning' className='mr-2' onClick={() => this.props.unblockUser(this.props.user._id)}>Unblock</Button>
                        : <Button color='warning' className='mr-2' onClick={() => this.refs.confirmBlock.toggle()}>Block</Button>
                      }
                      <Button color='danger' className='mr-2' onClick={() => this.refs.confirmDelete.toggle()}>Delete</Button>
                      <Link to='/users' className='btn-link'>Back</Link>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <CardHeader>
                <strong><i className='icon-list pr-1' />Summary</strong>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <tbody>
                    <tr>
                      <th className='text-right'>Registered</th>
                      <td>{dayjs(user.created_at).format('MM/DD/YYYY')}</td>
                    </tr>
                    <tr>
                      <th className='text-right'>Meet count</th>
                      <td>{user.conversation_count || 0}</td>
                    </tr>
                    <tr>
                      <th className='text-right'>Call time</th>
                      <td>{user.call_time || 0}</td>
                    </tr>
                    <tr>
                      <th className='text-right'>Subscription</th>
                      <td>{user.subscription || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th className='text-right'>Report count</th>
                      <td><div className='text-warning'>{user.report_count || 'N/A'}</div></td>
                    </tr>
                    <tr>
                      <th className='text-right'>Reported count</th>
                      <td><div className='text-danger'>{user.reported_count || 'N/A'}</div></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col xs={12}>
            <Card>
              <CardHeader>
                <strong><i className='icon-dislike pr-1' />Be Reported</strong>
              </CardHeader>
              <CardBody>
                {(!user.reporteds || !user.reporteds.length) && <h4>No report</h4>}
                <Row>
                  {user.reporteds.map(report => (
                    <Col lg={3} md={4} key={report._id}>
                      <img src={report.file_url} className='img-fluid img-thumbnail mb-3' alt='Avatar' />
                      <Table responsive>
                        <tbody>
                          <tr>
                            <th className='text-right'>Reporter</th>
                            <td><Link to={`/users/${report.user._id}`}>{report.user.name}</Link></td>
                          </tr>
                          <tr>
                            <th className='text-right'>Reason</th>
                            <td>{report.reason}</td>
                          </tr>
                          <tr>
                            <th className='text-right'>Time</th>
                            <td>{dayjs(report.created_at).format('MM/DD/YYYY HH:mm')}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  ))}
                </Row>

              </CardBody>
            </Card>
          </Col>

          <Col xs={12}>
            <Card>
              <CardHeader>
                <strong><i className='icon-shield pr-1' />Reports</strong>
              </CardHeader>
              <CardBody>
                {(!user.reports || !user.reports.length) && <h4>No report</h4>}
                <Row>
                  {user.reports.map(report => (
                    <Col lg={3} md={4} key={report._id}>
                      <img src={report.file_url} className='img-fluid img-thumbnail mb-3' alt='Avatar' />
                      <Table responsive>
                        <tbody>
                          <tr>
                            <th className='text-right'>Reportee</th>
                            <td><Link to={`/users/${report.reportee_id}`}>{report.reportee.name}</Link></td>
                          </tr>
                          <tr>
                            <th className='text-right'>Reason</th>
                            <td>{report.reason}</td>
                          </tr>
                          <tr>
                            <th className='text-right'>Time</th>
                            <td>{dayjs(report.created_at).format('MM/DD/YYYY HH:mm')}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  ))}
                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>

        <ModalVideoPlay
          ref='videoPlayer'
          onReject={() => this.refs.confirmReject.toggle()}
          user={this.props.user}
        />

        <ModalConfirm
          ref='confirmDelete'
          color='danger'
          action='Delete'
          message='Are you sure you want to delete user?'
          onConfirm={() => this.props.deleteUser(this.props.user._id)}
        />
        <ModalConfirm
          ref='confirmReject'
          color='warning'
          action='Reject'
          message="Are you sure you want to reject user's profile?"
          onConfirm={() => this.props.rejectProfile(this.props.user._id)}
        />
        <ModalConfirm
          ref='confirmBlock'
          color='warning'
          action='Block'
          message='Are you sure you want to block user?'
          onConfirm={() => this.props.blockUser(this.props.user._id)}
        />
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    fetching: state.user.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
