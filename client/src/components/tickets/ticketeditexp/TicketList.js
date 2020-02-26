import React from 'react'
// import axios from '../../config/axios'
import axios from 'axios'
import {Link} from 'react-router-dom'

class TicketList extends React.Component{

    constructor() {
        super()
        this.state = {
            tickets: [],
            departments: []
        }
    }

    componentDidMount() {
        axios.all([
            axios.get('http://dct-ticket-master.herokuapp.com/tickets', {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            }),
            axios.get('http://dct-ticket-master.herokuapp.com/departments', {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
        ])
        .then(axios.spread((ticket, dept) => {
            this.setState({tickets: ticket.data, departments: dept.data})
        }))
        .catch(err => alert(err))
    }

    handleRemove = (id) => {
        axios.delete(`http://dct-ticket-master.herokuapp.com/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            this.setState(prevState => {
                return {tickets: prevState.tickets.filter(ticket => ticket._id !== response.data._id)}
            })
        })
    }

    render() {
        return (
            <div>
                <h1>Tickets - {this.state.tickets.length}</h1>
                <ul>
                    {
                        this.state.tickets.map(ticket => {
                            return <li key={ticket._id}>{ticket.code} - {ticket.priority} - {this.state.departments.find(dept => dept._id === ticket.department).name}
                            {'  '}
                            <Link to={`/tickets/${ticket._id}`}>Show</Link>
                            {/* <button>edit</button> */}
                            <button onClick={() => this.handleRemove(ticket._id)}>remove</button>
                            <Link to={`/tickets/edit/${ticket._id}`}><button>Edit</button></Link></li>
                        })
                    }
                </ul>
                <Link to="/tickets/new">Add ticket</Link>
            </div>
        )
    }
}

export default TicketList