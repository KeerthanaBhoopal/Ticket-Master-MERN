import React from 'react'
import axios from 'axios'
import { FormGroup } from 'reactstrap'
import {connect} from 'react-redux'
import {startLogin} from '../../actions/userAction'


class Login extends React.Component {
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
            email: this.state.email,
            password: this.state.password
        }
        // axios.post('http://dct-ticket-master.herokuapp.com/users/login', formData)
        // //axios.post('http://localhost:3030/users/login', formData)
        //     .then(response => {
        //         if(response.data.error) {
        //             alert(response.data.error)
        //         } else {
        //             const token = response.data.token
        //             localStorage.setItem('authToken', token)
        //             this.props.history.push('/')
        //             window.location.reload()
        //         }
        //     })
        //     .catch(err => alert(err))

        const redirect =()=>{
            this.props.history.push('/')
            //window.location.reload()
        }

        this.props.dispatch(startLogin(formData, redirect))
    }

    render() {
        return (
            <div className="container col-md-6 col-md-offset-3">
                <br/>

                <h2> Login with us </h2>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <div className="form-group col-md-7">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="text" value={this.state.email} onChange={this.handleChange} id="email" />
                        </div>                       
                        <br/>
                        <div className="form-group col-md-7">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" value={this.state.password} onChange={this.handleChange} id="password" />
                        </div>
                        
                    </FormGroup>
                   
                    
                    <div>
                        <input className="btn btn-primary" type="submit" />
                    </div>
                   
                </form>
            </div>
        )
    }
}


export default connect()(Login)