auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('guides').onSnapshot(snapshot =>{
            setupGuides(snapshot.docs);
            setupUI(user);
         }, err => {
            console.log(err.message)
         });
    } else {
        setupUI();
        setupGuides([]);
    }
});


//  create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides').add({
        title: createForm['title'].value,
        index: createForm['index'].value,
        fakultet: createForm['fakultet'].value,
        ciklus: createForm['ciklus'].value,
        modul: createForm['modul'].value,
        ime: createForm['ime'].value,
        prezime: createForm['prezime'].value,
        adresa: createForm['adresa'].value,
        email: createForm['email'].value,
        group1: createForm['group1'].value,
        godina: createForm['godina'].value,
        contact: createForm['contact'].value,
        kod: createForm['kod'].value,
        predmet: createForm['predmet'].value,
        fond: createForm['fond'].value,
        profesor: createForm['profesor'].value

    }).then(
        () => {
            // close the odel aand reset the form
         const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
        }).catch(err =>{
            console.log(err.message)
        })
})

//  create new guide
const createForm1 = document.querySelector('#create-form1');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides').add({
        title: createForm1['title'].value,
        content: createForm1['content'].value
    }).then(
        () => {
            // close the odel aand reset the form
         const modal = document.querySelector('#modal-create1');
        M.Modal.getInstance(modal).close();
        createForm1.reset();
        }).catch(err =>{
            console.log(err.message)
        })
})
// signup

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword (email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio:signupForm['signup-bio'].value
        }).then(() => {
            const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        });
       
    });
});
  
    // logout
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut();
    });
    
    // login 
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // get user info
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;

        auth.signInWithEmailAndPassword(email, password).then(cred => {
            // console.log(cred.user)
            // close the login modal and reset the form 
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        })

    })




