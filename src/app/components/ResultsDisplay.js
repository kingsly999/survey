import { useState, useEffect } from 'react';
import { getRedirectUrl } from '../utils/config';

const ResultsDisplay = ({ surveyResults, newsletterId }) => {
  const [displayedScore, setDisplayedScore] = useState(0);

  // // Mock getRedirectUrl function
  // const getRedirectUrl = (id) => {
  //   return `/?newsletter=${id}`;
  // };

  // Animate score counting
  useEffect(() => {
    if (!surveyResults || surveyResults.score == null) return;
    
    let start = 0;
    const end = surveyResults.score;
    const duration = 2000;
    const incrementTime = 16;
    const totalSteps = duration / incrementTime;
    const increment = end / totalSteps;
    
    const timer = setInterval(() => {
      start += increment;
      setDisplayedScore(Math.min(Math.round(start), end));
      if (start >= end) {
        setDisplayedScore(end);
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [surveyResults]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!surveyResults) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 py-8">
        {/* Header */}
        <div className="relative text-center mb-8">
          <button
            onClick={() => {
              window.location.href = getRedirectUrl(newsletterId);
            }}
            className="absolute cursor-pointer top-0 right-0 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go To Home Page
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {surveyResults.user_name}, your recommended stack
          </h1>
          <p className="text-gray-600">A quick look at how prepared you are to upskill</p>
        </div>

        {/* Arc Progress */}
        <div className="flex justify-center mb-12">
          <div className="relative w-80 h-48">
            <svg className="w-full h-full" viewBox="0 0 200 120">
              {/* Background arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Progress arc */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="25%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="75%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="251.327"
                strokeDashoffset={251.327 * (1 - displayedScore / 100)}
                className="transition-all duration-300 ease-out"
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <div className={`text-5xl font-bold mb-1 ${getScoreColor(displayedScore)}`}>
                {displayedScore}
              </div>
              <div className="text-sm text-gray-500 mb-2">out of 100</div>
              <div className={`text-lg font-semibold ${getScoreColor(surveyResults.score)}`}>
                {surveyResults.readiness_level}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Proficiency Section */}
        {surveyResults.tech_proficiency_radar && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Your Tech Proficiency Profile</h2>
            <p className="text-sm text-gray-600 mb-6">
              Average score: {surveyResults.tech_proficiency_radar.average_score}/100 • 
              Strongest: {surveyResults.tech_proficiency_radar.strongest_domain}
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              {surveyResults.tech_proficiency_radar.domains?.map((domain, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{domain.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      domain.score >= 70 ? 'bg-green-100 text-green-800' :
                      domain.score >= 40 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {domain.level}
                    </span>
                  </div>
                  
                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${
                        domain.score >= 70 ? 'bg-green-500' :
                        domain.score >= 40 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${domain.score}%` }}
                    />
                  </div>
                  <p className="text-right text-sm font-medium text-gray-700">{domain.score}/100</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Grid: Current Status and Tools */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Current Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Where you are right now</h2>
            <p className="text-gray-700 text-sm mb-6">{surveyResults.personal_message}</p>
            
            <div className="space-y-3">
              {surveyResults.analysis_insights?.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <span className="text-xl flex-shrink-0">{insight.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{insight.title}</h3>
                    <p className="text-gray-600 text-xs">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            
          </div>

          {/* Recommended Tools */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended tools for you</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {surveyResults.recommended_tools?.map((tool, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{tool.icon || "🔧"}</span>
                  </div>
                 <div className="flex-1 min-w-0">
  <div className="flex items-center justify-between mb-1">
  <h3 className="font-semibold text-gray-900 text-sm">{tool.name}</h3>

  <div className="flex items-center gap-2">
  <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
      {tool.category}
    </span>
    <span
  className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
    tool.difficulty?.toLowerCase() === "beginner"
      ? "bg-green-100 text-green-800"
      : tool.difficulty?.toLowerCase() === "intermediate"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800"
  }`}
>
  {tool.difficulty}
</span>


    
  </div>
</div>


  <p className="text-gray-600 text-xs mb-2">{tool.description}</p>

  {/* Highlight relevance */}
  <p className="text-blue-700 text-xs font-semibold mb-2 bg-blue-50 p-1 rounded inline-block">
    {tool.relevance}
  </p>

  {/* Clickable link */}
  {tool.link && (
    <a
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 text-xs underline hover:text-indigo-800 block mb-2"
    >
      🔗 {tool.link}
    </a>
  )}

  
</div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Recommendations */}
       {surveyResults.newsletter_recommendations && surveyResults.newsletter_recommendations.length > 0 && (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Newsletter Recommendations</h2>
    <div className="space-y-3">
      {surveyResults.newsletter_recommendations.map((newsletter, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-gray-50"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{newsletter.newsletter_name}</h3>
              <p className="text-gray-600 text-sm">{newsletter.recommendation_reason}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-lg font-semibold text-sm ml-4 flex-shrink-0 ${
                newsletter.match_score >= 70
                  ? "bg-green-100 text-green-800"
                  : newsletter.match_score >= 40
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {newsletter.match_score}%
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mb-3">
            {newsletter.key_topics?.map((topic, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                {topic}
              </span>
            ))}
          </div>

          {/* Overview + Relevance */}
          <div className="mt-2 text-sm text-gray-800">
            <p className="mb-1">
              {newsletter.overview || "No overview provided"}
            </p>

            <p className="text-blue-700 text-xs font-semibold mb-3 bg-blue-50 px-2 py-1 rounded inline-block">
              {newsletter.relevance_explanation || "No relevance provided"}
            </p>

           
          </div>
           {/* Subscribe Button */}
            <a
              href={newsletter.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
            >
              Explore
            </a>
            
        </div>
      ))}
    </div>
  </div>
)}



        {/* Next Steps */}
       
      </div>
    </div>
  );
};

export default ResultsDisplay;