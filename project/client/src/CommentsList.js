import React from "react";
const CommentsList = ({ comments }) => {

    function checkCommentVisibility(status, content){
        if(status === "pending"){
            return "This Comment awaiting moderation"
        }else if(status === "approved"){
            return content
        }else if(status === "rejected"){
            return "This comment has beed rejected"
        }
    }
    return (
        <ul className="list-group">
            {comments && comments.map(comment => (
                <li className={`list-item ${comment.status === "rejected" ? "text-danger" : ""}`} key={comment.id}>{checkCommentVisibility(comment.status, comment.content)}</li>
            ))}
        </ul>
    );
};

export default CommentsList;
