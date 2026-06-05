const TextQuestion = ({ answer, onAnswer, onTextComplete, onNext }) => {
  return (
    <div>
      <input
        type="text"
        value={answer}
        onChange={(e) => onAnswer(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter" && answer.trim()) {
            await onTextComplete();
            onNext();
          }
        }}
        className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none transition-colors text-black text-sm"
        placeholder="Enter your name..."
      />
    </div>
  );
};

export default TextQuestion;