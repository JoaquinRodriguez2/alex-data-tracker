import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Herramienta para el Seguimiento de Activos</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Inicio</h2>
            <p className="text-gray-600 mb-4">
              Este es el marco de trabajo creado por el personal tecnico de ALEX para la creacion de procedimientos y seguimiento de parametros en los activos
              de la empresa
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Equipos fuera de Rangos</h3>
                <p className="text-gray-600">Click para ver equipos fuera de rango</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Procedimientos Abiertos</h3>
                <p className="text-gray-600">Lista de procedimientos Abiertos</p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
