fetch("http:localhost:3000/weather?address=dubai").then((response) => {

    console.log(response);
    response.json().then(function (data) {

        debugger;
        //     if (data.error) {

        //         console.log(error);

        //     }
        //     else {
        //         console.log(data);
        //     }
    });
});