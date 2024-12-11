import styles from '../cssModules/App.module.css';
import React from "react";
import Body from "./Body";

export default function App() {
    return (
        <div className={styles.AppClass}>
            <Body>
                CONTENT MODERATION TOOL
            </Body>
        </div>
    );

}