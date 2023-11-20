document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid login credentials');
        }
    })
    .then(data => {
        localStorage.setItem('token', data.token);
        window.location.href = 'userInfo.html';
    })
    .catch(error => {
        document.getElementById('errorMessage').textContent = error.message;
        console.error('Error:', error);
    });
});
