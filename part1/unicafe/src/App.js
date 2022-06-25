import { useState } from "react";

const Button = (props) => {
    return <button onClick={(e) => props.onClick()}>{props.children}</button>;
};

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td> <td>{props.value}</td>
        </tr>
    );
};

const Statistics = (props) => {
    const sum = () => {
        return props.good + props.neutral + props.bad;
    };
    const average = () => {
        return (props.good - props.bad) / sum();
    };
    const positive = () => {
        return props.good / sum();
    };

    return (
        <>
            <h1>Statistics</h1>
            {props.good || props.neutral || props.bad ? (
                <table>
                    <tbody>
                        <StatisticLine text={"Good"} value={props.good} />
                        <StatisticLine text={"Neutral"} value={props.neutral} />
                        <StatisticLine text={"Bad"} value={props.bad} />
                        <StatisticLine text={"All"} value={sum()} />
                        <StatisticLine text={"Average"} value={average()} />
                        <StatisticLine text={"Positive"} value={positive()} />
                    </tbody>
                </table>
            ) : (
                <span>No feedback given</span>
            )}
        </>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>Give Feedback</h1>
            <span>
                <Button onClick={(e) => setGood(good + 1)}>good</Button>
                <Button onClick={(e) => setNeutral(neutral + 1)}>
                    neutral
                </Button>
                <Button onClick={(e) => setBad(bad + 1)}>bad</Button>
            </span>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
