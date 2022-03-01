import React, {useState} from 'react';
import styles from './UserInputs.module.scss';

function UserInputs({searchCity}) {

    const [currentCity, setCurrentCity] = useState("");
    const [buttonState, setButtonState] = useState(true);

    const handleInputChange = (e) => {
        if (e.target.value !== ""){
            setCurrentCity(e.target.value);
            setButtonState(false)
        } else {
            setCurrentCity("");
            setButtonState(true)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter"){
            handleButtonClick();
        }
    }

    const handleButtonClick = () => {
        setCurrentCity("");
        setButtonState(true)
        searchCity(currentCity);
    }

    return (
        <>
            <div className={styles.inputContainer}>
                <input className={styles.textInput} value={currentCity} onKeyPress={handleKeyPress} onChange={handleInputChange}/>
                <button className={!buttonState ? styles.btn__enable : styles.btn__disable} onClick={handleButtonClick} disabled={buttonState}>Search</button>
            </div>

        </>
    );
}

export default UserInputs;
