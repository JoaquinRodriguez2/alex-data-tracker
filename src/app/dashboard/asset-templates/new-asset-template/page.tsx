'use client';

import React, { useState } from 'react';

const NewAssetTemplate: React.FC = () => {
    const [assetName, setAssetName] = useState('');
    const [assetDescription, setAssetDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Asset Name:', assetName);
        console.log('Asset Description:', assetDescription);
    };

    return(
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Cree una Nueva Plantilla</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <div className="flex-1">
                        <label htmlFor="assetName" className="block text-sm font-medium text-gray-700">Nombre del Equipo</label>
                        <input
                            type="text"
                            id="assetName"
                            value={assetName}
                            onChange={(e) => setAssetName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        <input
                            type="text"
                            id="tags"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Etiquetas de Identificacion">
                        </input>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="assetDescription" className="block text-sm font-medium text-gray-700">Descripcion del Equipo</label>
                        <textarea
                            id="assetDescription"
                            value={assetDescription}
                            onChange={(e) => setAssetDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                            required
                        ></textarea>
                    </div>
                </div>
                {/** This is the list of AssetTemplates Components that are part of this*/}
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <div className="flex-1">
                        <label htmlFor="assetTemplate" className="block text-sm font-medium text-gray-700">Plantilla de Activo</label>
                        <select
                            id="assetTemplate"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Seleccione los componentes de este equipo</option>
                            {/* Add options dynamically here */}
                        </select>
                    </div>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Crear 
                    
                </button>
            </form>
        </div>
    )
};

export default NewAssetTemplate;