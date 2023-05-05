import React, { useEffect, useState } from 'react';

export const Select = ({title, name, dataMap, required, changeFunction, blurFunction, error}) => {
    
    const dataMapping = dataMap

    const nameInput = name

    useEffect(() => {
        
    });

    return (
        <>
            <div className='font fw-bold'>{title}</div>
            <select name={nameInput} className={'form-select my-1 py-2'} required={required} onChange={changeFunction} onBlur={blurFunction}>
                <option value={"default"} >----------</option>
                    {
                        dataMapping.map(data => 
                                {
                                    return <option active key={data.id} value={data.id}>
                                                {data.season || data.team_name}
                                            </option>
                                }
                            )
                    }
                </select>
                <div>{error}</div>
        </>
    )
}
