import React from 'react'
import { TweetBody } from './TweetBody'



class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = []
    }

    render() {
        var a = 'fnunez'
        return (
            <div>
                <TweetBody
                    name="Filipe Bastos Nunez"
                    handle={`@${a}`}
                    tweet_text="TESTE TESTE TESTE TESTE" />
            </div>
        );
    }
}

export default Feed

