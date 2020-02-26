import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './DepartmentForm'

class DepartmentEdit extends React.Component {

    constructor() {
        super()
        this.state = {
            department: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/departments/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const department = response.data
            this.setState({department})
        })
        .catch(err => alert(err))
    }

    
    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        axios.put(`/departments/${id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(() => {
            this.props.history.push('/departments')
        })
    }


    render() {
        return (
            <div className="container">
                <br/>
                <h3>Edit Department</h3>
                {this.state.customer.name && <DepartmentForm handleSubmit = {this.handleSubmit} {...this.state.department} /> }
            </div>
        )
    }
}

export default DepartmentEdit