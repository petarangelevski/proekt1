const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { user } = require("firebase-functions/v1/auth");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    //get user and add custom claim (admin)
    return admin.auth().getUserByEmail(data,email).then(user => {
        return admin.auth().setCustomUserClaims(usr.uid, {
            admin: true
        });
    }).then(() => {
        return{
            message:`Success! $for(data.email) has been made an admin `
        }
    }).catch(err =>{
        return err;
    });

});
