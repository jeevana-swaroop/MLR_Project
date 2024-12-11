import React from "react";
import styles from "../cssModules/Title.module.css";


export default function Title({heading}) {

    return (
        <div className={styles.TitleClass}>
            {heading}
        </div>
    );

}