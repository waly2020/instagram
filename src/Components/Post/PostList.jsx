import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
//import { formatDistanceToNow } from 'date-fns';
import Post from './Post';  // Importez le composant Post

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
          likedBy: data.likedBy || [],  // S'assurer que likedBy est toujours un tableau
          comments: data.comments || []  // S'assurer que comments est toujours un tableau
        };
      });
      setPosts(postsData.sort((a, b) => b.timestamp - a.timestamp));  // Trier les posts par date décroissante
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          photoURL={post.photoURL}
          caption={post.caption}
          likedBy={post.likedBy}
          userId={post.userId}
          timestamp={post.timestamp}
        />
      ))}
    </div>
  );
};

export default PostList;
