'use client'
import { useState, useEffect } from 'react'

export default function QuizSelector({ user, onQuizSelect, onBack }) {
  const [availableQuizzes, setAvailableQuizzes] = useState([])

  useEffect(() => {
    // Lista de quizzes disponibles (puedes agregar más aquí)
    const quizzes = [
      {
        id: 'seguridad',
        file: '/data/ejemplo-quiz.json',
        titulo: 'Capacitación de Seguridad Básica',
        descripcion: 'Conocimientos fundamentales de seguridad laboral'
      },
      {
        id: 'higiene',
        file: '/data/capacitacion-higiene.json',
        titulo: 'Capacitación de Higiene y Sanidad',
        descripcion: 'Procedimientos de higiene en el trabajo'
      }
    ]
    setAvailableQuizzes(quizzes)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          ¡Hola, {user}!
        </h2>
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 text-sm"
        >
          ← Cambiar usuario
        </button>
      </div>
      
      <p className="text-gray-700 mb-6">
        Selecciona una capacitación para comenzar:
      </p>

      <div className="space-y-4">
        {availableQuizzes.map((quiz) => (
          <div 
            key={quiz.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
            onClick={() => onQuizSelect(quiz)}
          >
            <h3 className="font-semibold text-gray-900 mb-2">
              {quiz.titulo}
            </h3>
            <p className="text-gray-600 text-sm">
              {quiz.descripcion}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}