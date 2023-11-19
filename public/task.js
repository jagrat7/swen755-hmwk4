document.getElementById('attemptTask').addEventListener('click', function() {
    var token = localStorage.getItem('token');

    fetch('http://localhost:3000/task', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('taskResult').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
});
