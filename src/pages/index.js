import React from "react"
import { Link } from "gatsby"
import { connect } from 'react-redux';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Codeblock, {Block} from "../components/codeblock"
import { DATA_TYPES } from '../state/app'

import { addElement, toggleDarkMode, addBlock } from "../state/app"

const Animation = ({tags}) => {
  return(
    <svg style={{border: "2px solid black", width: "100%", height: "500px"}}>
      {tags}
    </svg>
  )
}

const IndexPage = ({isDarkMode, elements, funcs, blocks, dispatch}) => {
  console.log(elements);
  console.log("DATA TYPES", DATA_TYPES)
  return (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div>
      <Animation tags={elements} />
    </div>
    <button
      style={isDarkMode ? { background: 'black', color: 'white' } : null}
      onClick={() => dispatch(toggleDarkMode(!isDarkMode))}>Dark mode {isDarkMode ? 'on' : 'off'}
    </button>
    {/*<button*/}
    {/*  style={isDarkMode ? { background: 'black', color: 'white' } : null}*/}
    {/*  onClick={() => dispatch(addElement(<circle cx={"40"} cy={"40"} r={"80"} fill={"red"}></circle>))}>Add Element*/}
    {/*</button>*/}
    <button
      style={isDarkMode ? { background: 'black', color: 'white' } : null}
      onClick={() => dispatch(addBlock(<Codeblock inputType={null} name={null} />))}>Add Function
    </button>
    <br />
    <br />
    <div>
      { blocks }
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)}

export default connect(state => ({
  isDarkMode: state.app.isDarkMode,
  elements: state.app.elements,
  funcs: state.app.funcs,
  blocks: state.app.blocks
}), null)(IndexPage)