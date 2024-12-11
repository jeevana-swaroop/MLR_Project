import React, { useState } from "react";
import styles from "../cssModules/Body.module.css";
import Prompt from "../components/Prompt";
import Title from "./Title";
import Classifier from "../components/Classifier";

export default function Body() {
    const [userMessage, setUserMessage] = useState("");
    const [click, setClick] = useState(false);

    const handleInputChange = (e) => {
        setUserMessage(e.target.value);
    };

    const handleSubmit = () => {
        if (userMessage.trim() === "") {
            alert("Please enter a message before submitting.");
            return;
        }

        setClick(false);
        console.log("Resetting classifier...");

        setTimeout(() => {
            setClick(true);
            console.log("Classifier reset and triggered!");
        }, 0);
    };

    const handleProcessed = () => {
        setClick(false);
    };

    const HEADING = "CONTENT MODERATOR APPLICATION";

    return (
        <div className={styles.BodyClass}>
            <Title heading={HEADING} />
            <Prompt onInputChange={handleInputChange} onSubmit={handleSubmit} />
            {click && (
                <Classifier
                    userMessage={userMessage}
                    onProcessed={handleProcessed}
                />
            )}
        </div>
    );
}