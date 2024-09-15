import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Post from './Post';

const AllPosts = () => {
    const [post,setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "posts"));
            const postsData = querySnapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
                likedBy: data.likedBy,
                comments: data.comments
              };
            });
            setPosts(postsData.sort((a, b) => b.timestamp - a.timestamp));  // Trier les posts par date décroissante
          };
      
          fetchPosts();
      }, []);
    return (
            post.map((pt,i) => <Post key={i} post={pt}/>)
    );
}

export default AllPosts;
