import axios from 'axios';

axios
    .get('http://localhost:3000/passwords')
    .then((response) => {
        const data = response.data;
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
