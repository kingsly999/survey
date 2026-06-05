import { useEffect } from 'react';
import { Check, Mail, Brain, Atom, Sparkles } from 'lucide-react';
import { getNewsletterOptions } from '../../utils/config';

const MultipleChoiceQuestion = ({ 
  options, 
  answers, 
  newsletterId, 
  isLoading, 
  onAnswer,
  currentQuestion,
  currentToolCategory,
  onCategoryChange
}) => {
  // Get dynamic options for newsletter question
  const displayOptions = options.length === 0 
    ? getNewsletterOptions(newsletterId) 
    : options;

  // Check if this is the tools question by checking if options include known tool categories
  const isToolsQuestion = options.includes("ChatGPT") || options.includes("IBM Quantum Lab / Qiskit");

  // Categorize tools
  const toolsByCategory = {
    AI: [
      "ChatGPT",
      "Claude AI",
      "Google Gemini",
      "DALL·E / MidJourney",
      "Canva AI",
      "GitHub Copilot",
      "HuggingFace Transformers",
      "TensorFlow",
      "PyTorch",
      "OpenAI API"
    ],
    QC: [
      "IBM Quantum Lab / Qiskit",
      "Google Cirq",
      "Microsoft Q#",
      "PennyLane",
      "D-Wave Ocean SDK",
      "Rigetti Forest SDK",
      "Quantum Inspire",
      "Quirk",
      "IonQ API",
      "TensorFlow Quantum"
    ],
    ET: [
      "Canva",
      "Tinkercad",
      "MIT App Inventor",
      "CoSpaces Edu",
      "SketchUp Free",
      "Minecraft Education",
      "Hopscotch",
      "MakeCode",
      "Figma",
      "Glitch"
    ]
  };

  const categoryInfo = {
    AI: { icon: Brain, label: "AI Tools" },
    QC: { icon: Atom, label: "QC Tools" },
    ET: { icon: Sparkles, label: "ET Tools" }
  };

  const handleToggle = (option) => {
    const currentAnswers = answers || [];
    if (currentAnswers.includes(option)) {
      onAnswer(currentAnswers.filter((item) => item !== option));
    } else {
      onAnswer([...currentAnswers, option]);
    }
  };

  const handleCategoryChange = (category) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  // Get options to display based on whether it's tools question or not
  const optionsToDisplay = isToolsQuestion 
    ? toolsByCategory[currentToolCategory] 
    : displayOptions;

  return (
    <div>
      {/* Category buttons for tools question */}
      {isToolsQuestion && (
        <div className="flex gap-3 mb-4">
          {Object.entries(categoryInfo).map(([key, { icon: Icon, label }]) => {
            const isActive = currentToolCategory === key;
            return (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {optionsToDisplay.map((option, index) => {
          const isSelected = answers?.includes(option);
          
          return (
            <button
              key={index}
              onClick={() => handleToggle(option)}
              disabled={isLoading}
              className={`p-3 text-left border rounded-md cursor-pointer transition-all duration-200 text-black text-sm ${
                isSelected
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 border mr-2 ${
                    isSelected
                      ? "border-white bg-white"
                      : "border-gray-400"
                  }`}
                >
                  {isSelected && (
                    <Check className="w-2 h-2 text-black" />
                  )}
                </div>
                <Mail className={`w-3 h-3 mr-2 ${isSelected ? "text-white" : "text-gray-500"}`} />
                <span className="text-xs leading-tight">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;