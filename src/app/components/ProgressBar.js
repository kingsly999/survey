const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className="mt-10 mb-6">
      <div className="max-w-lg mx-auto px-4">
        <div className="mb-2">
          <div className="bg-gray-200 rounded-full h-1">
            <div
              className="bg-black h-1 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>Question {currentQuestion} of {totalQuestions}</span>
          <span>{Math.round((currentQuestion / totalQuestions) * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;