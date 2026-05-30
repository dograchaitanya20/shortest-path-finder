// import React, { useEffect, useRef } from 'react';
// import { Network } from 'vis-network';

// const GraphVisualization = ({ 
//   nodes, 
//   edges, 
//   highlightedPath = [], 
//   highlightedMST = [],
//   onNodeClick,
//   onEdgeClick,
//   isDark = false
// }) => {
//   const networkRef = useRef(null);
//   const networkInstance = useRef(null);

//   useEffect(() => {
//     if (!networkRef.current) return;

//     // Convert nodes and edges to vis-network format
//     const visNodes = nodes.map(node => ({
//       id: node.id,
//       label: node.label,
//       color: {
//         background: highlightedPath.includes(node.id) ? '#10B981' : (isDark ? '#4F46E5' : '#3B82F6'),
//         border: isDark ? '#6366F1' : '#1E40AF',
//         highlight: {
//           background: isDark ? '#5B21B6' : '#1D4ED8',
//           border: isDark ? '#4C1D95' : '#1E3A8A'
//         }
//       },
//       font: { color: 'white', size: 14, face: 'Inter' }
//     }));

//     const visEdges = edges.map(edge => {
//       const isHighlighted = highlightedPath.length > 1 && 
//         highlightedPath.some((node, index) => 
//           index < highlightedPath.length - 1 && 
//           ((highlightedPath[index] === edge.from && highlightedPath[index + 1] === edge.to) ||
//            (highlightedPath[index] === edge.to && highlightedPath[index + 1] === edge.from))
//         );
      
//       const isMSTEdge = highlightedMST.some(mstEdge => 
//         (mstEdge.from === edge.from && mstEdge.to === edge.to) ||
//         (mstEdge.from === edge.to && mstEdge.to === edge.from)
//       );

//       return {
//         id: edge.id,
//         from: edge.from,
//         to: edge.to,
//         label: edge.weight.toString(),
//         color: {
//           color: isHighlighted || isMSTEdge ? '#10B981' : '#6B7280',
//           highlight: '#1D4ED8'
//         },
//         width: isHighlighted || isMSTEdge ? 4 : 2,
//         font: { 
//           color: isDark ? 'white' : '#374151',
//           size: 12, 
//           face: 'Inter',
//           background: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
//           strokeWidth: 2,
//           strokeColor: isDark ? '#1F2937' : 'white'
//         }
//       };
//     });

//     const data = { nodes: visNodes, edges: visEdges };
    
//     const options = {
//       nodes: {
//         shape: 'circle',
//         size: 30,
//         borderWidth: 2,
//         shadow: true
//       },
//       edges: {
//         arrows: {
//           to: { enabled: false }
//         },
//         smooth: {
//           enabled: true,
//           type: 'continuous',
//           roundness: 0.2
//         },
//         shadow: true
//       },
//       physics: {
//         enabled: true,
//         stabilization: { iterations: 100 },
//         barnesHut: {
//           gravitationalConstant: -2000,
//           springConstant: 0.001,
//           springLength: 200
//         }
//       },
//       interaction: {
//         hover: true,
//         selectConnectedEdges: false
//       }
//     };

//     if (networkInstance.current) {
//       networkInstance.current.destroy();
//     }

//     networkInstance.current = new Network(networkRef.current, data, options);

//     // Event listeners
//     if (onNodeClick) {
//       networkInstance.current.on('click', (params) => {
//         if (params.nodes.length > 0) {
//           onNodeClick(params.nodes[0]);
//         }
//       });
//     }

//     return () => {
//       if (networkInstance.current) {
//         networkInstance.current.destroy();
//         networkInstance.current = null;
//       }
//     };
//   }, [nodes, edges, highlightedPath, highlightedMST, onNodeClick, onEdgeClick, isDark]);

//   return (
//     <div className={`w-full h-full rounded-lg border-2 ${
//       isDark 
//         ? 'bg-gray-800 border-gray-600' 
//         : 'bg-gray-50 border-gray-200'
//     }`}>
//       <div 
//         ref={networkRef} 
//         className="w-full h-full rounded-lg"
//         style={{ minHeight: '400px' }}
//       />
//     </div>
//   );
// };

// export default GraphVisualization;

import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';

const GraphVisualization = ({ 
  nodes, 
  edges, 
  highlightedPath = [], 
  highlightedMST = [],
  onNodeClick,
  onEdgeClick,
  isDark = false
}) => {
  const networkRef = useRef(null);
  const networkInstance = useRef(null);

  useEffect(() => {
    if (!networkRef.current) return;

    // Convert nodes and edges to vis-network format
    const visNodes = nodes.map(node => ({
      id: node.id,
      label: node.label,
      color: {
        background: highlightedPath.includes(node.id)
          ? '#10B981'
          : (isDark ? '#4F46E5' : '#3B82F6'),
        border: isDark ? '#6366F1' : '#1E40AF',
        highlight: {
          // same as normal to prevent "grow/shrink" or flash effect
          background: highlightedPath.includes(node.id)
            ? '#10B981'
            : (isDark ? '#4F46E5' : '#3B82F6'),
          border: isDark ? '#6366F1' : '#1E40AF'
        }
      },
      font: { color: 'white', size: 14, face: 'Inter' }
    }));

    const visEdges = edges.map(edge => {
      const isHighlighted = highlightedPath.length > 1 && 
        highlightedPath.some((node, index) => 
          index < highlightedPath.length - 1 && 
          ((highlightedPath[index] === edge.from && highlightedPath[index + 1] === edge.to) ||
           (highlightedPath[index] === edge.to && highlightedPath[index + 1] === edge.from))
        );
      
      const isMSTEdge = highlightedMST.some(mstEdge => 
        (mstEdge.from === edge.from && mstEdge.to === edge.to) ||
        (mstEdge.from === edge.to && mstEdge.to === edge.from)
      );

      return {
        id: edge.id,
        from: edge.from,
        to: edge.to,
        label: edge.weight.toString(),
        color: {
          color: isHighlighted || isMSTEdge ? '#10B981' : '#6B7280',
          highlight: isHighlighted || isMSTEdge ? '#10B981' : '#6B7280' // same color on hover
        },
        width: isHighlighted || isMSTEdge ? 4 : 2,
        hoverWidth: 0,       // 🚫 disables width change on hover
        selectionWidth: 0,   // 🚫 disables scaling on click
        font: { 
          color: isDark ? 'white' : '#374151',
          size: 12, 
          face: 'Inter',
          background: isDark 
            ? 'rgba(31, 41, 55, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)',
          strokeWidth: 2,
          strokeColor: isDark ? '#1F2937' : 'white'
        }
      };
    });

    const data = { nodes: visNodes, edges: visEdges };
    
    const options = {
      nodes: {
        shape: 'circle',
        size: 30,
        borderWidth: 2,
        shadow: true,
        scaling: {
          min: 30,
          max: 30 // 🚫 prevents node size scaling
        }
      },
      edges: {
        arrows: {
          to: { enabled: false }
        },
        smooth: {
          enabled: true,
          type: 'continuous',
          roundness: 0.2
        },
        shadow: true,
        hoverWidth: 0,      // 🚫 no width increase on hover
        selectionWidth: 0   // 🚫 no width increase on click
      },
      physics: {
        enabled: true,
        stabilization: { iterations: 100 },
        barnesHut: {
          gravitationalConstant: -2000,
          springConstant: 0.001,
          springLength: 200
        }
      },
      interaction: {
        hover: true,
        selectConnectedEdges: false
      }
    };

    if (networkInstance.current) {
      networkInstance.current.destroy();
    }

    networkInstance.current = new Network(networkRef.current, data, options);

    // Event listeners
    if (onNodeClick) {
      networkInstance.current.on('click', (params) => {
        if (params.nodes.length > 0) {
          onNodeClick(params.nodes[0]);
        }
      });
    }

    return () => {
      if (networkInstance.current) {
        networkInstance.current.destroy();
        networkInstance.current = null;
      }
    };
  }, [nodes, edges, highlightedPath, highlightedMST, onNodeClick, onEdgeClick, isDark]);

  return (
    <div
      className={`w-full h-full rounded-lg border-2 ${
        isDark 
          ? 'bg-gray-800 border-gray-600' 
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div 
        ref={networkRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default GraphVisualization;
