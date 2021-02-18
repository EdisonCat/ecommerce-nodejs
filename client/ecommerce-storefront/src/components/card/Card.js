import React from 'react';
import './card.css';
export default function Card(props) {
    return (
        <div className={props.item.cardSize}>
            <h1>{props.item.description}</h1>
            <div className={"picture-block-" + props.item.cardSize}>
                <img src={props.item.link} />
            </div>
        </div>
    );
} 