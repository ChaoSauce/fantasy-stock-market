import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function userAuthListener() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }

      setLoaded(true);
    })

    return () => listener();
  }, [firebase])

  return { user, loaded };
}
