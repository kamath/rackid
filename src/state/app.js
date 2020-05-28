import React from "react"

export let DATA_TYPES = {
  SHAPE: 'SHAPE',
  NUMBER: 'NUMBER',
  TEXT: 'TEXT',
  COLOR: 'COLOR',
  BOOLEAN: 'BOOLEAN',
  ANY: 'ANY'
}

export let DEFAULT_DATA = "New Value";

let defineLambda = (params, param_types, todo) => {
  let obj = {}
  obj['PARAMS'] = params;
  obj['PARAM_TYPES'] = param_types;
  obj['TODO'] = todo;
  return obj
}

let define = (name, params, param_types, todo, return_type) => {
  let obj = {};
  obj[return_type] = {};
  obj[return_type][name] = defineLambda(params, param_types, todo);
  return obj;
}

const initialState = {
  isDarkMode: false,
  elements: [],
  funcs: {
    [DATA_TYPES.SHAPE]: {
      "make-circle": defineLambda(['cx', 'cy', 'r', 'fill'],
        [DATA_TYPES.NUMBER, DATA_TYPES.NUMBER, DATA_TYPES.NUMBER, DATA_TYPES.COLOR],
        (...args) => <circle cx={args[0]} cy={args[1]} r={args[2]} fill={args[3]} />),
      "make-rect": defineLambda(['x', 'y', 'height', 'width', 'fill'],
        [DATA_TYPES.NUMBER, DATA_TYPES.NUMBER, DATA_TYPES.NUMBER, DATA_TYPES.NUMBER, DATA_TYPES.COLOR],
        (...args) => <rect x={args[0]} y={args[1]} width={args[2]} height={args[3]} fill={args[4]} />)
    },

    [DATA_TYPES.NUMBER]: {
      [DEFAULT_DATA]: defineLambda(['x'],
        [DATA_TYPES.NUMBER],
        (...args) => parseFloat(args[0].value)),
      add: defineLambda(['x', 'y'],
        [DATA_TYPES.NUMBER, DATA_TYPES.NUMBER],
        (...args) => args[0] + args[1])
    },

    [DATA_TYPES.TEXT]: {
      [DEFAULT_DATA]: defineLambda(['x'],
        [DATA_TYPES.TEXT],
        (...args) => args[0].value)
    },

    [DATA_TYPES.COLOR]: {
      [DEFAULT_DATA]: defineLambda(['x'],
        [DATA_TYPES.COLOR],
        (...args) => args[0].value)
    },

    [DATA_TYPES.BOOLEAN]: {
      // args -> one element as a checkbox - return true if checked
      [DEFAULT_DATA]: defineLambda(['x'],
        [DATA_TYPES.BOOLEAN],
        (...args) => args[0].isChecked),
      equals: defineLambda(['x', 'y'],
        [DATA_TYPES.ANY, DATA_TYPES.ANY],
        (...args) => args[0] === args[1])
    },

    [DATA_TYPES.ANY]: {
      "if": defineLambda(['cond', 'ifTrue', 'ifFalse'],
        [DATA_TYPES.BOOLEAN, DATA_TYPES.ANY, DATA_TYPES.ANY],
        (...args) => (args[0]) ? args[1] : args[2])
    }
  },
  blocks: []
};

const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';
const ELEMENT = 'ELEMENT';
const FUNC = 'FUNC'

export const toggleDarkMode = isDarkMode => ({
  type: TOGGLE_DARKMODE, isDarkMode
});

export const addElement = newElement => ({
  type: ELEMENT, newElement
})

export const addBlock = newBlock => ({
  type: FUNC, newBlock
})

export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return { ...state, isDarkMode: action.isDarkMode };
    case ELEMENT:
      console.log("ACTION ELEMENT", action.newElement);
      return { ...state, elements: state.elements.concat([action.newElement])}
    case FUNC:
      console.log("NEW BLOCK", action.newBlock);
      return { ...state, blocks: state.blocks.concat([action.newBlock])}
    default:
      return state;
  }
};