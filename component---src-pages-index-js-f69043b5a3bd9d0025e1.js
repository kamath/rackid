(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{RXBc:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),r=n.n(a),l=n("Wbzz"),o=n("/MKj"),u=n("Bl7J"),s=n("vrFN"),c=(n("a1Th"),n("XfO3"),n("HEwt"),n("rE2o"),n("ioFf"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("f3/d"),n("3F9S"));function p(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function m(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var E=function(e){function t(t){var n;(n=e.call(this,t)||this).compute=function(){var e=n.props.types[n.props.returnType][c.b].TODO(n.state.input);return console.log("CALLED FROM BLOCK - RETURNING",e),e},n.onInputChange=function(e){var t=e.target,a=t.value;console.log("TYPE CHANGED",t,a),n.setState({input:t})};var a=n.props.returnType===c.a.BOOLEAN?r.a.createElement("input",{onChange:n.onInputChange,type:"checkbox",value:"true"}):r.a.createElement("input",{onChange:n.onInputChange,type:n.props.returnType});return n.state={input:a},n}return m(t,e),t.prototype.render=function(){return this.props.returnType===c.a.BOOLEAN?r.a.createElement("span",null,r.a.createElement("input",{onChange:this.onInputChange,type:"checkbox",value:"true"})," True"):r.a.createElement("input",{onChange:this.onInputChange,type:this.props.returnType})},t}(r.a.Component),h=function(e){function t(n){var a;return(a=e.call(this,n)||this).DEFAULT_RETURN_TYPE="CHOOSE RETURN TYPE",a.DEFAULT_FUNCTION="CHOOSE A FUNCTION",a.IS_ANY=function(e){return a.state.types[a.state.returnType].hasOwnProperty(e)?a.state.types[a.state.returnType][e]:a.state.types[c.a.ANY][e]},a.compute=function(){console.log("EXPECTED RETURN TYPE",a.IS_ANY(a.state.selectedFunc)),console.log("PARAMS",a.state.params);var e=a.state.refs.map((function(e){return e.current.compute()}));if(console.log("COMPUTED PARAMS",e),a.state.selectedFunc===c.b)return console.log("RETURNING",e[0]),e[0];var t=a.IS_ANY(a.state.selectedFunc);console.log("FUNC TO USE",a.state.selectedFunc,t);var n=t.TODO.apply(t,p(e));return console.log("RESULT",n),a.props.dispatch(Object(c.d)(n)),n},a.changeType=function(e){a.setState({returnType:e,selectedFunc:null,params:null})},a.changeFunc=function(e){var n=null,l=[];if(null!=e)if(e===c.b)l=r.a.createRef(),n=[n=r.a.createElement(E,{ref:l,types:a.state.types,returnType:a.state.returnType})],l=[l];else{var o=a.IS_ANY(e);n=o.PARAMS;var u=o.PARAM_TYPES.map((function(e){return e===c.a.ANY?a.state.returnType:e}));console.log("REQUIRED PARAMS",n),console.log("TYPES",u),n=n.map((function(e,t){return[u[t],e]})).map((function(e){var n=r.a.createRef();return l.push(n),r.a.createElement(t,{inputType:e[0],ref:n,dispatch:a.props.dispatch,name:e[1],types:a.state.types})})),console.log("PARAMS",n)}a.setState({selectedFunc:e,params:n,refs:l})},a.handleTypeChange=function(e){var t=e.target,n=t.value;console.log("TYPE CHANGED",t,n),a.changeType(n)},a.handleFuncChange=function(e){var t=e.target,n=t.value;console.log("FUNC CHANGED",t,n),a.changeFunc(n)},a.handleNameChange=function(e){var t=e.target.value;console.log("NAME CHANGED",t),a.setState({name:t})},a.state={name:n.name,types:n.types,returnType:n.inputType,selectedFunc:null,params:null},console.log("CONSTRUCTOR STATE",a.state),a}return m(t,e),t.prototype.render=function(){console.log("WHERE ARE MY PARAMS",this.state.params),console.log("CURRENT STATE",this.state);var e=Object.keys(this.state.types);console.log("INPUT TYPE",this.props.inputType);var t=this.props.name,n=r.a.createElement("span",null,t);null==t&&(n=r.a.createElement("input",{type:"text",onChange:this.handleNameChange}));var a=null==this.props.inputType?r.a.createElement("select",{onChange:this.handleTypeChange},null==this.state.returnType?r.a.createElement("option",null,this.DEFAULT_RETURN_TYPE):null,e.filter((function(e){return e!==c.a.ANY})).map((function(e){return r.a.createElement("option",null,e)}))):r.a.createElement("span",null,this.props.inputType," "),l=null;if(null!=this.state.returnType){var o=this.state.returnType;console.log("FUNCS",this.state.types[o]),l=r.a.createElement("select",{onChange:this.handleFuncChange},null==this.state.selectedFunc?r.a.createElement("option",{selected:!0},this.DEFAULT_FUNCTION):null,Object.keys(this.state.types[o]).map((function(e){return r.a.createElement("option",null,e)})),Object.keys(this.state.types[c.a.ANY]).map((function(e){return r.a.createElement("option",null,e)})))}var u=this.state.params;return r.a.createElement("div",null,n,r.a.createElement("span",null," is a "),a,null==l?null:r.a.createElement("span",null," defined by "),l,null==u||this.state.selectedFunc===c.b?null:r.a.createElement("span",null," where "),r.a.createElement("div",{style:{marginLeft:"50px"}},u),r.a.createElement("button",{onClick:this.compute},"Compute"),r.a.createElement("br",null))},t}(r.a.Component),y=Object(o.b)((function(e){return{types:e.app.funcs,elements:e.app.elements}}),null)(h),f=function(e){var t=e.tags;return r.a.createElement("svg",{style:{border:"2px solid black",width:"100%",height:"500px"}},t)};t.default=Object(o.b)((function(e){return{isDarkMode:e.app.isDarkMode,elements:e.app.elements,funcs:e.app.funcs,blocks:e.app.blocks}}),null)((function(e){var t=e.isDarkMode,n=e.elements,a=(e.funcs,e.blocks),o=e.dispatch;return console.log(n),console.log("DATA TYPES",c.a),r.a.createElement(u.a,null,r.a.createElement(s.a,{title:"Home",keywords:["gatsby","application","react"]}),r.a.createElement("div",null,r.a.createElement(f,{tags:n})),r.a.createElement("button",{style:t?{background:"black",color:"white"}:null,onClick:function(){return o(Object(c.f)(!t))}},"Dark mode ",t?"on":"off"),r.a.createElement("button",{style:t?{background:"black",color:"white"}:null,onClick:function(){return o(Object(c.c)(r.a.createElement(y,{inputType:null,name:null})))}},"Add Function"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",null,a),r.a.createElement(l.Link,{to:"/page-2/"},"Go to page 2"))}))}}]);
//# sourceMappingURL=component---src-pages-index-js-f69043b5a3bd9d0025e1.js.map