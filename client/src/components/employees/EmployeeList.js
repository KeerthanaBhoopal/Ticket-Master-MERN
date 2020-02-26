import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import {Table, Button} from 'reactstrap'

class EmployeeList extends React.Component{
    constructor() {
        super()
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get('/employees/', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const employees = response.data
            this.setState({employees})
        })
    }


    handleDelete = (employeeId) => {
        axios.delete(`/employees/${employeeId}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            this.setState(prevState => {
                const employees = prevState.employees.filter(emp => emp._id !== response.data._id)
                return ({employees})
            })
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="container ">
                <br/>
                <h3>Employees - {this.state.employees.length}</h3>
                <br/>
                <Table className="table table-hover">
                    <thead>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Department</th>
                        <th>Action</th>
                        <th>Remove</th>
                    </thead>
                    <tbody>
                    {
                        this.state.employees.map(employee => {
                            return(<tr>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.mobile} </td>
                                        <td>{employee.department.name} </td>
                                        <td><Link className="btn btn-primary" to={`/employees/${employee._id}`}>Show</Link> </td>
                                        <td> <Button className="btn btn-danger" onClick={() => {this.handleDelete(employee._id)}}>Remove</Button></td>
                                    </tr>)
                            return <li key={employee._id}>{employee.name} - {employee.department.name} - <Link to={`/employees/${employee._id}`}>Show</Link></li>
                        })
                    }
                        
                    </tbody>
                </Table>
                {/* <ul>
                    {
                        this.state.employees.map(employee => {
                            return <li key={employee._id}>{employee.name} - {employee.department.name} - <Link to={`/employees/${employee._id}`}>Show</Link></li>
                        })
                    }
                </ul> */}
                <Link to="/employees/new">Add an Employee</Link>
            </div>
        )
    }
}

export default EmployeeList