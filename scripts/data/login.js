document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Email:', email);
    console.log('Password:', password);

    const predefinedAccount = [
        { email: 'curatp@students.national-u.edu.ph', password: 'tristancura', name: 'Tristan Cura', position: 'UI/UX Developer'},
        { email: 'cruztp@students.national-u.edu.ph', password: 'tyrelcruz', name: 'Tyrel Cruz', position: 'Front-End Developer'},
        { email: 'davidnm@students.national-u.edu.ph', password: 'neodavid', name: 'Neo David', position: 'Front-End Developer'},
        { email: 'rapirg@students.national-u.edu.ph', password: 'russelrapi', name: 'Russel Rapi', position: 'Front-End Developer'},
        { email: 'admin@admin.admin', password: 'admin12345', name: 'Admin', position: 'Admin'}
    ];

    const user = predefinedAccount.find(login => login.email === email);
    
    if (user) {
        if (user.password === password) {
            window.location.href = 'admin-wall.html';
        } else {
            alert('Invalid password. Please try again.');
        }
    } else {
        alert('Invalid email. Please try again.');
    }
});
