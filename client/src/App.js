import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import {NavItem, NavLink, Nav, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {connect} from 'react-redux'
import {PrivateRoute} from './helpers/PrivateRoute'

import Home from './components/Home'
import Register from './components/Users/Register'
import Login from './components/Users/Login'
import CustomerList from './components/customers/List'
import CustomerNew from './components/customers/New'
import CustomerShow from './components/customers/CustomerShow'
import DepartmentList from './components/departments/DepartmentList'
import EmployeeList from './components/employees/EmployeeList'
import NewEmployee from './components/employees/NewEmployee'
import TicketList from './components/tickets/TicketList'
import TicketNew from './components/tickets/TicketNew'
import TicketShow from './components/tickets/TicketShow'
import EmployeeShow from './components/employees/EmployeeShow'
//import Container from './test/Container'
import CustomerEdit from './components/customers/Edit'
import DepartmentShow from './components/departments/DepartmentShow'
import TicketEdit from './components/tickets/TicketEdit'
import EmployeeEdit from './components/employees/EmployeeEdit'

function App(props) {

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.href = '/account/login'
    // return (
    //  <Redirect to="/account/login"/>
    // ) < does not work
  }

  return (
    <BrowserRouter>
    
      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem> 
              <h1>Ticketmaster</h1>
          </BreadcrumbItem>
        </Breadcrumb>
       
        {
         Object.keys(props.user).length == 0 ? (
            <div>
                <Nav tabs>
              <NavItem>
                  <NavLink href="/account/login">Login  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/account/register">Register </NavLink>
                </NavItem>
              </Nav>
              {/* <Link to="/account/login">Login</Link>
              <Link to="/account/register">Register</Link> */}
            </div>
          ) : (
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink href="/">Home </NavLink>
                </NavItem>
               
                <NavItem>
                  <NavLink href="/customers"> Customers   </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/departments"> Departments   </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/employees"> Employees   </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/tickets"> Tickets   </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="#" onClick={handleLogout}>Logout  </NavLink>
                </NavItem>
              </Nav>
              {/* <Link to="/test">Test</Link> */}
              {/* <Link to="/customers"> Customers </Link>
              <Link to="/departments"> Departments </Link>
              <Link to="/employees"> Employees </Link>
              <Link to="/tickets"> Tickets </Link>
              <Link to="#" onClick={handleLogout}>Logout</Link> */}
            </div>
          )
        }
        
      </div>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/account/register" component={Register} />
        <Route path="/account/login" component={Login} />

        <PrivateRoute path="/customers" component={CustomerList} exact />
        <PrivateRoute path="/customers/new" component={CustomerNew} />
        {/* If you do it this way, customers/new matches customers/:id, so BOTH the add customer page and the show customer page will display when you head over to the CustomerNew component. So use switch! When you do use it, don't put the show route before the new route*/}
        {/* Obviously since customers/new is nota  match for customers/:id, it won't happen when you go to the customerSHOW component */}
        {/* The way this works is... if something matches it stops looking for others that match. It breaks. */}
        <PrivateRoute path="/customers/edit/:id" component={CustomerEdit} />
        <PrivateRoute path="/customers/:id" component={CustomerShow} />

        <PrivateRoute path="/departments" component={DepartmentList} exact/>
        <PrivateRoute path="/departments/:id" component={DepartmentShow} />

        <PrivateRoute path="/employees" component={EmployeeList} exact />
        <PrivateRoute path="/employees/new" component={NewEmployee} />
        <PrivateRoute path="/employees/edit/:id" component={EmployeeEdit} />
        <PrivateRoute path="/employees/:id" component={EmployeeShow} />

        <PrivateRoute path="/tickets" component={TicketList} exact />
        <PrivateRoute path="/tickets/new" component={TicketNew} />
        <PrivateRoute path="/tickets/edit/:id" component={TicketEdit}/>
        <PrivateRoute path="/tickets/:id" component={TicketShow}/>

        {/* <Route path="/test" component={Container} /> */}
      </Switch>
    </BrowserRouter>

  )
}

const mapStateToProps = (state)=>{
  return {
      user:state.user
  }
}
export default connect(mapStateToProps) (App)