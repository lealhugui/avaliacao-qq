import React from 'react'
import {
    BrowserRouter as Router, Route, Redirect, withRouter
} from 'react-router-dom'
import Feed from "./Feed"

const Authentication = {
    isAuthenticated: false,
    setAuthentication(cb) {
        this.isAuthenticated = true

        setTimeout(cb, 100)
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)

    }
}

class Login extends React.Component {
    state = {
        redirect: false,
        user: "",
        password: "",
    }
    login = () => {
        if (this.state.user === "Filipe") {
            Authentication.setAuthentication(() => {
                this.setState(() => ({
                    redirect: true
                }))
            })
        }
    }
    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/feed' />
        }


        return (
            < div >
                <div>
                    <input type="text"
                        value={this.state.value}
                        onChange={event => this.setState({ user: event.target.value })}></input>
                </div>

                <div>
                    <input></input>
                </div>
                <button onClick={this.login}>Log in</button>
            </div >
        )
    }
}



const LoginSucess = withRouter(() => (
    // Se isAuthenticated === True renderiza Feed se False renderiza texto.
    Authentication.isAuthenticated ? (
        < Feed />
    ) : (
            <p>Por Favor Logue No QQ_Twitter</p>
        )
))

export default function AuthExample() {
    return (
        <Router>
            <LoginSucess >
                {/* Renderizando página depois do login com sucesso*/}
                <link to='/feed'></link>
            </LoginSucess>
            <Route path='/' component={Login} />
        </Router>
    )
}