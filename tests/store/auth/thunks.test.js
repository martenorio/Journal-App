import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSingIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Auth thunks tests', () => { 
    
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('should invoque checkingCredentials', async() => { 
        await checkingAuthentication()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
     });

     test('should invoque checkingCredentials and login - successfully', async() => { 
        const loginData = { ok: true, ...demoUser };
        await singInWithGoogle.mockResolvedValue( loginData );
        
        //thunk
        await startGoogleSingIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) );

      })

      test('should invoque checkingCredentials and logout - incorrectly', async() => { 
        const loginData = { ok: false, errorMessage: 'Error with network' };
        await singInWithGoogle.mockResolvedValue( loginData );
        
        //thunk
        await startGoogleSingIn()( dispatch );
        //console.log(logout(loginData));
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage) );

      })

      test( 'should invoque startLoginWithEmailAndPassword and login - successfully', async() => {
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

      })

      test( 'should invoque startLoginWithEmailAndPassword and logout  - incorrectly', async() => {
        const loginData = { ok: false, errorMessage: 'the email is incorrect' };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        const errorMessage = loginData.errorMessage;
        expect( dispatch ).toHaveBeenCalledWith( logout( {errorMessage} ) );

      })

      test( 'should invoque logoutFirebase, clearNotes and logout', async() => { 
        await startLogout()(dispatch);
        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout({}) );

      })

      test( 'should invoque startCreatingUserWithEmailPassword and login', async() => { 
        const createdUserData = { ok: true, uid: demoUser.uid, photoURL: demoUser.photoURL, email:demoUser.email, displayName:demoUser.displayName,};
        const formData = { email: demoUser.email, password: '123456', displayName:demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue( createdUserData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        delete createdUserData.ok;
        expect( dispatch ).toHaveBeenCalledWith( login( createdUserData ) );

      })

      test( 'should invoque startCreatingUserWithEmailPassword and logout  - incorrectly', async() => { 
        const createdUserData = { ok: false, errorMessage:'Campos vacíos'};
        const formData = { email: demoUser.email, password: '123456', displayName:demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue( createdUserData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        const errorMessage = createdUserData.errorMessage;
        expect( dispatch ).toHaveBeenCalledWith( logout({errorMessage}) );

      })
 })