const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center relative">
        {/* Floating background particles */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-60" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-40" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
        </div>

        {/* Main loading animation */}
        <div className="relative mb-8">
          {/* Rotating rings */}
          <div className="w-24 h-24 border-4 border-blue-100 rounded-full mx-auto animate-spin" style={{animationDuration: '3s'}}></div>
          <div className="w-20 h-20 border-4 border-blue-300 border-t-transparent rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-spin" style={{animationDuration: '2s'}}></div>
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-r-transparent rounded-full absolute top-4 left-1/2 transform -translate-x-1/2 animate-spin" style={{animationDuration: '1s'}}></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full absolute top-10 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
          
          {/* Orbiting dots */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 relative animate-spin" style={{animationDuration: '4s'}}>
              <div className="w-2 h-2 bg-blue-500 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full absolute top-1/2 -right-1 transform -translate-y-1/2"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-1/2 -left-1 transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        {/* Animated text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Analyzing your responses...
          </h2>
          
          {/* Progress steps */}
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-gray-600 text-sm">Processing your knowledge level...</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="text-gray-600 text-sm">Matching tools to your goals...</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <p className="text-gray-600 text-sm">Creating your personalized roadmap...</p>
            </div>
          </div>
        </div>

        {/* Floating icons */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/6 text-2xl animate-float" style={{animationDelay: '0s'}}>🤖</div>
          <div className="absolute top-1/3 right-1/6 text-xl animate-float" style={{animationDelay: '1s'}}>⚡</div>
          <div className="absolute bottom-1/3 left-1/5 text-lg animate-float" style={{animationDelay: '2s'}}>🧠</div>
          <div className="absolute bottom-1/4 right-1/5 text-2xl animate-float" style={{animationDelay: '3s'}}>✨</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;