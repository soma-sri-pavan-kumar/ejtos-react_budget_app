import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = () => {
    const { dispatch, remaining, currency } = useContext(AppContext);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const submitEvent = () => {
        if (cost > remaining) {
            alert(`The value cannot exceed remaining funds ${currency}${remaining}`);
            setCost('');
            return;
        }
        const expense = {
            name: name,
            cost: parseInt(cost),
        };
        if (action === 'Reduce') {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }
    };

    return (
        <div>
            <div className='row'>
                <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add">Add</option>
                        <option value="Reduce">Reduce</option>
                    </select>
                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <span className="input-group-text">{currency}</span>
                    </div>
                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        className="form-control"
                        style={{ marginLeft: '2rem' }}
                        onChange={(event) => setCost(event.target.value)}
                    />
                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;

