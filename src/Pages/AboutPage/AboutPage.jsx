import React, { useState } from 'react'
import {en_title, tr_title, en_description, tr_description} from "../../Utils/Language/About/language"
import "./AboutPage.css"

const AboutPage = () => {
    const [lang, setLang] = useState("en")

    

    return (
        <main className="about-page">
            <section className="container">
                <h2 className="about-title">{lang === "en" ? en_title : lang === "tr" ? tr_title : "Wrong language format."}</h2>
                <p className="about-description">{lang === "en" ? en_description : lang === "tr" ? tr_description : "Wrong language format."}</p>
            </section>

            <section className="language-buttons">
                <button onClick={() => setLang("en")}>EN</button>
                <button onClick={() => setLang("tr")}>TR</button>
            </section>
        </main>
    )
}

export default AboutPage