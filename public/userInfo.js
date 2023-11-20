document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('viewUserInfo').addEventListener('click', function() {
        const token = localStorage.getItem('token');

        fetch('http://localhost:3000/current-user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
        .then(response => response.json())
        .then(user => {
            const userInfoDisplay = `Username: ${user.username}, Role: ${user.role}`;
            document.getElementById('userInfoResult').innerText = userInfoDisplay;

            if (user.role === 'admin') {
                fetchAllUsers(token);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('userInfoResult').innerText = 'Error fetching user info';
        });
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
        logout()
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });
    const logout = () => {
        fetch('http://localhost:3000/logout', {
            method: 'GET',

        })
        localStorage.removeItem('token');
        window.location.href = 'index.html';

    }
    function fetchAllUsers(token) {

        fetch('http://localhost:3000/users', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
        .then(response => response.json())
        .then(users => {
            const usersList = users.map(user => `ID: ${user.id}, Username: ${user.username}, Role: ${user.role}`).join('<br>');
            document.getElementById('userInfoResult').innerHTML += `<br><br>All Users:<br>${usersList}`;
        })
        .catch(error => console.error('Error:', error));
    }
});
