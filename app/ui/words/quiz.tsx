"use client";
import { useState, useEffect } from "react";

export default function Quiz() {
    const [question, setQuestion] = useState(null);
    const [meanings, setMeanings] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(true);
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
    console.log(host);
    useEffect(() => {
        fetch(`${host}/words/quiz`)
            .then((res) => res.json())
            .then((data) => {
                setQuestion(data.word);
                setLoading(false);
                setMeanings(data.meanings);
            });
    }, []);

    const checkAnswer = async (answer: string) => {
        const response = await fetch(`${host}/words/check`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ word: question, meaning: answer}),
        });
        const data = await response.json();
        setFeedback(data ? "✅ Correct" : "❌ Incorrect");
    };

    const newQuiz = async () => {
        await fetch(`${host}/words/quiz`).then((res) => res.json()).then((data) => {
            setQuestion(data.word);
            setMeanings(data.meanings);
            setFeedback("");
            setSelectedAnswer("");
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <div className="max-w-md mx-auto p-4 rounded shadow-md">
                <h2 className="text-lg font-semibold">What is the correct answer?</h2>
                <p className="italic my-2">{question}</p>
                <div className="grid grid-cols-2 gap-2">
                    {meanings.map((meaning: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => {
                                setSelectedAnswer(meaning);
                            }}
                            className={`p-2 border rounded ${selectedAnswer === meaning ? "bg-gray-300" : "bg-white"} hover:bg-gray-200`}
                        >
                            {meaning}
                        </button>
                    ))}
                </div>
                {feedback && <p className="mt-4 font-semibold">{feedback}</p>}
                
            </div>
            <div className="max-w grid grid-cols-2 gap-2">
                <button className="p-2 rounded hover:bg-gray-200" onClick={() => checkAnswer(selectedAnswer)}>Submit</button>
                <button className="p-2 rounded hover:bg-gray-200" onClick={() => newQuiz()}>New Question</button>
            </div>
        </div>
    );
}