function sendRequest(request, callback) {
    fetch(request.endpoint, {
        method: request.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request.body),
    })
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        })
        .catch((err) => {
            console.log(err);
        });
}
