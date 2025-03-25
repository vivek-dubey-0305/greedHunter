import { AlertTriangle, Award, CheckCircle, Clock, Lock, RefreshCw } from 'lucide-react'
import React from 'react'

const RulesAndGuidelines = ({onclose}) => {
  return (
    <div className="fixed inset-0 w-full min-h-screen bg-gray-900 flex items-center justify-center p-4 z-50">
    <div className="max-w-lg w-full p-8 bg-gradient-to-r from-gray-900 to-gray-950 shadow-2xl rounded-xl text-center border border-l-4 border-l-purple-700 transform hover:scale-[1.02] transition-transform duration-300 animate-fadeIn">
      <div className="flex items-center justify-center mb-6">
        <Award className="w-10 h-10 text-purple-500 animate-pulse" />
        <h2 className="text-3xl font-bold ml-3 text-purple-500 animate-slideDown">
          Quiz Rules & Guidelines
        </h2>
      </div>

      <ul className="text-left space-y-4 text-gray-300 mb-6">
        <li className="flex items-center space-x-3 animate-slideUp">
          <Clock className="w-5 h-5 text-purple-500 flex-shrink-0" />
          <span>You have 45 minutes to complete the quiz.</span>
        </li>
        <li className="flex items-center space-x-3 animate-slideUp delay-100">
          <Award className="w-5 h-5 text-purple-500 flex-shrink-0" />
          <span>Each question carries 2 marks.</span>
        </li>
        <li className="flex items-center space-x-3 animate-slideUp delay-200">
          <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
          <span>There is no negative marking.</span>
        </li>
        <li className="flex items-center space-x-3 animate-slideUp delay-300">
          <Lock className="w-5 h-5 text-purple-500 flex-shrink-0" />
          <span>Once submitted, you cannot change your answers.</span>
        </li>
        <li className="flex items-center space-x-3 animate-slideUp delay-400">
          <Clock className="w-5 h-5 text-purple-500 flex-shrink-0" />
          <span>The quiz will auto-submit when time runs out.</span>
        </li>
        <li className="flex items-start space-x-3 animate-bounce">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 animate-pulse" />
          <span className="text-red-400 font-semibold">
            If you refresh the page{" "}
            <RefreshCw className="w-4 h-4 inline mx-1 animate-spin" />
            , your data and progress will be lost, and you will be
            banned from playing the quiz.
          </span>
        </li>
      </ul>

      <button
        onClick={onclose}
        className="mt-6 w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg 
                 transition-all duration-300 hover:bg-purple-700 hover:shadow-xl
                 active:scale-95 group animate-slideUp delay-500
                 border border-purple-500 hover:border-purple-400"
      >
        <span className="flex items-center justify-center space-x-2">
          <span>I Accept & Start Quiz</span>
          <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </span>
      </button>
    </div>
  </div>
  )
}

export default RulesAndGuidelines