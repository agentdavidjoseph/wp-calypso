/** @format */

export const filterStateToApiQuery = filter =>
	Object.assign(
		{},
		filter.after && { after: filter.after },
		filter.before && { before: filter.before },
		filter.by && { by: filter.by },
		filter.date_range && { date_range: filter.date_range },
		filter.group && filter.group.includes && { group: filter.group.includes },
		filter.group && filter.group.excludes && { not_group: filter.group.excludes },
		{ number: 1000 }
	);

export const filterStateToQuery = filter =>
	Object.assign(
		{},
		filter.after && { after: filter.after },
		filter.before && { before: filter.before },
		filter.by && { by: filter.by },
		filter.date_range && { date_range: filter.date_range },
		filter.group && filter.group.includes && { group: filter.group.includes.join( ',' ) },
		filter.group && filter.group.excludes && { not_group: filter.group.excludes( ',' ) },
		filter.page > 1 && { page: filter.page }
	);

export const queryToFilterState = query =>
	Object.assign(
		{},
		query.after && { after: query.after },
		query.before && { before: query.before },
		query.by && { by: query.by },
		query.date_range && { date_range: query.date_range },
		query.group && {
			group: Object.assign( {}, { includes: decodeURI( query.group ).split( ',' ) } ),
		},
		query.not_group && {
			group: Object.assign( {}, { excludes: decodeURI( query.not_group ).split( ',' ) } ),
		},
		query.page && query.page > 0 && { page: query.page }
	);
