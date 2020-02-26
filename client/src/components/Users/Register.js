import React from 'react'
import axios from 'axios'
import { FormGroup } from 'reactstrap'
import {connect} from 'react-redux'
import {startRegister} from '../../actions/userAction'


class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        // axios.post('http://dct-ticket-master.herokuapp.com/users/register', formData)
        // //axios.post('http://localhost:3030/users/register', formData)
        //     .then(response => {
        //         if(response.data.errors) {
        //             alert(response.data.message)
        //         } else {
        //             this.props.history.push('/account/login')
        //         }
        //     })
        //     .catch(err => alert(err))
        //to redirect to another page we use redirect function and invoke it in the actions 
        const redirect = ()=>{
           return  this.props.history.push('/account/login')
        }
        this.props.dispatch(startRegister(formData,redirect))
    }

    render() {
        return (
            <div className="container col-md-6 col-md-offset-3">
                <br/>
                <h2> Register with us </h2>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                    <div className="form-group col-md-7">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" value={this.state.username} onChange={this.handleChange} id="username" />
                    </div>
                   
                    <br/>
                    <div  className="form-group col-md-7">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" value={this.state.email} onChange={this.handleChange} id="email" />
                    </div>
                   
                    <br/>
                    <div className="form-group col-md-7">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.handleChange} id="password" />
                    </div>
                    
                    <br/>
                    </FormGroup>
                    <input type="submit" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}


export default connect()(Register)