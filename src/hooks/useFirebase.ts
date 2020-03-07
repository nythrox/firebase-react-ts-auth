import { useContext } from 'react';
import { FirebaseContext } from '../firebase';
export default function useFirebase() {
    const firebase = useContext(FirebaseContext)
    return firebase;
}