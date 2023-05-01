import "../styles/Topic.css";

const Topic = ({ handlePop, handleDsa }) => {
  return (
    <div className="topicBack">
      <div className="topicCont">
        <button onClick={() => handlePop()}>Principles of Programming</button>
        <button onClick={() => handleDsa()}>
          Data Structures & Algorithms
        </button>
      </div>
    </div>
  );
};

export default Topic;
