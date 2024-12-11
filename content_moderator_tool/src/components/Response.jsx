import React from "react";
import styles from "../cssModules/Response.module.css";

export default function Response({ flaggedField, flaggedFieldScore, message }) {
    return (
        <div className={styles.ResponseClass}>
            {flaggedField ? (
                <>
                    <div>
                        FLAGGED FIELD = {flaggedField}
                    </div>
                    <div>
                        FLAGGED FIELD SCORE = {flaggedFieldScore}
                    </div>
                </>
            ) : (
                <div>{message}</div>
            )}
        </div>
    );
}