import "./UndefindPage.css"
import { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";

function UndefindPage() {
    const Oops = ['O', 'o', 'p', 's', '😕', '!', ' ', 'P', 'a', 'g', 'e', ' ', 'n', 'o', 't', ' ', 'F', 'o', 'u', 'n', 'd', '!']
    const Error404 = ['4', '0', '4']

    let [i, setI] = useState(0);
    let [j, setJ] = useState(0)

    let [text, setText] = useState("");

    let [errorText, setErrorText] = useState("")

    useEffect(() => {
        const timer = setInterval(() => {
            if (i <= Oops.length - 1) {
                setText(text + Oops[i])
                setI(prev => prev + 1)
            }
        }, 200)

        return () => clearInterval(timer);
    }, [i])

    useEffect(() => {
        const timer = setInterval(() => {
            if (j <= Error404.length - 1) {
                setErrorText(errorText + Error404[j])
                setJ(prev => prev + 1)
            }
        }, 300)

        return () => clearInterval(timer)
    }, [j])


    return (
        <>
            <Header></Header>
            <div className="not__found">
                <div className="E404">
                    {errorText}
                </div>
                <div className="oops__text">
                    {text}
                </div>
            </div>

        </>
    );
}

export default UndefindPage;