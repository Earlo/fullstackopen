const Header = ({ course }) => <h1>{course}</h1>;

const Total = (props) => {
    const total = props.parts
        .map((part) => part.exercises)
        .reduce((a, b) => a + b);
    return <p>Number of exercises {total}</p>;
};

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Content = ({ parts }) => (
    <>
        {parts.map((part) => (
            <Part part={part} />
        ))}
    </>
);

export const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    );
};
