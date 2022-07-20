import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils.js'
import './authentication.styles.css'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';
import SignInForm from '../../components/sign-in-form copy/sign-in-form.component'

const Authentication = () =>{
    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return(
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}
export default Authentication;