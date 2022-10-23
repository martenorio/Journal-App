export const initialState = {
    status: 'checking', //,'not-authenticated', 'checking', 'authenticated'
    uid:null,
    email:null,
    displayName:null,
    photoURL:null,
    errorMessage:null,
}

export const authenticatedState = {
    status: 'authenticated', //,'not-authenticated', 'checking', 'authenticated'
    uid:'ABC1234',
    email:'demo@gmail.com',
    displayName:'Demo User',
    photoURL:'https://foto.jpg',
    errorMessage:null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated', //,'not-authenticated', 'checking', 'authenticated'
    uid:null,
    email:null,
    displayName:null,
    photoURL:null,
    errorMessage:null,
}

export const demoUser = {
    uid:'ABC1234',
    email:'demo@gmail.com',
    displayName:'Demo User',
    photoURL:'https://foto.jpg',
    errorMessage:null,
}