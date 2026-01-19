import React, { useState } from 'react';
import '../styles/main.css';

const ConfigModal = ({ currentDate, onSave, onClose }) => {
    // Initialize with current target date formatted for datetime-local input
    // Format: YYYY-MM-DDTHH:mm
    const formatDateForInput = (date) => {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString().slice(0, 16);
    };

    const [inputVal, setInputVal] = useState(formatDateForInput(currentDate));

    const handleSave = () => {
        const newDate = new Date(inputVal);
        if (!isNaN(newDate.getTime())) {
            onSave(newDate);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass">
                <h2>Set Countdown</h2>

                <div className="input-group">
                    <label>Target Date & Time</label>
                    <input
                        type="datetime-local"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                    />
                </div>

                <div className="modal-actions">
                    <button onClick={onClose} className="btn-cancel">Cancel</button>
                    <button onClick={handleSave} className="btn-save">Start Countdown</button>
                </div>
            </div>
        </div>
    );
};

export default ConfigModal;
