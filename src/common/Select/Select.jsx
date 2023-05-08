import React, { useEffect, useState } from 'react';

export const Select = ({title, name, dataMap, extraData, required, changeFunction, blurFunction, error}) => {
    
    const dataMapping = dataMap

    const nameInput = name

    useEffect(() => {
        // console.log(dataMap);
        // console.log(extraData);
        
        // for (let i = 0 ; i < extraData?.length ; i++) {
            
        //     if(gameId === gamesData[i]?.id){
                
        //         setMyRivalId(gamesData[i]?.my_rival_id)
        //         setSeasonId(gamesData[i]?.season_id)
                
        //     }
            
        // }

        // for (let i = 0 ; i < seasonsData?.length ; i++) {

        //     if(seasonId === seasonsData[i]?.id){

        //         setSeasonDate(seasonsData[i]?.season)

        //     }

        // }

    });

    return (
        <>
            <div className='font fw-bold'>{title}</div>
            <select name={nameInput} className={'form-select my-1 py-2'} required={required} onChange={changeFunction} onBlur={blurFunction}>
                <option value={"default"} >----------</option>
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
