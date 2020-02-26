import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './DepartmentForm'

class DepartmentShow extends React.Component{
    constructor() {
        super()
        this.state = {
            department: {},
            edit: false
        }
    }

    componentDidMount() {
        axios.get(`/departments/${this.props.match.params.id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response)
            const department = response.data
            this.setState({department})
        })
    }

    handleEdit = () => {
        this.setState({edit: true})
    }

    handleSubmit = (formData) => {
        axios.put(`/departments/${this.props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const department = response.data
            this.setState({department, edit: false})
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="container">
                <br/>
                <h3>Department Show</h3>
                <div className="container shadow-none p-3 mb-5 bg-light rounded">
                <h4>Name - {this.state.department.name}</h4>    
            </div>
            <button className="badge badge-pill badge-primary" onClick={this.handleEdit}>Edit</button>
                {this.state.edit ? <DepartmentForm handleSubmit = {this.handleSubmit} name = {this.state.department.name}/> : ''}
            </div>
        )
    }
}

export default DepartmentShow