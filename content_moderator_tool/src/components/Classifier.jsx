import React, { useState, useEffect } from "react";
import styles from "../cssModules/Classifier.module.css";
import Response from "./Response";

export default function Classifier({ userMessage, onProcessed }) {
    const [responseData, setResponseData] = useState({
        categories: {
            harassment: false,
            harassment_threatening: false,
            hate: false,
            hate_threatening: false,
            illicit: false,
            illicit_violent: false,
            self_harm: false,
            self_harm_instructions: false,
            self_harm_intent: false,
            sexual: false,
            sexual_minors: false,
            violence: false,
            violence_graphic: false
        },
        categories_score: {
            harassment: 0,
            harassment_threatening: 0,
            hate: 0,
            hate_threatening: 0,
            illicit: 0,
            illicit_violent: 0,
            self_harm: 0,
            self_harm_instructions: 0,
            self_harm_intent: 0,
            sexual: 0,
            sexual_minors: 0,
            violence: 0,
            violence_graphic: 0
        },
        flagged: false
    });

    const [flaggedField, setFlaggedField] = useState("");
    const [flaggedFieldScore, setFlaggedFieldScore] = useState("");


    const getResults = async () => {
        try {
            if (userMessage.trim() === "") return; // Don't fetch if message is empty

            const response = await fetch("http://localhost:8000/moderate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) {
                console.error("Error:", response.statusText);
                return;
            }

            const responseJSON = await response.json();
            setResponseData(responseJSON);

            if (responseJSON.flagged) {
                const flaggedCategories = Object.keys(responseJSON.categories).filter(
                    (key) => responseJSON.categories[key] === true
                );

                if (flaggedCategories.length > 0) {
                    const flaggedCategory = flaggedCategories[0];
                    const score = responseJSON.categories_score[flaggedCategory];

                    setFlaggedField(flaggedCategory);
                    setFlaggedFieldScore(score);
                }
            }

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };


    useEffect(() => {
        getResults();
    }, []);


    return (
        <div className={styles.ClassifierClass}>
            {flaggedField ? (
                <Response flaggedField={flaggedField} flaggedFieldScore={flaggedFieldScore} message="" />
            ) : (
                <Response flaggedField="" flaggedFieldScore="" message="Sentence does not have flagged keywords" />
            )}
        </div>
    );
}