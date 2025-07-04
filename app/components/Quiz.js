'use client'
import { useState, useEffect } from 'react'

export default function Quiz({ user, quizFile, onQuizComplete }) {
  const [quizData, setQuizData] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  // Cargar el quiz desde el JSON
// Cargar el quiz desde el JSON
useEffect(() => {
  if (quizFile) {
    fetch(quizFile)
      .then(response => response.json())
      .then(data => {
        setQuizData(data)
        setSelectedAnswers(new Array(data.preguntas.length).fill(null))
      })
      .catch(error => console.error('Error cargando quiz:', error))
  }
}, [quizFile])  





  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.preguntas.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateScore()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    quizData.preguntas.forEach((pregunta, index) => {
      if (selectedAnswers[index] === pregunta.correcta) {
        correct++
      }
    })
    const percentage = Math.round((correct / quizData.preguntas.length) * 100)
    setScore(percentage)
    setShowResult(true)
  }

  const shareOnWhatsApp = () => {
    const message = `✅ He completado la capacitación: "${quizData.titulo}" el ${new Date().toLocaleDateString('es-ES')}`
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

const restartQuiz = () => {
  setCurrentQuestion(0)
  setSelectedAnswers(new Array(quizData.preguntas.length).fill(null))
  setShowResult(false)
  setScore(0)
}


  if (!quizData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-600">Cargando quiz...</p>
      </div>
    )
  }

 if (showResult) {
  const passed = score >= 80
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        ¡Quiz Completado!
      </h2>
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
          {score}%
        </div>
        <p className="text-gray-600 mb-4">
          Respondiste correctamente {selectedAnswers.filter((answer, index) => answer === quizData.preguntas[index].correcta).length} de {quizData.preguntas.length} preguntas
        </p>
        
        {passed ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-800 font-medium">
              ¡Felicitaciones! Has aprobado la capacitación
            </p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 font-medium">
              Necesitas al menos 80% para aprobar. ¡Inténtalo de nuevo!
            </p>
          </div>
        )}
      </div>
      
      <div className="flex gap-4 justify-center">
        {passed ? (
          <>
            <button 
              onClick={shareOnWhatsApp}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              📱 Compartir WhatsApp
            </button>
            <button 
              onClick={() => onQuizComplete()}
              className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Nuevo Quiz
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={restartQuiz}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🔄 Repetir Prueba
            </button>
            <button 
              onClick={() => onQuizComplete()}
              className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Cambiar Quiz
            </button>
          </>
        )}
      </div>
    </div>
  )
}

  const preguntaActual = quizData.preguntas[currentQuestion]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            Pregunta {currentQuestion + 1} de {quizData.preguntas.length}
          </span>
          <span className="text-sm text-gray-500">
            Usuario: {user}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{width: `${((currentQuestion + 1) / quizData.preguntas.length) * 100}%`}}
          ></div>
        </div>
      </div>

     <h2 className="text-xl font-semibold text-gray-900 mb-6">
  {preguntaActual.pregunta}
</h2>

     <div className="space-y-3 mb-6">
  {preguntaActual.opciones.map((opcion, index) => (
    <button
      key={index}
      onClick={() => handleAnswerSelect(index)}
      className={`w-full p-4 text-left rounded-lg border transition-colors ${
        selectedAnswers[currentQuestion] === index
          ? 'border-blue-500 bg-blue-50 text-blue-800'
          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-800'
      }`}
    >
      <span className="font-medium mr-2 text-gray-900">
        {String.fromCharCode(65 + index)}.
      </span>
      <span className="text-gray-900">
        {opcion}
      </span>
    </button>
  ))}
</div>

      <div className="flex justify-between">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>
        
        <button 
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === null}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {currentQuestion === quizData.preguntas.length - 1 ? 'Finalizar' : 'Siguiente →'}
        </button>
      </div>
    </div>
  )
}