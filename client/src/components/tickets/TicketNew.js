import React from 'react'
import axios from '../../config/axios'
import TicketForm from './TicketForm'

class TicketNew extends React.Component{
   
    handleSubmit = (formData) => {
        axios.post('/tickets/', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response)
            this.props.history.push('/tickets')
        })
        .catch(err => alert(err))
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h3>Add a ticket</h3>
                <br/>
                <TicketForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default TicketNew