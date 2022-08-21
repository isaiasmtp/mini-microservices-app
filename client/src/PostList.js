import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = () => {
    const [posts, setPosts] = useState({})

    useEffect(()=> {
        const req = async () => {
            const res = await axios.get('http://localhost:4000/posts')
            setPosts(res.data);
        }
        req()
    },[])


    return <div className='d-flex flex-row flex-wrap justify-content-between'>
        { posts &&
            Object.values(posts).map((post)=> {
                return (
                <div 
                className='card'
                key={post.id}
                style={{width:'30%',marginBottom:'20px' ,padding:'1em'}}
                > 
                <div className='card-body'>
                    <h3>{post.title}</h3>
                    <CommentList  postId={post.id}/>
                    <hr />
                    <CommentCreate postId={post.id}/>
                </div>
                    
                </div>)
            })
        }
    </div>
}

export default PostList;