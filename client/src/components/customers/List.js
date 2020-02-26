import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import {Table, Button} from 'reactstrap'

class CustomerList extends React.Component {

    constructor(){
        super()
        this.state = {
            customers: []
        }
    }

    componentDidMount(){
        // the token will be sent to the server in the request header. The second argument for get is the options object which has a property called headers, in which you pass x-auth
        // you can send it the url, but the backend has been designed in a way that requires you to pass it in the request HEADER. This is to keep it from being exposed
        // so when you're trying to get private info this is how you do it. The server will fetch the data based on the token and send it to you.
        axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const customers = response.data
                this.setState({customers})
            })
    }

    handleDelete = (customerId) => {
        axios.delete(`/customers/${customerId}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            this.setState(prevState => {
                const customers = prevState.customers.filter(cust => cust._id !== response.data._id)
                return ({customers})
            })
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="container">
                <br/><br/>
                <h3>Customers List - {this.state.customers.length}</h3>
               <br/>
                        
                            <Table className="table table-hover">
                                <thead>
                                   
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        {/* <th>Action</th> */}
                                        <th>Remove</th>
                                    
                                </thead>
                                <tbody>
                               { this.state.customers.map(customer => {
                                    return(
                                        <tr>
                                        {/* <td><Link to ={`/customers/${customer._id}`}>{customer.name}</Link></td> */}
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.mobile}</td>
                                        {/* <td> <Link className="btn btn-primary" to={`/customers/edit/${customer._id}`}>Edit</Link></td> */}
                                        <td><Button className="btn btn-danger" onClick={() => {this.handleDelete(customer._id)}}>Remove</Button></td>
                                    </tr>
                                    )
                                   
                                })}
                                </tbody>
                            </Table>
                            <br/>
                            <Link to="/customers/new">Add customer</Link>
                            {/* // <li key={customer._id}>
                            // <Link to ={`/customers/${customer._id}`}>{customer.name}</Link> - {customer.mobile}, {customer.email}
                            // <Link to={`/customers/edit/${customer._id}`}>edit</Link>
                            // <button onClick={() => {this.handleDelete(customer._id)}}>Remove</button>
                            // </li> */}
                        
                  
                
                
            </div>
        )
    }
}

export default CustomerList