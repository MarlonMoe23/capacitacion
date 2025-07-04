'use client'
import { useState } from 'react'
import UserSelector from './components/UserSelector'
import QuizSelector from './components/QuizSelector'
import Quiz from './components/Quiz'

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null)
  const [selectedQuiz, setSelectedQuiz] = useState(null)

  const handleUserSelect = (userName) => {
    setCurrentUser(userName)
  }

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz)
  }

  const handleQuizComplete = () => {
    setSelectedQuiz(null)
  }

  const handleBackToUserSelect = () => {
    setCurrentUser(null)
    setSelectedQuiz(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sistema de Capacitación
        </h1>
        
        {!currentUser ? (
          <UserSelector onUserSelect={handleUserSelect} />
        ) : !selectedQuiz ? (
          <QuizSelector 
            user={currentUser} 
            onQuizSelect={handleQuizSelect}
            onBack={handleBackToUserSelect}
          />
        ) : (
          <Quiz 
            user={currentUser} 
            quizFile={selectedQuiz.file}
            onQuizComplete={handleQuizComplete} 
          />
        )}
      </div>
    </div>
  )
}