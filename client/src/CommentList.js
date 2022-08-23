import React from 'react'

const CommentList = ({ comments }) => {
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