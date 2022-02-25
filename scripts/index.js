const guidelist = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
    if(user) {
        // account info
        db.collection('users').doc(user.uid).get().then(doc =>{
            const html = `<div>Logged in as ${user.email} </div>
            <div>${doc.data().bio}</div>
           `;
        accountDetails.innerHTML = html;

        } )      
     
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // hide account info
        accountDetails.innerHTML = '';

        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

// setup guides
const setupGuides = (data) => {
if (data.length){

    let html = '';
    data.forEach(doc => {
        const guide = doc.data();
        const li = `
        <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white">${guide.index}</div>
        <div class="collapsible-body white">${guide.fakultet}</div>
        <div class="collapsible-body white">${guide.ciklus}</div>
        <div class="collapsible-body white">${guide.modul}</div>
        <div class="collapsible-body white">${guide.ime}</div>
        <div class="collapsible-body white">${guide.prezime}</div>
        <div class="collapsible-body white">${guide.adresa}</div>
        <div class="collapsible-body white">${guide.email}</div>
        <div class="collapsible-body white">${guide.group1}</div>
        <div class="collapsible-body white">${guide.godina}</div>
        <div class="collapsible-body white">${guide.contact}</div>
        <div class="collapsible-body white">${guide.kod}</div>
        <div class="collapsible-body white">${guide.predmet}</div>
        <div class="collapsible-body white">${guide.fond}</div>
        <div class="collapsible-body white">${guide.profesor}</div>

        </li>
                 `;
                 html += li
    });
    guidelist.innerHTML = html;
}else {
    guidelist.innerHTML = '<h5 class = "center-align"> Предмети од семестарот што се запишува </h5>'
}
}



// setup materialize components
document.addEventListener('DOMContentLoaded', function(){
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items)
});

