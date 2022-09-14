import React from "react";
const CommentsList = ({ comments }) => {
    return (
        <ul className="list-group">
            {comments && comments.map(comment => (
                <li className="list-item" key={comment.id}>{comment.content}</li>
            ))}
        </ul>
    );
};

export default CommentsList;
