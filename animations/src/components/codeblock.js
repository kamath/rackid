import PropTypes, { func } from "prop-types"
import React from "react"
import { DATA_TYPES, DEFAULT_DATA } from "../state/app"

import { connect } from "react-redux"
import { addElement, toggleDarkMode, addBlock } from "../state/app"

class Block extends React.Component {
  constructor(props) {
    super(props);
    var inputToUse = (this.props.returnType === DATA_TYPES.BOOLEAN) ?
      (<input onChange={this.onInputChange} type="checkbox" value={"true"}/>) :
      <input onChange={this.onInputChange} type={this.props.returnType} />
    this.state = {
      input: inputToUse
    }
  }

  compute = () => {
    // console.log("BLOCK TYPES", this.props.types)
    let func_to_use = this.props.types[this.props.returnType][DEFAULT_DATA]
    // console.log("FUNC TO USE", func_to_use)
    let toReturn = func_to_use.TODO(this.state.input)
    console.log("CALLED FROM BLOCK - RETURNING", toReturn)
    return toReturn
  }

  onInputChange = (event) => {
    const target = event.target
    const value = target.value
    console.log("TYPE CHANGED", target, value);
    this.setState({ input: target })
  }

  // FIX THIS SHIT LMAOOOOO
  render() {
    return (this.props.returnType === DATA_TYPES.BOOLEAN) ?
      (<span><input onChange={this.onInputChange} type="checkbox" value={"true"}/> True</span>) :
      <input onChange={this.onInputChange} type={this.props.returnType} />
  }
}

class Codeblock extends React.Component {
  DEFAULT_RETURN_TYPE = "CHOOSE RETURN TYPE";
  DEFAULT_FUNCTION = "CHOOSE A FUNCTION";

  // Is the function an ANY return type or is it a specific return type?
  // Return the right function to use and avoid a key error
  IS_ANY = (funcname) =>
    (this.state.types[this.state.returnType].hasOwnProperty(funcname)) ?
      this.state.types[this.state.returnType][funcname] :
      this.state.types[DATA_TYPES.ANY][funcname];

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      types: props.types,
      returnType: props.inputType,
      selectedFunc: null,
      params: null
    };
    console.log("CONSTRUCTOR STATE", this.state)
  }

  compute = () => {
    let toReturn = null
    console.log("EXPECTED RETURN TYPE", this.IS_ANY(this.state.selectedFunc))
    console.log("PARAMS", this.state.params)
    let computed_params = this.state.refs.map(x => x.current.compute());
    console.log("COMPUTED PARAMS", computed_params)
    if(this.state.selectedFunc === DEFAULT_DATA) {
      console.log("RETURNING", computed_params[0])
      return computed_params[0]
    }

    let func_to_use = this.IS_ANY(this.state.selectedFunc)
    console.log("FUNC TO USE", this.state.selectedFunc, func_to_use)
    let result = func_to_use.TODO(...computed_params)
    console.log("RESULT", result)
    this.props.dispatch(addElement(result))
    return result
    // console.log("COMPUTED PARAMS", this.state.params.map(x => x.type))
    // console.log("COMPUTED PARAMS", this.state.params.map(x => x.compute()))
  }

  changeType = value => {
    this.setState({
      returnType: value,
      selectedFunc: null,
      params: null
    })
  }

  changeFunc = value => {
    var params = null;
    var refs = []
    if(value != null) {
      if(value === DEFAULT_DATA) {
        // params = (this.state.returnType === DATA_TYPES.BOOLEAN) ? (<span><input type="checkbox" value={"true"}/> True</span>) : <input type={this.state.returnType} />
        refs = React.createRef()
        params = <Block ref={refs} types={this.state.types} returnType={this.state.returnType} />
        params = [params]
        refs = [refs]
      }
      else {
        // Func might be under ANY or under actual return type
        var func = this.IS_ANY(value);
        params = func.PARAMS;
        var types = func.PARAM_TYPES.map(x => (x === DATA_TYPES.ANY) ? this.state.returnType : x)
        console.log("REQUIRED PARAMS", params)
        console.log("TYPES", types)
        // params -> [[TYPE, PARAM], [TYPE, PARAM] ...]

        params = params.map((x, i) => [types[i], x]).map(x => {
          var refToUse = React.createRef()
          refs.push(refToUse)
          return(<Codeblock inputType={x[0]}
                     ref={refToUse}
                     name={x[1]}
                     types={this.state.types}/>)
        });
        // params = params
        console.log("PARAMS", params)
      }
    }
    this.setState({
      selectedFunc: value,
      params: params,
      refs: refs
    })
  }

  handleTypeChange = event => {
    const target = event.target
    const value = target.value
    console.log("TYPE CHANGED", target, value);
    this.changeType(value)
  }

  handleFuncChange = event => {
    const target = event.target
    const value = target.value
    console.log("FUNC CHANGED", target, value)
    this.changeFunc(value);
  }

  handleNameChange = event => {
    const target = event.target
    const value = target.value
    console.log("NAME CHANGED", value)
    this.setState({
      name: value
    })
  }

  render() {
    console.log("WHERE ARE MY PARAMS", this.state.params)
    console.log("CURRENT STATE", this.state)
    var types = Object.keys(this.state.types)
    console.log("INPUT TYPE", this.props.inputType)

    var given_name = this.props.name;
    var var_name = <span>{given_name}</span>
    if(given_name == null) {
      var_name = <input type="text" onChange={this.handleNameChange} />
    }

    // If input type is fixed, display input type, else display options
    var return_type = (this.props.inputType == null) ?
      (<select onChange={this.handleTypeChange}>
        {(this.state.returnType == null) ? (<option>{this.DEFAULT_RETURN_TYPE}</option>) : null}
        {types.filter(x => x !== DATA_TYPES.ANY).map(x =>
          <option>{x}</option>
        )}
      </select>) : <span>{this.props.inputType} </span>

    var funcs = null;
    if(this.state.returnType != null) {
      var toReturn = this.state.returnType
      console.log("FUNCS", this.state.types[toReturn])
      funcs = (<select onChange={this.handleFuncChange}>
        {(this.state.selectedFunc == null) ? (<option selected>{this.DEFAULT_FUNCTION}</option>) : null}
        {Object.keys(this.state.types[toReturn]).map(x => <option>{x}</option>)}
        {Object.keys(this.state.types[DATA_TYPES.ANY]).map(x => <option>{x}</option>)}
      </select>)
    }

    var params = this.state.params

    return (<div>
      {var_name}
      <span> is a </span>
      {return_type}
      {(funcs == null) ? null : <span> defined by </span>}
      {funcs}
      {(params == null || this.state.selectedFunc === DEFAULT_DATA) ? null : <span> where </span>}
      <div style={{marginLeft: "50px"}}>{params}</div>
      <button onClick={this.compute}>Compute</button>
      <br />
    </div>)
  }
}

export default connect(state => ({
  types: state.app.funcs,
  elements: state.app.elements
}), null)(Codeblock)