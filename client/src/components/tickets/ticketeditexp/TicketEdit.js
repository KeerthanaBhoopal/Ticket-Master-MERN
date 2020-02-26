import React from 'react'
import axios from '../../config/axios'
import TicketForm from './TicketForm'

class TicketEdit extends React.Component{
    constructor() {
        super()
        this.state = {
            ticket: {},
            tick: 'tock'
        }
    }

    componentDidMount() {
        // const id = this.props.match.params.id
        this.setState({tick: 'tocking'})
        // axios.get(`/tickets/${id}`, {
        //     headers: {
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        // .then(response => {
        //     const ticket = response.data
        //     this.setState({ticket})
        // })
    }

    handleSubmit = (formData) => {
        const id = this.state.match.params.id
        axios.post(`/tickets/${id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            this.props.history.push('/tickets')
        })
    }

    render() {
        return (
            <div>
                <h1>Edit Ticket</h1>
                {/* Question - why does this not pass the updated state value on setState?*/}
                <TicketForm handleSubmit={this.handleSubmit} handleFill={this.state.tick}/>
            </div>
        )
    }
}

export default TicketEdit