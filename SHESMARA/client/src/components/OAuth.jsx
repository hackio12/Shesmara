import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {getAuth} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const handleGoogleClick = async () =>{
        try{
            const Provider = new GoogleAuthProvider();
            const auth= getAuth(app)

            const result =await signInWithPopup(auth,Provider)

            const res = await fetch ('/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo:result.user.photoURL }),
            })
            const data =await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch(error){
            console.log('could not sign in with google',error);
        }
    }
  return (
    <button className='w-full px-8 py-0.2 font-bold text-start' onClick={handleGoogleClick} type='button' >Continue with Google</button>
  )
}
