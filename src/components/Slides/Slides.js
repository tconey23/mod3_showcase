import './Slides.css'
import { useRef } from 'react'
import { NavLink } from 'react-router-dom';

function Slides({id, name, available}) {

    return (
        <div id="slide">
            <NavLink to={`/${name}`} />
            <h3>{name}</h3>
            <p>{available}</p>
        </div>
    )

}

export default Slides