import React from 'react'
import {Redirect, Route} from 'react-router-dom'

export const PrivateRoute = ({component: Component, ...rest}) =>{
    return(
        <Route {...rest} render={(props)=>{

        
            return(
                localStorage.getItem('authToken') ? (
                    <Component {...props} />
                ): (
                    <Redirect to={{
                        pathname:"/account/login",
                        state:{from:props.location}
                    }}
                    />
                 )

            )
         } }
             />
    )
   
}