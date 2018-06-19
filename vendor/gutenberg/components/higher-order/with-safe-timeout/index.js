/**
 * External dependencies
 */
import { without } from 'lodash';

/**
 * WordPress dependencies
 */
import React, { Component } from 'react';

/**
 * Browser dependencies
 */
const { clearTimeout, setTimeout } = window;

/**
 * A higher-order component used to provide and manage delayed function calls
 * that ought to be bound to a component's lifecycle.
 *
 * @param {Component} OriginalComponent   Component requiring setTimeout
 *
 * @return {Component}                   Wrapped component.
 */
function withSafeTimeout( OriginalComponent ) {
	return class WrappedComponent extends Component {
		constructor() {
			super( ...arguments );
			this.timeouts = [];
			this.setTimeout = this.setTimeout.bind( this );
			this.clearTimeout = this.clearTimeout.bind( this );
		}

		componentWillUnmount() {
			this.timeouts.forEach( clearTimeout );
		}

		setTimeout( fn, delay ) {
			const id = setTimeout( () => {
				fn();
				this.clearTimeout( id );
			}, delay );
			this.timeouts.push( id );
			return id;
		}

		clearTimeout( id ) {
			clearTimeout( id );
			this.timeouts = without( this.timeouts, id );
		}

		render() {
			return (
				<OriginalComponent
					{ ...this.props }
					setTimeout={ this.setTimeout }
					clearTimeout={ this.clearTimeout }
				/>
			);
		}
	};
}

export default withSafeTimeout;
