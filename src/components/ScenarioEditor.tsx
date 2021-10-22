import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BlocklyWorkspace } from 'react-blockly';
import Blockly from "blockly";

const ASCAD_TOOLBOX = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Logic",
      colour: "#5C81A6",
      contents: [
        {
          kind: "block",
          type: "controls_if",
        },
        {
          kind: "block",
          type: "logic_compare",
        },
      ],
    },
    {
      kind: "category",
      name: "Math",
      colour: "#5CA65C",
      contents: [
        {
          kind: "block",
          type: "math_round",
        },
        {
          kind: "block",
          type: "math_number",
        },
      ],
    },
    {
      kind: "category",
      name: "Custom",
      colour: "#5CA699",
      contents: [
        {
          kind: "block",
          type: "new_boundary_function",
        },
        {
          kind: "block",
          type: "return",
        },
      ],
    },
  ],
};

const ScenarioEditor: React.FC = () => {
  const [xml, setXml] = useState('');

  return (
    <BlocklyWorkspace
      toolboxConfiguration={ASCAD_TOOLBOX}
      initialXml={xml}
      onXmlChange={setXml}
      className="fill-height"
      workspaceConfiguration={{
        grid: {
          spacing: 20,
          length: 3,
          colour: "#ccc",
          snap: true,
        },
      }}
    />
  );
}
 
export default ScenarioEditor;