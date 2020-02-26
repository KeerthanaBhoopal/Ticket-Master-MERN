import React from 'react'
// import axios from '../../config/axios'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Table, Button} from 'reactstrap'

class TicketList extends React.Component{

    constructor() {
        super()
        this.state = {
            tickets: [],
            departments: [],
            employees: [],
            customers:[]
        }
    }

    componentDidMount() {
        axios.all([
             axios.get('http://dct-ticket-master.herokuapp.com/tickets', {
            //axios.get('http://localhost:3030/tickets', {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            }),
             axios.get('http://dct-ticket-master.herokuapp.com/departments', {
            //axios.get('http://localhost:3030/departments', {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            }),
             axios.get('http://dct-ticket-master.herokuapp.com/employees', {
            //axios.get('http://localhost:3030/employees', {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            }),
            axios.get('http://dct-ticket-master.herokuapp.com/customers',{
                headers:{
                    'x-auth': localStorage.getItem('authToken')
                }
            })
        ])
        .then(axios.spread((ticket, dept, emp,cus) => {
            this.setState({tickets: ticket.data, departments: dept.data, employees: emp.data, customers:cus.data})
        }))
        .catch(err => alert(err))
    }

    handleRemove = (id) => {
         axios.delete(`http://dct-ticket-master.herokuapp.com/tickets/${id}`, {
        //axios.delete(`http://localhost:3030/tickets/${id}`, {
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

    handleEmp = (emps) => {
        console.log()
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h3>Tickets - {this.state.tickets.length}</h3>
                <br/>
                <Table>
                    <thead>
                        <th>Code</th>
                        <th>Priority</th>
                        <th>Department</th>
                        <th>Employee</th>
                        <th>Customer</th>
                        <th>Show</th>
                        <th>Action</th>
                        <th>Remove</th>
                    </thead>
                    <tbody>
                        {
                            this.state.tickets.map((ticket,i) => {
                                console.log(ticket)
                                return( 
                                                                 
                                    <tr key={i}>
                                        <td>{ticket.code} </td>
                                        <td>{ticket.priority} </td>
                                        {/* <td>{ ticket.department.name}</td> */}
                                        <td>{this.state.departments.find(dept => dept._id === ticket.department).name} </td>
                                        <td>{
                                                ticket.employees.map(employee => {
                                                    return <span key={employee._id}> {this.state.employees.find(emp => {
                                                        return emp._id === employee._id 
                                                    }).name} </span>
                                                })
                                            } 
                                        </td>
                                        <td>{this.state.customers.find(c => c._id === ticket.customer).name} </td>
                                        
                                            {/* <td>{ticket.customer.name} */}
                                            {/* {
                                                ticket.customers.map(cust => {
                                                    return <span key={cust._id}> {this.state.customers.find(cus => {
                                                        return cus._id === cust._id 
                                                    }).name} </span>
                                                })
                                            }  */}
                                       
                                        <td><Link className="btn btn-primary" to={`/tickets/${ticket._id}`}>Show</Link></td>
                                        <td><Link className="btn btn-secondary" to={`/tickets/edit/${ticket._id}`}>Edit</Link></td>
                                        <td><Button className="btn btn-danger" onClick={() => this.handleRemove(ticket._id)}>remove</Button></td>
                                    </tr>
                                   
                                )
                            })
                        }
                    </tbody>
                </Table>
                {/* <ul>
                    {
                        this.state.tickets.map(ticket => {
                            return( 
                            <li key={ticket._id}>
                                {ticket.code} - {ticket.priority} - {this.state.departments.find(dept => dept._id === ticket.department).name}
                                <span>{
                                    ticket.employees.map(employee => {
                                        return <span key={employee._id}> {this.state.employees.find(emp => {
                                            return emp._id === employee._id 
                                        }).name}, </span>
                                    })
                                }</span>
                                {'  '}
                                <Link to={`/tickets/${ticket._id}`}>Show</Link>
                                <button onClick={() => this.handleRemove(ticket._id)}>remove</button>
                                <Link to={`/tickets/edit/${ticket._id}`}><button>Edit</button></Link>
                            </li>
                            )
                        })
                    }
                </ul> */}
                <Link to="/tickets/new">Add ticket</Link>
            </div>
        )
    }
}

export default TicketList