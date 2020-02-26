import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import {Table} from 'reactstrap'

class EmployeeShow extends React.Component {
    constructor() {
        super()
        this.state = {
            employee: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`employees/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const employee = response.data
            this.setState({employee})
        })
        .catch(err => alert(err))
    }

    render() {
        return (
            <div className="container">
                <br/>
                <Table>
                    <thead>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Department</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        <td>{this.state.employee.name} </td>
                        <td>{this.state.employee.email} </td>
                        <td> {this.state.employee.mobile} </td>
                        <td> {this.state.employee.department? this.state.employee.department.name : ''}</td>
                        <td> <Link className="btn btn-primary" to={`/employees/edit/${this.state.employee._id}`}>Edit</Link></td>
                    </tbody>
                </Table>
                {/* <h3>Employee - {this.state.employee.name}</h3>
                {this.state.employee.department? this.state.employee.department.name : ''}
                <br/>
                <Link to={`/employees/edit/${this.state.employee._id}`}>Edit</Link> */}
            </div>
        )
    }
}

export default EmployeeShow