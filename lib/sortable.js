/** @jsx React.DOM */
var React = require('react/addons');
var Draggable = require('react-draggable');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      dragging: null
    };
  },

  handleDraggableStart: function (e) {
    // Purposefully not using `setState`
    this.state.dragging = e.target;
  },

  handleDraggableStop: function () {
    // TODO: Support animating back to origin
    var elem = this.state.dragging;
    elem.style.top = 0;
    elem.style.left = 0;

    // Purposefully not using `setState`
    this.state.dragging = null;
  },

  handleDraggableDrag: function (e) {
    var elem = this.state.dragging;
    var prev = elem.previousElementSibling;
    var next = elem.nextElementSibling;

    // TODO: Adjust top/left after re-inserting node
    // TODO: Handle horizontal sorting as well as vertical
    if (prev && e.clientY < (prev.offsetTop + (prev.offsetHeight/2))) {
      elem.parentNode.insertBefore(elem, prev);
    }
    else if (next && e.clientY > (next.offsetTop + (next.offsetHeight/2))) {
      elem.parentNode.insertBefore(next, elem);
    }
  },

	render: function () {
    var child = React.Children.only(this.props.children);
		return React.addons.cloneWithProps(child, {
      className: 'react-sortable',
      children: React.Children.map(child.props.children, function (item) {
        return (
          <Draggable
            onStart={this.handleDraggableStart}
            onStop={this.handleDraggableStop}
            onDrag={this.handleDraggableDrag}>
              {item}
          </Draggable>
        );
      }.bind(this))
    });
	}
});