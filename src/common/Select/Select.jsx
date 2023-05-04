import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const Select = ({name, required, error, blurFunction}) => {
    
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
        <>
            <h4 className='font fw-bold'>{nameConversor(name)}</h4>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    ---
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                <Dropdown.Item active>
                    Action
                </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>{error}</div>
        </>
    )
}
