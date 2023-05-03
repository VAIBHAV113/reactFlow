import React, { useState, useCallback } from "react";

import ReactFlow, {
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  ReactFlowProvider,
} from "react-flow-renderer";

import "reactflow/dist/style.css";

const flowKey = "example-flow";
const getNodeId = () => `randomnode_${+new Date()}`;

const SaveRestore = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const [nodePositions, setNodePositions] = useState({});

  function onNodeDragStop(event, node) {
    setNodePositions({
      ...nodePositions,
      [node.id]: {},
    });
  }

  function saveStateToBackend() {
    fetch("/api/save-state", {
      method: "POST",
      body: JSON.stringify(nodePositions),
    });
  }

  function saveStateToBackend() {
    fetch("http://localhost:5000/api/position", {
      method: "POST",
      body: JSON.stringify(nodePositions),
    });
  }
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      setNodePositions(flow);
      console.log(flow);
      saveStateToBackend();
    }
  }, [rfInstance]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: "Added node" },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
      style: {
        background: "red",
        border: "1px solid black",
        borderRadius: 15,
        fontSize: 12,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div className="save__controls">
        <button  style={{ height: "30px", width: "100px" , marginLeft:"5rem" ,  marginRight:"5rem",  marginTop:"1rem"}} onClick={onSave}>save</button>
      </div>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={onNodeDragStop}
          onPaneClick={onAdd}
          onInit={setRfInstance}
        ></ReactFlow>

        <Controls />
        <MiniMap />
      </ReactFlowProvider>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <SaveRestore />
  </ReactFlowProvider>
);
