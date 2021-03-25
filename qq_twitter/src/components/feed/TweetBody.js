import React from 'react'

import Tweet from './Tweet.css'

const TweetBox = (props) => {
    return (
        <div className="tweet-box">
            {props.children}
        </div>
    )
}

const Name = (props) => {
    return (
        <div className="name">
            {props.name}
        </div>
    )
}

const Handle = (props) => {
    return (
        <div className="handle">
            {props.handle}
        </div>
    )
}

const Image = (props) => {
    return (
        <img src={require('./Quero-Quero.png')} alt="Logo" className="picture">
        </img>
    )
}

const TweetText = (props) => {
    return (
        <div className="tweet">
            {props.tweet}
        </div>
    )
}

const TweetBody = (props) => {
    return (
        <TweetBox>
            <div className="inner-body">
                <Image image={props.image} />
                <div className="body">
                    <div className="inner-body">
                        <Name name={props.name} />
                        <Handle handle={props.handle} />
                    </div>
                    <TweetText tweet={props.tweet} />
                </div>
            </div>
        </TweetBox>
    )
}

export { TweetBody }