import React from 'react'
import './Auth.css'
import {
    BrowserRouter as Router, Route, Redirect, withRouter
} from 'react-router-dom'
import Feed from "../feed/Feed"


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

async function loginRequest(user, password) {
    const bodyData = JSON.stringify({
        'login': user,
        'password': password
    })

    // fazendo a chamada a post
    const request = new Request('http://localhost:8080/login', {
        body: bodyData,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return fetch(request)

}

class Login extends React.Component {
    state = {
        redirect: false,
        user: "",
        password: "",
    }

    login = () => {
        //Pegando a promise como unresolved
        var requestPromise = loginRequest(this.state.user, this.state.password)


        // thisState = this assim posso usar o estado atual dentro da resolução da promise
        const thisState = this

        // resolvendo a promise
        requestPromise
            .then((response) => response.json())
            .then(function (data) {
                Authentication.setAuthentication(() => {
                    thisState.setState(() => ({
                        redirect: data.authenticated
                    }))
                })
            })
    } //fim login




    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/feed' />
        }


        return (
            < div className="Login">
                <div>
                    <input type="text"
                        value={this.state.value}
                        onChange={event => this.setState({ user: event.target.value })}></input>
                </div>

                <div>
                    <input type="password"
                        value={this.state.value}
                        onChange={event => this.setState({ password: event.target.value })}></input>
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
            <div>
                <div className="Login">
                    <p>Por Favor Logue No QQ_Twitter</p>
                </div>
            </div>
        )
))

export default function AuthExample() {
    return (
        <div>
            <Router>
                <LoginSucess >
                    {/* Renderizando página depois do login com sucesso*/}
                    <link to='/feed'></link>
                </LoginSucess>
                <Route path='/' component={Login} />
            </Router>
        </div>
    )
}