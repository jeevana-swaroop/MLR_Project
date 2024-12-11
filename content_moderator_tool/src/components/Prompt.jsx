import React from "react";
import styles from "../cssModules/Prompt.module.css";


export default function Prompt({onInputChange, onSubmit }) {
    return (
        <div className={styles.PromptClass}>
            <input
                type="text"
                placeholder="Type your prompt here"
                onChange={onInputChange}
            />
            <button type="button" onClick={onSubmit}>
                Submit
            </button>
        </div>
    );
}