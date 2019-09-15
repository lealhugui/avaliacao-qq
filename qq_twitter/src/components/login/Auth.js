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
    console.log(user)
    var bodyData = JSON.stringify({
        'login': user,
        'password': password
    })
    // console.log(bodyData)
    var request = new Request('http://localhost:8080/login', {
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
        //Getting the Promise as unresolved
        var user = loginRequest(this.state.user, this.state.password)
        // thisState = this so I can use inside .then in the promise
        const thisState = this
        user.then((response) => response.json())
            .then(function (data) {
                // console.log("DATA", data.authenticated)
                // return data[Object.keys(data)[0]]; //return true or false
                Authentication.setAuthentication(() => {
                    thisState.setState(() => ({
                        redirect: data.authenticated
                    }))
                })

            })
    }




    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/feed' />
        }


        return (
            < div className="Login">
                <div >
                    <input type="text"
                        value={this.state.value}
                        onChange={event => this.setState({ user: event.target.value })}></input>
                </div>

                <div>
                    <input type="text"
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
            <div className="Login">

                <p>Por Favor Logue No QQ_Twitter</p>
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