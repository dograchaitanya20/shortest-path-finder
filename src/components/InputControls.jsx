import React, { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';

const InputControls = ({ nodes, onAddNode, onAddEdge, isDark }) => {
  const [newNodeName, setNewNodeName] = useState('');
  const [edgeFrom, setEdgeFrom] = useState('');
  const [edgeTo, setEdgeTo] = useState('');
  const [edgeWeight, setEdgeWeight] = useState('');

  const handleAddNode = (e) => {
    e.preventDefault();
    if (newNodeName.trim() && !nodes.find(n => n.id === newNodeName.trim())) {
      onAddNode(newNodeName.trim());
      setNewNodeName('');
    }
  };

  const handleAddEdge = (e) => {
    e.preventDefault();
    const weight = parseFloat(edgeWeight);
    if (edgeFrom && edgeTo && edgeFrom !== edgeTo && !isNaN(weight)) {
      onAddEdge(edgeFrom, edgeTo, weight);
      setEdgeFrom('');
      setEdgeTo('');
      setEdgeWeight('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Node Section */}
      <div className={`rounded-lg p-6 shadow-md border ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          <Plus className="w-5 h-5 text-blue-600" />
          Add Node
        </h3>
        <form onSubmit={handleAddNode} className="flex gap-3 items-center">
          <input
            type="text"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            placeholder="Enter name"
            className={`flex-1 min-w-0 h-10 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
          <button
            type="submit"
            className="h-10 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Add
          </button>
        </form>
      </div>

      {/* Add Edge Section */}
      <div className={`rounded-lg p-6 shadow-md border ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          <ArrowRight className="w-5 h-5 text-green-600" />
          Add Edge
        </h3>
        <form onSubmit={handleAddEdge} className="space-y-4">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>From</label>
              <select
                value={edgeFrom}
                onChange={(e) => setEdgeFrom(e.target.value)}
                className={`w-full h-10 px-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                required
              >
                <option value="">Select Node</option>
                {nodes.map(node => (
                  <option key={node.id} value={node.id}>{node.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>To</label>
              <select
                value={edgeTo}
                onChange={(e) => setEdgeTo(e.target.value)}
                className={`w-full h-10 px-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                required
              >
                <option value="">Select node</option>
                {nodes.map(node => (
                  <option key={node.id} value={node.id}>{node.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Weight</label>
              <input
                type="number"
                value={edgeWeight}
                onChange={(e) => setEdgeWeight(e.target.value)}
                placeholder="Enter weight"
                className={`w-full h-10 px-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                step="any"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-10 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Add Edge
          </button>
        </form>
      </div>

      {/* Current Graph Info */}
      <div className={`rounded-lg p-4 border ${
        isDark 
          ? 'bg-gray-700 border-gray-600' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className={`text-sm ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <div className="flex justify-between items-center">
            <span>Nodes: {nodes.length}</span>
            <span>Ready to find paths!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputControls;