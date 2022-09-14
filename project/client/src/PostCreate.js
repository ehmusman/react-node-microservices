import React, {useState} from 'react'
import axios from "axios"
const PostCreate = () => {
    const [title, setTitle] = useState("")

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:4000/posts", {title})
        setTitle("")
    }
    return (
        <form onSubmit={handleOnSubmit}>
            <div className="form-group">
                <label htmlFor="Post-Title">Post Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="form-control" type="text" id="Post-Title" placeholder="Post Title" />
            </div>
            <input type="submit" defaultValue="Submit" className="btn btn-primary" />
        </form>
    )
}

export default PostCreate
