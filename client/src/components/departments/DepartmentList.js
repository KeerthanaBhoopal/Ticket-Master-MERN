import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './DepartmentForm'
import {Link} from 'react-router-dom'
import {Table, Button, Container} from 'reactstrap'

class DepartmentList extends React.Component {
    constructor() {
        super()
        this.state = {
            departments: [],
            // deptName: ''
        }
    }

    componentDidMount() {
        axios.get('/departments/', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const departments = response.data
            this.setState({departments})
        })
    }

    handleChange = (e) => {
        this.setState({deptName: e.target.value})
    }

    handleSubmit = (formData) => {
        // e.preventDefault()
        // const formData = {
        //     name: this.state.deptName
        // }
        // console.log(formData)
        axios.post('/departments', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response)
            // window.location.reload()
            this.setState(prevState => {
                const departments = [...prevState.departments, response.data]
                // return {departments, deptName: ''}
                return {departments}
            })
        })
    }

    handleRemove = (dept) => {
        axios.delete(`/departments/${dept}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if (response.data.errors) {
                alert(response.data.message)
            } else {
                // window.location.reload()
                this.setState(prevState => {
                    const departments = prevState.departments.filter(department => department._id !== response.data._id)  
                    return ({departments, deptName: ''})
                })
            }
        })
    }

    handleSubmit = (formData) => {
        axios.post('/departments/', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const department = response.data
            this.setState(prevState => ({
                departments: prevState.departments.concat(department)
            }))
        })
        .catch(error => alert(error))
    }


    render() {
        return (
            <Container>
            <div className="row">
                <div className="col-md-8">
                <br/>
                <h3>Departments - {this.state.departments.length}</h3>
                
                  <Table className="table table-hover">
                                    <thead>
                                        <tr key={this.state.departments._id}>
                                            <th>Name</th>
                                            <th>Action</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.departments.map((department,i) => {
                                            return(
                                                <tr key={i}>
                                                    <td>{department.name} </td>
                                                    <td><Link className="btn btn-primary" to={`/departments/${department._id}`}>Show </Link></td>
                                                    <td><Button className="btn btn-danger" onClick={() => {this.handleRemove(department._id)}}>Remove</Button></td>
                                                </tr>
                                            )
                                            
                                        })}
                                       
                                    </tbody>
                                </Table>
                                {/* // <li key={department._id}>
                                //     <Link to={`/departments/${department._id}`}>{department.name} - </Link>
                                //     <button onClick={() => {this.handleRemove(department._id)}}>Remove</button>
                                // </li> */}
                                                
                    </div>
                   <div className="col-md-4">
                       <br/>
                <h3>Add Department</h3>
                {/* should I add this to a seperate component? Since it's not reusable and it's a tiny bit of code, should be ok? maybe?*/}
                {/* <form onSubmit={this.handleSubmit}>
                    <input type = "text" value = {this.state.deptName} onChange={this.handleChange}/>
                    <button> Add </button>
                </form> */}
                <DepartmentForm handleSubmit={this.handleSubmit}/>
            </div>
            </div>
            </Container>
        )
    }
}

export default DepartmentList