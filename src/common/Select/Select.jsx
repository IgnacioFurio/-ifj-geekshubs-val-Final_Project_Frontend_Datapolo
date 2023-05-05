import React, { useEffect, useState } from 'react';

export const Select = ({name, dataMap, changeFunction, blurFunction}) => {
    
    const dataMapping = dataMap

    const nameInput = name

    useEffect(() => {
        console.log(nameInput);
    });

    return (
        <>
            <select name={nameInput}  className={'form-select my-1 py-2'} onChange={changeFunction} onBlur={blurFunction}>
                <option value={"default"} >----------</option>
                    {
                        dataMapping.map(data => 
                                {
                                    return <option active key={data.id} value={data.id}>
                                                {data.team_name}
                                            </option>
                                }
                            )
                    }
                </select>
        </>
    )
}
