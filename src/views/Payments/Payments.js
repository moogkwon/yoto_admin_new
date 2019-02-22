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
import PaymentActions from '../../redux/PaymentRedux'
import UserActions from '../../redux/UserRedux'
import Avatar from 'react-avatar'
import Pager from '../Pager'
import dayjs from 'dayjs'

class Payments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModalDelete: false,
      search: props.query.search || ''
    }
  }

  componentDidMount () {
    this.getPayments(true)
  }

  getPayments () {
    const query = this.props.query.asMutable({ deep: true })
    query.search = ''
    query.page = 1
    query.perPage = 10
    this.setState({ search: '' })
    this.props.getPayments(query)
  }

  showPaymentPhoto (payment) {
    this.setState({ payment }, () => this.refs.paymentPhoto.toggle())
  }

  onPageChange (page) {
    const query = this.props.query.asMutable()
    query.page = page
    this.props.getPayments(query)
  }

  onChangeFilterBlock (value) {
    const query = this.props.query.asMutable({ deep: true })
    query.page = 1
    query.perPage = 10
    this.props.getPayments(query)
  }

  onSearch () {
    const query = this.props.query.asMutable({ deep: true })
    query.search = this.state.search
    query.page = 1
    query.perPage = 10
    this.props.getPayments(query)
  }

  renderRow (payment, index) {
    const userLink = `/users/${payment.user_id}`
    const status = payment.paymentee && payment.paymentee.is_blocked && <Badge color={'danger'}>Blocked</Badge>
    const no = index + 1 + (this.props.query.page - 1) * this.props.query.perPage
    return (
      <tr key={payment._id}>
        <td>{no}</td>
        <td>
          <Link to={userLink}>
            <Avatar
              size={30}
              round='15px'
              name={payment.user && payment.user.name}
              src={payment.user && payment.user.avatar_url}
            />
            {' '}
            {payment.user.name}
          </Link>
        </td>
        <td>{payment.reason}</td>
        <td>{dayjs(payment.created_at).format('MM/DD/YYYY HH:mm')}</td>
        <td>{status}</td>
      </tr>
    )
  }

  render () {
    const paymentList = this.props.payments

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <div>
                  <i className='fa fa-align-justify' /> Payments
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
                    <Button onClick={() => this.getPayments(true)}><i className='icon-refresh icons' /></Button>
                  </FormGroup>
                </div>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope='col'>No</th>
                      <th scope='col'>User</th>
                      <th scope='col'>OS</th>
                      <th scope='col'>Transaction</th>
                      {/* <th scope='col'>Receipt</th> */}
                      <th scope='col'>Date</th>
                      <th scope='col'>Duration</th>
                      <th scope='col'>Expires</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentList.map((payment, index) => this.renderRow(payment, index))}
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

        {/* <ModalPaymentPhoto
          ref='paymentPhoto'
          onBlock={() => this.refs.confirmBlock.toggle()}
          payment={this.state.payment}
        /> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    payments: state.payment.payments,
    query: state.payment.query
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(PaymentActions, dispatch),
    ...bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)
