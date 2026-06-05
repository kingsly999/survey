import { ChevronLeft, Loader2 } from 'lucide-react';

const NavigationButtons = ({
  currentQuestion,
  currentQuestionData,
  answers,
  customInputs,
  totalQuestions,
  isLoading,
  onPrevious,
  onNext,
  currentToolCategory,
  isToolsQuestion
}) => {
  // Check if continue button should be enabled
  const canContinue = () => {
    if (!currentQuestionData) return false;

    const answer = answers[currentQuestion];

    // Text input
    if (currentQuestionData.type === "text") {
      return answer?.trim();
    }

    // Single choice
    if (currentQuestionData.type === "single") {
      if (!answer) return false;
      
      // If "Other" option is selected, check custom input
      if (currentQuestionData.hasOtherOption && 
          answer.includes("Other") && 
          !customInputs[currentQuestion]?.trim()) {
        return false;
      }
      
      return true;
    }

    // Multiple choice (optional - always allow continue)
    if (currentQuestionData.type === "multiple") {
      return true;
    }

    // Combined Proficiency (require all fields)
    if (currentQuestionData.type === "combined_proficiency") {
      if (!answer || typeof answer !== 'object') return false;
      return answer.AI && answer.QC && answer.ET;
    }

    return false;
  };

  // Get button text based on context
  const getButtonText = () => {
    if (isToolsQuestion) {
      if (currentToolCategory === 'AI') return 'Continue to QC';
      if (currentToolCategory === 'QC') return 'Continue to ET';
      if (currentToolCategory === 'ET') {
        return currentQuestion === totalQuestions ? 'Submit' : 'Continue';
      }
    }
    return currentQuestion === totalQuestions ? 'Submit' : 'Continue';
  };

  return (
    <div className="bg-white border-t border-gray-100 px-4 py-6 sticky bottom-0 shadow-lg">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        {/* Back Button */}
        {currentQuestion > 1 || (isToolsQuestion && currentToolCategory !== 'AI') ? (
          <button
            onClick={onPrevious}
            disabled={isLoading}
            className="flex items-center text-gray-600 cursor-pointer hover:text-black transition-colors text-sm disabled:opacity-50 font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        ) : (
          <div></div>
        )}

        {/* Continue Button */}
        {canContinue() && (
          <button
            onClick={onNext}
            disabled={isLoading}
            className="bg-black text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 flex items-center"
          >
            {isLoading && <Loader2 className="w-3 h-3 mr-2 animate-spin" />}
            {getButtonText()}
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;