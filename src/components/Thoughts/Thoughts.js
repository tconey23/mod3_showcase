import './Thoughts.css'
import React, {useEffect} from 'react';
import { useGlobalProp } from '../../index';
import { deleteThought } from '../../ApiCalls';

const Thoughts = () =>  {

    let thoughtList = []
    const { allThoughts, userId, setAllThoughts } = useGlobalProp()

    const deleteThisThought = async (event) => {
        const newThoughts = await deleteThought(userId, event.target.parentNode.textContent.replace(/🗑/g, ''))
        setAllThoughts(newThoughts)
    }

    if(allThoughts['thoughts']) {
        thoughtList = allThoughts['thoughts'].map((thought, index) =>  {
            return (
                <div
                className='favs-thoughts'
                    id={`thought${index}`}
                    key={index}>  
                   <button onClick={(event) => deleteThisThought(event)}>🗑</button>
                   {thought} 
                </div>
                )
        })
        allThoughts['thoughts'].forEach((thought) => console.log(thought.thisThought))
    }

    return (

            <div id='thoughtList'>
                <h4>Your thoughts</h4>
                {thoughtList} 
            </div>
    )
}
export default Thoughts