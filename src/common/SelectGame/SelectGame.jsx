import React, { useEffect, useState } from 'react';

export const SelectGame = ({title, name, gamesDataMap, seasonsData, teamsData, required, error, changeFunction, blurFunction}) => {

    const dataMapping = gamesDataMap;

    const [ seasonId, setSeasonId] = useState([]);
    const [ seasonDate, setSeasonDate] = useState('');


    const [ myRivalId, setMyRivalId ] = useState('');
    const [ myRivalName, setMyRivalName ] = useState('');
    const [ myTeam, setMyTeam ] = useState('');

    useEffect(() =>{
        console.log(dataMapping);
        console.log(seasonId);
        console.log(teamsData);

        for (let i = 0 ; i < dataMapping?.length ; i++) {
            
            setSeasonId((prevState)=>(
                    {
                        ...prevState,
                        [i]: dataMapping[i].season_id
                    }
                )
            );            
        }
    }, [])

    return (
        <>
        <div className='font fw-bold'>{title}</div>
        <select name={name} className={'form-select my-1 py-2'} required={required} onChange={changeFunction} onBlur={blurFunction}>
            <option value={"default"} >----------</option>
                {
                    dataMapping.map(data => 
                            {
                                return <option  key={data.id} value={data.id}>
                                            {data.id}
                                        </option>
                            }
                        )
                }
            </select>
            <div>{error}</div>
    </>
    )
}
