'use client'
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ProgressBar from './components/ProgressBar';
import QuestionRenderer from './components/QuestionRenderer';
import NavigationButtons from './components/NavigationButtons';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingScreen from './components/LoadingScreen';
import { getQuestionSet, getTotalQuestions } from './utils/questionSets';
import { BACKEND_URL } from './utils/config';

const AISurveyForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [newsletterId, setNewsletterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [surveyResults, setSurveyResults] = useState(null);
  const [customInputs, setCustomInputs] = useState({});
  const [currentToolCategory, setCurrentToolCategory] = useState('AI');

  // Get query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const id = urlParams.get('id');
    
    if (email) setUserEmail(email);
    if (id) setNewsletterId(id);
  }, []);

  // Set default newsletter selections when we know the question structure
  useEffect(() => {
    if (!newsletterId) return;
    
    const totalQuestions = getTotalQuestions(answers[2], answers[3]);
    const newsletterQuestionId = totalQuestions; // Last question is always newsletter
    
    // Only set defaults if not already answered
    if (!answers[newsletterQuestionId]) {
      const normalizedId = newsletterId ? newsletterId.trim().toUpperCase() : '';
      const defaultNewsletters = [];
      if (normalizedId !== 'AI') defaultNewsletters.push('YoupowerQ AI');
      if (normalizedId !== 'QC') defaultNewsletters.push('YoupowerQ QC');
      if (normalizedId !== 'ET') defaultNewsletters.push('YoupowerQ ET');
      
      setAnswers(prev => ({
        ...prev,
        [newsletterQuestionId]: defaultNewsletters
      }));
    }
  }, [newsletterId, answers[2], answers[3]]);

  // Check if current question is tools question
  const isToolsQuestion = () => {
    const questionSet = getQuestionSet(answers[2], answers[3]);
    const currentQuestionData = questionSet[currentQuestion];
    
    // Check if the question text matches the tools question
    return currentQuestionData?.text === "Which tools have you used so far? (Select all that apply)";
  };

  // Reset category when entering or leaving tools question
  useEffect(() => {
    if (isToolsQuestion()) {
      setCurrentToolCategory('AI');
    } else {
      // Reset to AI when not on tools question
      setCurrentToolCategory('AI');
    }
  }, [currentQuestion]);

  // Check if user already started the survey
  useEffect(() => {
    const checkExistingSurvey = async () => {
      if (!userEmail || !newsletterId) return;

      try {
        setIsInitializing(true);
        const response = await fetch(`${BACKEND_URL}/survey/${userEmail}/${newsletterId}`);
        const data = await response.json();
        const survey = data.survey;

        if (survey) {
          const restoredAnswers = {};
          
          // Basic fields
          restoredAnswers[1] = survey.name || ''; // Name
          restoredAnswers[2] = survey.q1 || '';   // Role
          restoredAnswers[3] = survey.q2 || '';   // Educ/Role Detail
          restoredAnswers[4] = survey.q3 || '';   // Exp/Grade
          restoredAnswers[5] = survey.q4 || '';   // Interest/Field

          const isSchoolStudent = survey.q1 === 'Student' && survey.q2 === 'School Student';

          if (isSchoolStudent) {
            // School Student Mapping
            restoredAnswers[6] = survey.q5 || []; // Techs
            // Combined Proficiency at Q7
            restoredAnswers[7] = {
              AI: survey.q6 || '',
              QC: survey.q7 || '',
              ET: survey.q8 || ''
            };
            restoredAnswers[8] = survey.q9 || '';   // Motiv
            restoredAnswers[9] = survey.q10 || [];  // Tools
            restoredAnswers[10] = survey.q11 || ''; // Courses
            restoredAnswers[11] = survey.q12 || []; // Newsletter
          } else {
            // Working Professional / Student Mapping
            // Combined Proficiency at Q6
            restoredAnswers[6] = {
              AI: survey.q5 || '',
              QC: survey.q6 || '',
              ET: survey.q7 || ''
            };
            restoredAnswers[7] = survey.q8 || '';   // Motiv
            restoredAnswers[8] = survey.q9 || [];   // Tools
            restoredAnswers[9] = survey.q10 || '';  // Courses
            restoredAnswers[10] = survey.q11 || []; // Newsletter
          }

          setAnswers(restoredAnswers);

          // Dynamically determine userType and educationLevel
          const userType = survey.q1 === 'Student' ? 'Student' : 'Working Professional';
          const educationLevel = survey.q2 || null;

          const totalQuestions = getTotalQuestions(userType, educationLevel);

          // Find the next incomplete question
          let nextQuestion = 1;
          for (let i = 1; i <= totalQuestions; i++) {
            const answer = restoredAnswers[i];
            if (answer === undefined || answer === '' || (Array.isArray(answer) && answer.length === 0)) {
              nextQuestion = i;
              break;
            }
          }

          setCurrentQuestion(nextQuestion);
        }
      } catch (error) {
        console.error('Error checking existing survey:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    checkExistingSurvey();
  }, [userEmail, newsletterId]);

  // Save progress to backend
  const saveProgress = async (questionNumber, answer) => {
    if (!userEmail || !newsletterId) {
      console.warn('Missing email or newsletter ID');
      return;
    }

    try {
      setIsLoading(true);

      // Prepare payload (include name field)
      // Map answers to legacy payload structure
      const currentAnswers = { ...answers, [questionNumber]: answer };
      const isSchoolStudent = currentAnswers[2] === 'Student' && currentAnswers[3] === 'School Student';

      // Helper to safely get option from combined object
      const getProficiency = (qId, type) => {
        const val = currentAnswers[qId];
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          return val[type] || '';
        }
        return '';
      };

      let payload = {
        email: userEmail,
        name: currentAnswers[1] || '',
        newsletter_id: newsletterId
      };

      if (isSchoolStudent) {
        payload = {
          ...payload,
          q1: currentAnswers[2] || '',
          q2: currentAnswers[3] || '',
          q3: currentAnswers[4] || '',
          q4: currentAnswers[5] || '',
          q5: currentAnswers[6] || '',     // Techs
          q6: getProficiency(7, 'AI'),     // AI Prof
          q7: getProficiency(7, 'QC'),     // QC Prof
          q8: getProficiency(7, 'ET'),     // ET Prof
          q9: currentAnswers[8] || '',     // Motiv
          q10: currentAnswers[9] || '',    // Tools
          q11: currentAnswers[10] || '',   // Courses
          q12: currentAnswers[11] || ''    // Newsletter
        };
      } else {
        payload = {
          ...payload,
          q1: currentAnswers[2] || '',
          q2: currentAnswers[3] || '',
          q3: currentAnswers[4] || '',
          q4: currentAnswers[5] || '',
          q5: getProficiency(6, 'AI'),     // AI Prof
          q6: getProficiency(6, 'QC'),     // QC Prof
          q7: getProficiency(6, 'ET'),     // ET Prof
          q8: currentAnswers[7] || '',     // Motiv
          q9: currentAnswers[8] || '',     // Tools
          q10: currentAnswers[9] || '',    // Courses
          q11: currentAnswers[10] || '',   // Newsletter
          q12: '' // Unused in this path
        };
      }

      const response = await fetch(`${BACKEND_URL}/create-nl-survey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to save progress');
      }

      const data = await response.json();
      console.log('Progress saved:', data);
      
    } catch (error) {
      console.error('Error saving progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get question text by ID and user path
  const getQuestionText = (questionId) => {
    const questionSet = getQuestionSet(answers[2], answers[3]);
    return questionSet[questionId]?.text || `Question ${questionId}`;
  };

  // Get survey results
  const getSurveyResults = async () => {
    try {
      setIsLoadingResults(true);
      
      const questionSet = getQuestionSet(answers[2], answers[3]);
      const questionsAndAnswers = [];

      Object.keys(answers).forEach(questionId => {
        const qId = parseInt(questionId);
        const question = questionSet[qId];
        let answer = answers[qId];

        if (question && answer) {
          if (question.type === "combined_proficiency") {
              const proficiencyMap = {
                  AI: "Artificial Intelligence",
                  QC: "Quantum Computing",
                  ET: "Emerging Technologies"
              };
              
              // Add 3 separate entries for the combined question
              // Use the current ID for the first one, then ID+1, ID+2
              ['AI', 'QC', 'ET'].forEach((key, index) => {
                  if (answer[key]) {
                      questionsAndAnswers.push({
                          question_id: qId + index,
                          question: `How would you rate your proficiency in ${key === 'AI' ? 'AI' : key === 'QC' ? 'Quantum Computing' : 'Emerging Technologies'}?`,
                          answer: answer[key]
                      });
                  }
              });
          } else {
             // For standard questions, check if we need to shift ID
             // If we are past the combined proficiency question, shift ID by +2
             // Find combined question ID to determine if we passed it
             const combinedQId = Object.keys(questionSet).find(k => questionSet[k].type === "combined_proficiency");
             
             let adjustedId = qId;
             if (combinedQId && qId > parseInt(combinedQId)) {
                 adjustedId = qId + 2;
             }

             if (answer !== '') {
                questionsAndAnswers.push({
                  question_id: adjustedId,
                  question: question.text,
                  answer: answer
                });
             }
          }
        }
      });

      const payload = {
        email: userEmail,
        name: answers[1] || '',
        newsletter_id: newsletterId,
        questions_and_answers: questionsAndAnswers
      };

      console.log('Sending payload:', payload);

      //const response = await fetch(`https://stu.globalknowledgetech.com:8503/api/readiness-survey`, {
        const response = await fetch(`http://192.168.10.62:8503/api/readiness-survey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to get survey results');
      }

      const data = await response.json();
      setSurveyResults(data);

    } catch (error) {
      console.error('Error getting survey results:', error);
      // Fallback mock data
      setSurveyResults({
        user_name: answers[1] || "User",
        score: 84,
        readiness_level: "High readiness",
        personal_message: "You're on the right track!",
        analysis_insights: [],
        recommended_tools: [],
      });
    } finally {
      setIsLoadingResults(false);
    }
  };

  const handleAnswer = async (value) => {
    setAnswers((prev) => {
      const updated = { ...prev, [currentQuestion]: value };

      // Clear future answers if branching question changed
      const questionSet = getQuestionSet(answers[2], answers[3]);
      const currentQuestionData = questionSet[currentQuestion];
      
      if (currentQuestionData?.branching && prev[currentQuestion] !== value) {
        Object.keys(updated).forEach((key) => {
          if (parseInt(key) > currentQuestion) {
            delete updated[key];
          }
        });
      }

      return updated;
    });

    // Save progress for non-text inputs immediately
    const questionSet = getQuestionSet(answers[2], answers[3]);
    const currentQuestionData = questionSet[currentQuestion];
    
    if (currentQuestionData?.type !== "text") {
      await saveProgress(currentQuestion, value);
    }
  };

  const handleCustomInput = (field, value) => {
    setCustomInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTextComplete = async () => {
    const questionSet = getQuestionSet(answers[2], answers[3]);
    const currentQuestionData = questionSet[currentQuestion];
    
    if (currentQuestionData?.type === "text" && answers[currentQuestion]?.trim()) {
      await saveProgress(currentQuestion, answers[currentQuestion]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      // If on tools question and not on AI category, go back to previous category
      if (isToolsQuestion()) {
        if (currentToolCategory === 'QC') {
          setCurrentToolCategory('AI');
          return;
        } else if (currentToolCategory === 'ET') {
          setCurrentToolCategory('QC');
          return;
        }
      }
      
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = async () => {
    // Handle custom inputs for "Other" options
    const questionSet = getQuestionSet(answers[2], answers[3]);
    const currentQuestionData = questionSet[currentQuestion];
    
    if (currentQuestionData?.hasOtherOption && customInputs[currentQuestion]) {
      const customAnswer = `Other: ${customInputs[currentQuestion].trim()}`;
      setAnswers(prev => ({ ...prev, [currentQuestion]: customAnswer }));
      await saveProgress(currentQuestion, customAnswer);
    } else if (currentQuestionData?.type === "text") {
      await handleTextComplete();
    }

    // If on tools question, navigate through categories first
    if (isToolsQuestion()) {
      if (currentToolCategory === 'AI') {
        setCurrentToolCategory('QC');
        return;
      } else if (currentToolCategory === 'QC') {
        setCurrentToolCategory('ET');
        return;
      }
      // If on ET, reset to AI and continue to next question
      setCurrentToolCategory('AI');
    }

    const totalQuestions = getTotalQuestions(answers[2], answers[3]);
    
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsCompleted(true);
      await getSurveyResults();
    }
  };

  const handleCategoryChange = (category) => {
    setCurrentToolCategory(category);
  };

  const totalQuestions = getTotalQuestions(answers[2], answers[3]);
  const questionSet = getQuestionSet(answers[2], answers[3]);
  const currentQuestionData = questionSet[currentQuestion];

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your survey...</p>
        </div>
      </div>
    );
  }

  if (isCompleted && isLoadingResults) {
    return <LoadingScreen />;
  }

  if (isCompleted && surveyResults) {
    return <ResultsDisplay surveyResults={surveyResults} newsletterId={newsletterId} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ProgressBar 
        currentQuestion={currentQuestion} 
        totalQuestions={totalQuestions} 
      />

      <div className="flex-1 overflow-auto pb-24">
        <div className="max-w-lg mx-auto p-4">
          <QuestionRenderer
            currentQuestion={currentQuestion}
            currentQuestionData={currentQuestionData}
            answers={answers}
            customInputs={customInputs}
            newsletterId={newsletterId}
            isLoading={isLoading}
            onAnswer={handleAnswer}
            onCustomInput={handleCustomInput}
            onTextComplete={handleTextComplete}
            onNext={handleNext}
            currentToolCategory={currentToolCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      <NavigationButtons
        currentQuestion={currentQuestion}
        currentQuestionData={currentQuestionData}
        answers={answers}
        customInputs={customInputs}
        totalQuestions={totalQuestions}
        isLoading={isLoading}
        onPrevious={handlePrevious}
        onNext={handleNext}
        currentToolCategory={currentToolCategory}
        isToolsQuestion={isToolsQuestion()}
      />
    </div>
  );
};

export default AISurveyForm;

//