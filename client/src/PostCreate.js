import React, { useState } from "react";
import axios from 'axios'

const PostCreate = () => {
    const [title , setTitle] = useState('')
    
    const onSubmit = async (event) => {
        event.preventDefault()
        await axios.post('http://localhost:4000/posts', {title})
        setTitle('')
    }

    return(
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Create a post</label>
                <input  
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="form-control" 
                    placeholder="Title"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default PostCreate;