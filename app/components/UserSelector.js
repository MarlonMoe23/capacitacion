'use client'
import { useState } from 'react'

const USUARIOS = [
  'Ana García',
  'Carlos López',
  'María Rodríguez',
  'José Martínez',
  'Laura Fernández',
  'Diego Silva',
  'Carmen Torres',
  'Roberto Jiménez'
]

export default function UserSelector({ onUserSelect }) {
  const [selectedUser, setSelectedUser] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedUser) {
      onUserSelect(selectedUser)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Selecciona tu nombre
      </h2>
      <form onSubmit={handleSubmit}>
        <select 
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
          required
        >
          <option value="">-- Selecciona tu nombre --</option>
          {USUARIOS.map((usuario) => (
            <option key={usuario} value={usuario}>
              {usuario}
            </option>
          ))}
        </select>
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Continuar
        </button>
      </form>
    </div>
  )
}