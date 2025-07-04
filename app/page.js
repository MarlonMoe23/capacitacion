'use client'
import { useState, useEffect } from 'react'
import UserSelector from './components/UserSelector'
import QuizSelector from './components/QuizSelector'
import Quiz from './components/Quiz'

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null)
const [isLoading, setIsLoading] = useState(true)
  const [selectedQuiz, setSelectedQuiz] = useState(null)

 const handleUserSelect = (userName) => {
  setCurrentUser(userName)
  // Guardar en memoria del navegador
  if (typeof window !== 'undefined') {
    localStorage.setItem('capacitacion_user', userName)
  }
}

// Cargar usuario guardado al iniciar
useEffect(() => {
  if (typeof window !== 'undefined') {
    const savedUser = localStorage.getItem('capacitacion_user')
    if (savedUser) {
      setCurrentUser(savedUser)
    }
    setIsLoading(false)
  }
}, [])



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
        
        {isLoading ? (
  <div className="bg-white rounded-lg shadow-md p-6">
    <p className="text-center text-gray-600">Cargando...</p>
  </div>
) : !currentUser ? (
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