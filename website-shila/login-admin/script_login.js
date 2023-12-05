
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var userEmail = document.getElementById('your-email').value;
        var userPassword = document.getElementById('password').value;
        
        //ip = cmd -> ipconfig -> IPv4 Address -> 000.000.0.0
        fetch('http://localhost/a/github/workshop-web/dari%20dimas/API/api_users.php?action=login2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            body: 'user_email=' + encodeURIComponent(userEmail) + '&user_password=' + encodeURIComponent(userPassword),
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.code === 200) {

                var apiKey = data.data[0].apiKey;
                localStorage.setItem('apiKey', apiKey);

                window.location.href = '../admin/dashboard/dashboard.html?';
                // window.location.href = '../admin/katalog/katalog.html'
            } else if (data.code === 401) {
                alert('login Gagal. Username atau password salah.')
            } else if (data.code === 500) {
                alert('Koneksi DB Gagal');
            }                
        })
        .catch(function(error) {
            console.error('Error:', error);
            alert('terjadi kesalahan')
        })
    })
})


