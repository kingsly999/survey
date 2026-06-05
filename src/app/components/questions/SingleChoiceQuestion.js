const SingleChoiceQuestion = ({ 
  options, 
  answer, 
  customInput, 
  hasOtherOption, 
  isLoading, 
  onAnswer, 
  onCustomInput 
}) => {
  const isOtherSelected = (option) => {
    if (option.includes("Other")) {
      return answer === option || (answer && answer.startsWith("Other:"));
    }
    return answer === option;
  };

  return (
    <div className="space-y-2">
      {options.map((option, index) => {
        const selected = isOtherSelected(option);
        
        return (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={isLoading}
            className={`w-full p-3 text-left border cursor-pointer rounded-md transition-all duration-200 text-black text-sm ${
              selected
                ? "border-black bg-black text-white"
                : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full border mr-3 ${
                  selected
                    ? "border-white bg-white"
                    : "border-gray-400"
                }`}
              >
                {selected && (
                  <div className="w-1 h-1 bg-black rounded-full m-auto mt-1"></div>
                )}
              </div>
              <span>{option}</span>
            </div>
          </button>
        );
      })}

      {/* Custom input for "Other" option */}
      {hasOtherOption && isOtherSelected(options.find(opt => opt.includes("Other"))) && (
        <div className="mt-4">
          <input
            type="text"
            value={customInput}
            onChange={(e) => onCustomInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none transition-colors text-black text-sm"
            placeholder="Please specify..."
          />
        </div>
      )}
    </div>
  );
};

export default SingleChoiceQuestion;