import React from 'react';
import TextQuestion from './questions/TextQuestion';
import SingleChoiceQuestion from './questions/SingleChoiceQuestion';
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion';
import CombinedProficiencyQuestion from './questions/CombinedProficiencyQuestion';

const QuestionRenderer = ({
  currentQuestion,
  currentQuestionData,
  answers,
  customInputs,
  newsletterId,
  isLoading,
  onAnswer,
  onCustomInput,
  onTextComplete,
  onNext,
  currentToolCategory,
  onCategoryChange
}) => {
  if (!currentQuestionData) return null;

  const IconComponent = currentQuestionData.icon;

  return (
    <div className="relative overflow-hidden">
      <div key={currentQuestion} className="mb-8">
        <div className="flex flex-col mb-6">
          {/* Welcome message for Q1 */}
          {currentQuestion === 1 && (
            <div className="text-center text-gray-600 text-sm mb-4 space-y-2">
              <p>
                Welcome to <span className="font-semibold">The YouPowerQ</span>!
              </p>
              <p>
                You have successfully subscribed to{" "}
                <span className="font-semibold">The YouPowerQ newsletter</span>.
              </p>
              <p>
                Complete our quick form, and we'll find the best AI tools and resources
                for your needs.
              </p>
            </div>
          )}

          {/* Welcome message with name for Q2+ */}
          {currentQuestion === 2 && answers[1] && (
            <p className="text-gray-600 text-sm mb-2">
              👋 Welcome, <span className="font-semibold">{answers[1]}</span>!
            </p>
          )}

          {/* Question header with icon */}
          <div className="flex items-center">
            {IconComponent && (
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <IconComponent className="w-4 h-4 text-black" />
              </div>
            )}
            <h2 className="text-lg font-semibold text-black">
              {currentQuestionData.text}
            </h2>
          </div>
        </div>

        {/* Render appropriate question type */}
        {currentQuestionData.type === "text" && (
          <TextQuestion
            answer={answers[currentQuestion] || ""}
            onAnswer={onAnswer}
            onTextComplete={onTextComplete}
            onNext={onNext}
          />
        )}

        {currentQuestionData.type === "single" && (
          <SingleChoiceQuestion
            options={currentQuestionData.options}
            answer={answers[currentQuestion]}
            customInput={customInputs[currentQuestion] || ""}
            hasOtherOption={currentQuestionData.hasOtherOption}
            isLoading={isLoading}
            onAnswer={onAnswer}
            onCustomInput={(value) => onCustomInput(currentQuestion, value)}
          />
        )}

        {currentQuestionData.type === "multiple" && (
          <MultipleChoiceQuestion
            options={currentQuestionData.options}
            answers={answers[currentQuestion] || []}
            newsletterId={newsletterId}
            isLoading={isLoading}
            onAnswer={onAnswer}
            currentQuestion={currentQuestion}
            currentToolCategory={currentToolCategory}
            onCategoryChange={onCategoryChange}
          />
        )}

        {currentQuestionData.type === "combined_proficiency" && (
          <CombinedProficiencyQuestion
            options={currentQuestionData.options}
            answer={answers[currentQuestion]}
            isLoading={isLoading}
            onAnswer={onAnswer}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionRenderer;