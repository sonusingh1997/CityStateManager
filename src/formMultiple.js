import React, { useState } from 'react'

const formMultiple = () => {
    const [stateInputs, setStateInputs] = useState({
         stateInput: "",
         cityInput: ""
    });
    const [values, setValues] = useState([]);
    console.log("values", values)

    const handleOnChange = (e) => {
        setStateInputs({...stateInputs,[e.target.name]:e.target.value})
    }

    const handleCities = (e) => {
        e.preventDefault();
        setValues([...values, stateInputs]);
        setStateInputs({
            stateInput: "",
            cityInput: ""
        })
    }

    return (
        <>
            <div>
                <input type="text" onChange={handleOnChange} name='stateInput' placeholder='Enter state' value={stateInputs.stateInput} />
                <input type="text" onChange={handleOnChange} name='cityInput' placeholder='Enter city' value={stateInputs.cityInput} />
                <button onClick={handleCities}>Add</button>
            </div>
        </>

    )
}

export default formMultiple