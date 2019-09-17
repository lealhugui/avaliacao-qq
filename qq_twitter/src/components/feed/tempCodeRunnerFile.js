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