import React from 'react'
import { FormGroup, Button } from 'reactstrap'

class DepartmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name? this.props.name : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        this.props.handleSubmit(formData)
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <div className="form-group col-md-3">
                    <input type = "text" name="name" value = {this.state.name} onChange={this.handleChange}/>

                    <input className="btn btn-primary" type="submit" />
                    {/* <Button className="btn btn-primary" type="submit">Add</Button> */}
                    </div>
                </FormGroup>
                    
                    
            </form>
        )
    }
}

export default DepartmentForm