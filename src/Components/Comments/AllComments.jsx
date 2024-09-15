import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Comment from './Comment';

const AllComments = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const q = query(collection(db, "posts", postId, "comments"));
            const querySnapshot = await getDocs(q);
            const commentsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(commentsData.sort((a, b) => b.timestamp - a.timestamp).reverse());
        };

        fetchComments();
    }, [postId,comments]);

    return (
        comments.map(comment => (
            <Comment key={comment.id} postId={postId} comment={comment} />
        ))
    );
};

export default AllComments;
