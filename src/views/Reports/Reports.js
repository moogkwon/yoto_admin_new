import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
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
  FormGroup,
  Badge
} from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReportActions from '../../redux/ReportRedux'
import UserActions from '../../redux/UserRedux'
import Avatar from 'react-avatar'
import ModalReportPhoto from '../Modals/ModalReportPhoto'
import ModalConfirm from '../Modals/ModalConfirm'
import Pager from '../Pager'
import dayjs from 'dayjs'

class Reports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModalDelete: false,
      search: props.query.search || ''
    }
  }

  componentDidMount () {
    this.getReports(true)
  }

  getReports () {
    const query = this.props.query.asMutable({ deep: true })
    query.search = ''
    query.page = 1
    query.perPage = 10
    this.setState({ search: '' })
    this.props.getReports(query)
  }

  showReportPhoto (report) {
    this.setState({ report }, () => this.refs.reportPhoto.toggle())
  }

  onPageChange (page) {
    const query = this.props.query.asMutable()
    query.page = page
    this.props.getReports(query)
  }

  onChangeFilterBlock (value) {
    const query = this.props.query.asMutable({ deep: true })
    query.page = 1
    query.perPage = 10
    this.props.getReports(query)
  }

  onSearch () {
    const query = this.props.query.asMutable({ deep: true })
    query.search = this.state.search
    query.page = 1
    query.perPage = 10
    this.props.getReports(query)
  }

  renderRow (report, index) {
    const reporterLink = `/users/${report.user_id}`
    const reporteeLink = `/users/${report.reportee_id}`
    const status = report.reportee && report.reportee.is_blocked && <Badge color={'danger'}>Blocked</Badge>
    const no = index + 1 + (this.props.query.page - 1) * this.props.query.perPage
    return (
      <tr key={report._id}>
        <td>{no}</td>
        <td>
          <Link to={reporterLink}>
            <Avatar
              size={30}
              round='15px'
              name={report.user && report.user.name}
              src={report.user && report.user.avatar_url}
            />
            {' '}
            {report.user.name}
          </Link>
        </td>
        <td>
          <Link to={reporteeLink}>
            <Avatar
              size={30}
              round='15px'
              name={report.reportee && report.reportee.name}
              src={report.reportee && report.reportee.avatar_url}
            />
            {' '}
            <strong>{report.reportee && report.reportee.name}</strong>
          </Link>
        </td>
        <td>
          <Button style={{ padding: 0 }} onClick={() => this.showReportPhoto(report)}>
            <Avatar
              size={30}
              src={report.file_url}
            />
          </Button>
        </td>
        <td>{report.reason}</td>
        <td>{dayjs(report.created_at).format('MM/DD/YYYY HH:mm')}</td>
        <td>{status}</td>
      </tr>
    )
  }

  render () {
    const reportList = this.props.reports

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <div>
                  <i className='fa fa-align-justify' /> Reports
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
                    <Button onClick={() => this.getReports(true)}><i className='icon-refresh icons' /></Button>
                  </FormGroup>
                </div>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope='col'>No</th>
                      <th scope='col'>Reporter</th>
                      <th scope='col'>Reportee</th>
                      <th scope='col'>Captured</th>
                      <th scope='col'>Reason</th>
                      <th scope='col'>Time</th>
                      <th scope='col'>Reportee Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportList.map((report, index) => this.renderRow(report, index))}
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

        {/* <ModalConfirm
          ref='confirmDelete'
          color='danger'
          action='Delete'
          message='Are you sure you want to delete report?'
          onConfirm={() => this.props.deleteReport(this.state.report._id)}
        />
        <ModalConfirm
          ref='confirmReject'
          color='warning'
          action='Reject'
          message="Are you sure you want to reject report's profile?"
          onConfirm={() => this.props.rejectProfile(this.state.report._id)}
        /> */}
        <ModalConfirm
          ref='confirmBlock'
          color='warning'
          action='Block'
          message='Are you sure you want to block user?'
          onConfirm={() => this.props.blockUser(this.state.report.reportee_id)}
        />

        <ModalReportPhoto
          ref='reportPhoto'
          onBlock={() => this.refs.confirmBlock.toggle()}
          report={this.state.report}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    reports: state.report.reports,
    query: state.report.query
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(ReportActions, dispatch),
    ...bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
