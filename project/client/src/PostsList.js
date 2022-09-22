import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import CommentsList from "./CommentsList";
const PostsList = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const { data } = await axios.get("http://posts.com/posts");
        const allPosts = Object.values(data.posts)
        setPosts(allPosts);
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className="row">
            {posts &&
                posts.map((post) => (
                    <div className="col-3" key={post.id}>
                        <div className="card">
                            <div className="card-header">{post.title}</div>
                            <div className="card-body">
                                <h6>New Comments</h6>
                                <CommentsList comments={post.comments} />
                            </div>
                            <div className="card-footer">
                                <CreateComment postId={post.id} />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default PostsList;
