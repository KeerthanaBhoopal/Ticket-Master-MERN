import React from 'react'
import axios from '../../config/axios'
import {Table} from 'reactstrap'

class TicketShow extends React.Component {
    constructor() {
        super()
        this.state = {
            ticket: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const ticket = response.data
            this.setState({ticket})
        })
    }

    render() {
        return (
            <div className="container col-md-10">
                <br/>
                <h3>Ticket</h3>
                <br/>
                <Table>
                    <thead>
                        <th>Code</th>
                        <th>Message</th>
                        <th>Employee Id</th>
                    </thead>
                    <tbody>
                        <td>{this.state.ticket.code}</td>
                        <td>{this.state.ticket.message}</td>
                        <td>{this.state.ticket.employees? this.state.ticket.employees.map((emp, i) => <span key={emp._id}> {emp._id} <br/></span>) : ''} </td>
                    </tbody>
                </Table>
                {/* {this.state.ticket.code} - {this.state.ticket.message}<br/>
                <strong>employee IDS</strong><br/>
                {this.state.ticket.employees? this.state.ticket.employees.map((emp, i) => <span key={emp._id}>{i + 1}. {emp._id} <br/></span>) : ''} */}
            </div>
        )
    }
    
}

export default TicketShow