"use strict";

var React = require('react');


var Input = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		lable: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired,
		placeholder: React.PropTypes.string,
		value: React.PropTypes.string,
		error: React.PropTypes.string
	},

render: function() {
	var wrapperClass = '';
	if (this.props.error && this.props.error.length > 0) {
		wrapperClass += " " + 'has-error';
	}

	return (
	<div className={wrapperClass}>
		<lable className="lable" htmlFor={this.props.name}>{this.props.lable}</lable>
		<div className="field">
			<input type="text"
				name={this.props.name}
				className="form-control" 
				placeholder={this.props.placeholder} 
				ref={this.props.name}
				onChange={this.props.onChange}
				value={this.props.value} />
			<div className="input">{this.props.error}</div>
		</div>		
	</div>
	);
}
});

module.exports = Input;
