export const CircularProgressBar = () => {
  return (
    <div className="timeLine-Circular">
      <svg
        width="200"
        height="200"
        viewBox="0 0 100 100"
      >
        <circle
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        ></circle>
        <circle
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        ></circle>
      </svg>
    </div>
  );
};
