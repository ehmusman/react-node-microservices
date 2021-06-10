import React, { useState, useEffect } from "react";
import axios from "axios"
const CommentsList = ({ postId }) => {
    const [comments, setComments] = useState([])
    const fetchComments = async e => {
        const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
        setComments(data)
    }
    useEffect(() => {
        fetchComments()
    }, [])
    console.log(comments)
    return (
        <ul className="list-group">
            {comments && comments.map(comment => (
                <li className="list-group-item" key={comment.id}>{comment.content}</li>
            ))}
        </ul>
    );
};

export default CommentsList;
