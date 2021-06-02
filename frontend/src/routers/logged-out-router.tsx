import React from 'react'
import { isLoggedInVar } from 'src/apollo'

function LoggedOutRouter() {
    const onClick = () => {
        isLoggedInVar(true)
    }
    return (
        <div>
            
        </div>
    )
}

export default LoggedOutRouter
