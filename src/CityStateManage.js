import React, { useState } from 'react';

const CityStateManage = () => {
    const [stateInput, setStateInput] = useState('');
    const [states, setStates] = useState([]); // Array to store unique states for dropdown
    const [values, setValues] = useState([]); // Array to store state-city pairs for table
    const [dropDownValue, setDropDownValue] = useState('');
    const [cityInput, setCityInput] = useState('');
    // const [editIndex, setEditIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    // Handle state input field
    const handleOnChange = (e) => {
        setStateInput(e.target.value);
    };

    // Handle dropdown selection
    const handleDropDown = (e) => {
        setDropDownValue(e.target.value);
    };

    // Handle city input field
    const handleOnChangeCity = (e) => {
        setCityInput(e.target.value);
    };

    // Add unique state to the dropdown options
    const handleAddState = (e) => {
        e.preventDefault();
        if (stateInput && !states.includes(stateInput)) { // Check for duplicates
            setStates([...states, stateInput]); // Add new state to dropdown
            setStateInput(''); // Reset state input field
        }
    };


    // Add or update city in the state list
    const handleAddCity = (e) => {
        e.preventDefault();
        if (dropDownValue && cityInput) {
            if (editIndex !== null) {
                // Update existing city entry
                const updatedValues = values.map((item, index) =>
                    index === editIndex ? { state: dropDownValue, city: cityInput } : item
                );
                setValues(updatedValues);
                setEditIndex(null); // Exit edit mode
            } else {
                // Add new city entry
                setValues([...values, { state: dropDownValue, city: cityInput }]);
            }
            setCityInput('');
            setDropDownValue('');
        }
    };

    const HandleDelete = (id) => {
        setValues(values.filter((_, index) => id !== index))

    }
    const HandleEdit = (index) => {
        const itemToEdit = values[index];
        setDropDownValue(itemToEdit.state);
        setCityInput(itemToEdit.city);
        setEditIndex(index);
    }
    


    return (
        <>
            <div>
                <input
                    type="text"
                    onChange={handleOnChange}
                    placeholder="Enter state"
                    value={stateInput}
                />
                <button onClick={handleAddState}>Add State</button>
            </div>
            <div>
                <select name="state" id="state" onChange={handleDropDown} value={dropDownValue}>
                    <option value="" disabled>Select state</option>
                    {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={cityInput}
                    onChange={handleOnChangeCity}
                />
                <button onClick={handleAddCity}>
                    {editIndex !== null ? 'Update City' : 'Add City'}
                </button>
                
            </div>

            {/* Display data in a table */}
            <table border="1">
                <thead>
                    <tr>
                        <th>State</th>
                        <th>City</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {values.map((item, index) => (
                        <tr key={index}>
                            <td>{item.state}</td>
                            <td>{item.city}</td>
                            <td><th><button onClick={() => HandleEdit(index)}>Edit</button></th>
                                <th><button onClick={() => HandleDelete(index)}>Delete</button></th></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default CityStateManage;
