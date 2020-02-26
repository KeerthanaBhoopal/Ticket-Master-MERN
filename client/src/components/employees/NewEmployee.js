import React from 'react'
import axios from '../../config/axios'
import EmployeeForm from './EmployeeForm'

class NewEmployee extends React.Component {

    handleSubmit = (formData) => {
        axios.post('/employees/', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if (response.data.errors) {
                alert(response.data.message)
            } else { 
                this.props.history.push('/employees')
            }
        })
    }

    render() {
        console.log(this.props)
        return (
            <div className="container">
                <br/>
                <h4>Add Employee</h4>
                <br/>
                <EmployeeForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default NewEmployee