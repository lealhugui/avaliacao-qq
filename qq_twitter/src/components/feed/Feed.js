import React from 'react'
import { TweetBody } from './TweetBody'
import './Feed.css'

const Search = (props) => {
    return (<div className="search">
        <input
            value={props.search}
            onChange={event => this.setState({ user: event.target.value })}
        >
        </input>
    </div>
    )
}

function Tweets(user) {
    const bodyData = JSON.stringify({
        'login': user
    })

    // making the post request
    const request = new Request('http://localhost:8080/follows', {
        body: bodyData,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    fetch(request)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data)
        })

}
Tweets('fnunez')
class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = []
    }

    render() {
        var a = 'fnunez'
        return (
            <div>
                <div className="search-bar">
                    <p>Pesquisar Usuários</p>
                    <Search
                        search={event => this.setState({ search: event.target.value })}
                    />

                </div>
                <div className="main-body">
                    <TweetBody
                        name="Filipe Bastos Nunez"
                        handle={`@${a}`}
                        tweet="TESTE TESTE TESTE TESTE" />
                </div>

                <div className="main-body">
                    <TweetBody
                        name="Filipe Bastos Nunez"
                        handle={`@${a}`}
                        tweet="TESTE TESTE TESTE TESTE" />
                </div>

                <div className="main-body">
                    <TweetBody
                        name="Filipe Bastos Nunez"
                        handle={`@${a}`}
                        tweet="TESTE TESTE TESTE TESTE" />
                </div>

                <div className="main-body">
                    <TweetBody
                        name="Filipe Bastos Nunez"
                        handle={`@${a}`}
                        tweet="TESTE TESTE TESTE TESTE" />
                </div>
            </div>
        );
    }
}

export default Feed
