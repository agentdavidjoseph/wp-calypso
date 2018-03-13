/** @format */
/**
 * External dependencies
 */
import { get } from 'lodash';

export default function( state, siteId ) {
	return get( state, [ 'siteRename', 'availability', siteId, 'isValidatedAddressAvailable' ], '' );
}