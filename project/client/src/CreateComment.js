import React, {useState} from 'react'
import axios from "axios"
const CreateComment = ({postId}) => {
    const [content, setContent] = useState("")

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`http://posts.com/posts/${postId}/comments`, {content})
        setContent("")
    }
    return (
        <form onSubmit={handleOnSubmit}>
            <div className="form-group">
                <input value={content} placeholder='Create New Comment' onChange={e => setContent(e.target.value)} className="form-control" id="comment"/>
            </div>
            <input type="submit" className="btn btn-primary" />
        </form>
    )
}

export default CreateComment
