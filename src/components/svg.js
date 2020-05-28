import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, {Component} from "react"

class Svg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
    };
  }

  toggleShow = () => {
    this.setState(state => ({ isShow: !state.isShow }));
  };

  render() {
    const Greeting = ({ greeting }) => <h1>{greeting}</h1>;
    return (
      <div>
        {this.state.isShow ? <Greeting greeting={"Greeting"} /> : null}

        <button onClick={this.toggleShow} type="button">
          Toggle Show
        </button>
      </div>
    );
  }
}

// Svg.propTypes = {
//   tags: PropTypes.array,
// }
//
// Svg.defaultProps = {
//   tags: [],
// }

export default Svg
