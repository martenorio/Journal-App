import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";


describe( 'authSlice tests' , () => {
    
    test( 'should return initial state and be called auth', () => {
        const state = authSlice.reducer( initialState, {} );
        
        expect( state ).toEqual( initialState );
        expect( authSlice.name ).toBe( 'auth');
    });

    test( 'should authenticate', () => {
        const state = authSlice.reducer( initialState, login( demoUser) );
        expect( state ).toEqual({
            status: 'authenticated', //,'not-authenticated', 'checking', 'authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        })
    });

    test( 'should logout with arguments', () => { 
        const state = authSlice.reducer( authenticatedState,logout() );
        expect( state ).toEqual({
            status: 'not-authenticated', //,'not-authenticated', 'checking', 'authenticated'
            uid:null,
            email:null,
            displayName:null,
            photoURL:null,
            errorMessage:undefined,
        })
    })

    test( 'should logout without arguments', () => {
        const errorMessage = 'Credenciales no son correctas';
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );
        expect( state ).toEqual({
            status: 'not-authenticated', //,'not-authenticated', 'checking', 'authenticated'
            uid:null,
            email:null,
            displayName:null,
            photoURL:null,
            errorMessage:errorMessage,
        });
    })

    test( 'should change the state checking', () => { 
        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe( 'checking' );
    })
});