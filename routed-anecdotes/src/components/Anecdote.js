import React from 'react'
import { useParams } from 'react-router'

const Anecdote = ({ anecdotes }) => {
    const id = parseInt(useParams().id)
    const anecdote = anecdotes.find(x => x.id === id)
    return (
        <>
            <h1>{anecdote.content}</h1>
            <p> has {anecdote.votes} votes</p>
            <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </>
    )
}

export default Anecdote