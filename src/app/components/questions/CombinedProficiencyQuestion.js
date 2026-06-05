
import React, { useEffect } from 'react';
import { ChevronDown, Brain, Atom, Sparkles } from 'lucide-react';

const CombinedProficiencyQuestion = ({
  options,
  answer = {},
  isLoading,
  onAnswer
}) => {
  const categories = [
    { 
      key: 'AI', 
      label: 'Artificial Intelligence (AI)', 
      icon: Brain,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      borderColor: 'focus:border-violet-500'
    },
    { 
      key: 'QC', 
      label: 'Quantum Computing (QC)', 
      icon: Atom,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      borderColor: 'focus:border-cyan-500'
    },
    { 
      key: 'ET', 
      label: 'Emerging Technologies (ET)', 
      icon: Sparkles,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      borderColor: 'focus:border-amber-500'
    }
  ];

  // Set default values to 'Beginner' on mount if not already set
  useEffect(() => {
    const newAnswer = { ...answer };
    let hasChanges = false;
    
    categories.forEach(cat => {
      if (!newAnswer[cat.key]) {
        newAnswer[cat.key] = 'Beginner';
        hasChanges = true;
      }
    });

    if (hasChanges) {
      onAnswer(newAnswer);
    }
  }, []); // Run once on mount

  const handleChange = (categoryKey, value) => {
    onAnswer({
      ...answer,
      [categoryKey]: value
    });
  };

  return (
    <div className="grid gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        const currentValue = answer[category.key] || 'Beginner';
        
        return (
          <div 
            key={category.key} 
            className="group relative p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
              {/* Icon Container */}
             

              {/* Label and Select Container */}
              <div className="flex-1 w-full md:w-auto">
                <label className="block text-sm font-semibold text-gray-900 mb-2 md:mb-1">
                  {category.label}
                </label>
                
                <div className="relative">
                  <select
                    value={currentValue}
                    onChange={(e) => handleChange(category.key, e.target.value)}
                    disabled={isLoading}
                    className={`w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-opacity-20 focus:outline-none block p-2.5 pr-10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer ${category.borderColor}`}
                  >
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CombinedProficiencyQuestion;
