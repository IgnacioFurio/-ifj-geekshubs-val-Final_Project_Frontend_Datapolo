import React, { useEffect, useState } from 'react';

export const SelectNoDefault = ({title, name, dataMap, extraData, required, changeFunction, blurFunction, error}) => {
    
    const dataMapping = dataMap

    const nameInput = name

    return (
        <>
            <div className='font fw-bold'>{title}</div>
            <select name={nameInput} className={'form-select my-1 py-2'} required={required} onChange={changeFunction} onBlur={blurFunction}>
                <option value={0} >----------</option>
                    {
                        dataMapping.map(data => 
                                {
                                    return <option  key={data.id} value={data.id}>
                                                {data.season || data.team_name || data.name}
                                            </option>
                                }
                            )
                    }
                </select>
                <div>{error}</div>
        </>
    )
}
