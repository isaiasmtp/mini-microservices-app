import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        const req = async () => {
            const res = await axios.get(`http://localhost:4001/post/${postId}/comments`)
            setComments(res.data)
        }
        req()
    },[postId])

    return (<ul>
        { comments &&
            <span>{Object.values(comments).length} comments!</span>
        }
        
        { comments &&
            Object.values(comments).map((comment) => {
                return <li key={comment.id}>{ comment.content }</li>
            })
        }
    </ul>)
}

export default CommentList;