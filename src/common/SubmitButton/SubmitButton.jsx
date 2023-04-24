import React from 'react'
import './SubmitButton.css'

export const SubmitButton = ({name, className, clickFunction}) => {

    const nameConversor = (name) => {

        let upperName = name.charAt(0).toUpperCase() + name.slice(1);

        let splitUpperName = upperName.split("_")

        let inputName = splitUpperName.join([" "])

        
        if( upperName === "Password2"){
            inputName = 'Confirm Password';
        };

        return inputName;
    };

    return (
        <div 
            className={className}
            onClick={clickFunction}>
                {nameConversor(name)}
        </div>
    )
}
