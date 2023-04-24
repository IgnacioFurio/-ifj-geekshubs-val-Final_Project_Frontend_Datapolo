import React from 'react'
import Form from 'react-bootstrap/Form';


export const Input = ({className, type, name, placeholder, required, error, changeFunction, blurFunction}) => {
    
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
        <Form>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                <Form.Label className='font fw-bold'>{nameConversor(name)}</Form.Label>
                <Form.Control 
                    className={className} 
                    type={type} 
                    name={name} 
                    placeholder={placeholder} 
                    required={required}
                    onChange={(e)=>changeFunction(e)}
                    onBlur={(e)=>blurFunction(e)}
                    maxLength={30}
                />
                <div>{error}</div>
            </Form.Group>
        </Form>
    )
}
