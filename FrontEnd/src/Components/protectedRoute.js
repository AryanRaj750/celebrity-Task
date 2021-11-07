import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {

    return (
        <Route {...rest}
            render={(props) => {
                if (auth.auth){
                    console.log("pk")
                    return <Component {...props} />
                }
                if (!auth.auth) {
                    alert("Please Login...")
                    return <Redirect to={{ path: "/", state: { from: props.location } }} />
                }

            }} />)

}

export default ProtectedRoute;