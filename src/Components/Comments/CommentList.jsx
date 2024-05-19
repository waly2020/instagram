import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Comment from './Comment';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const q = query(collection(db, "posts", postId, "comments"));
            const querySnapshot = await getDocs(q);
            const commentsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(commentsData);
        };

        fetchComments();
    }, [postId]);

    return (
        <div>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <Comment key={comment.id} commentId={comment.id} text={comment.text} userId={comment.userId} postId={postId} />
                ))
            ) : (
                <p>No comments...</p>
            )}
        </div>
    );
};

export default CommentList;
