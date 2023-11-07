// useFirebaseCatalog.js
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export function useFirebaseCatalog(collectionName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     // const querySnapshot = await firestore().collection(collectionName).get();
    //     // const items = querySnapshot.docs.map((doc) => ({
    //     //   idDoc: doc.id,
    //     //   ...doc.data(),
    //     // }));
    //     setData(items);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching data: ', error);
    //     setLoading(false);
    //   }
    // };

    // if (loading) {
    //   fetchData();
    // }
    const unsubscribe = firestore()
      .collection(collectionName)
      .onSnapshot((querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          idDoc: doc.id,
          ...doc.data(),
        }));
        setData(items);
        setLoading(false);
      });
    return () => unsubscribe();
  }, [collectionName, loading]);

  return { data, loading };
}
