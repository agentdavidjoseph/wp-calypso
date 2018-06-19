/**
 * External dependencies
 */
import { flow, noop, last, every, first, castArray } from 'lodash';
import React from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';
import { compose } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { cloneBlock, getBlockType } from '@wordpress/blocks';

export function BlockDuplicateButton( { blocks, onDuplicate, onClick = noop, isLocked, small = false, role } ) {
	const canDuplicate = every( blocks, ( block ) => {
		const type = getBlockType( block.name );
		return ! type.useOnce;
	} );
	if ( isLocked || ! canDuplicate ) {
		return null;
	}

	const label = __( 'Duplicate' );

	return (
		<IconButton
			className="editor-block-settings-menu__control"
			onClick={ flow( onDuplicate, onClick ) }
			icon="admin-page"
			label={ small ? label : undefined }
			role={ role }
		>
			{ ! small && label }
		</IconButton>
	);
}

export default compose(
	withSelect( ( select, { uids, rootUID } ) => {
		const { getBlocksByUID, getBlockIndex, getEditorSettings } = select( 'core/editor' );
		const { templateLock } = getEditorSettings();
		return {
			blocks: getBlocksByUID( uids ),
			index: getBlockIndex( last( castArray( uids ) ), rootUID ),
			isLocked: !! templateLock,
		};
	} ),
	withDispatch( ( dispatch, { blocks, index, rootUID } ) => ( {
		onDuplicate() {
			const clonedBlocks = blocks.map( ( block ) => cloneBlock( block ) );
			dispatch( 'core/editor' ).insertBlocks(
				clonedBlocks,
				index + 1,
				rootUID
			);
			if ( clonedBlocks.length > 1 ) {
				dispatch( 'core/editor' ).multiSelect( first( clonedBlocks ).uid, last( clonedBlocks ).uid );
			}
		},
	} ) ),
)( BlockDuplicateButton );
