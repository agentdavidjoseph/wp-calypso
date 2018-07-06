/** @format */

export const filterStateToApiQuery = filter =>
	Object.assign(
		{},
		filter.action && { action: filter.action },
		filter.after && { after: filter.after },
		filter.before && { before: filter.before },
		filter.by && { by: filter.by },
		filter.dateRange && { date_range: filter.dateRange },
		filter.group && filter.group.includes && { group: filter.group.includes },
		filter.group && filter.group.excludes && { not_group: filter.group.excludes },
		filter.name && { name: filter.name },
		{ number: 1000 }
	);

export const filterStateToQuery = filter =>
	Object.assign(
		{},
		filter.action && { action: filter.action.join( ',' ) },
		filter.after && { after: filter.after },
		filter.before && { before: filter.before },
		filter.by && { by: filter.by },
		filter.dateRange && { date_range: filter.dateRange },
		filter.group && filter.group.includes && { group: filter.group.includes.join( ',' ) },
		filter.group && filter.group.excludes && { not_group: filter.group.excludes( ',' ) },
		filter.name && { name: filter.name.join( ',' ) },
		filter.page > 1 && { page: filter.page }
	);

export const queryToFilterState = query =>
	Object.assign(
		{},
		query.action && { action: decodeURI( query.action ).split( ',' ) },
		query.after && { after: query.after },
		query.before && { before: query.before },
		query.by && { by: query.by },
		query.date_range && { dateRange: query.date_range },
		query.group && {
			group: Object.assign( {}, { includes: decodeURI( query.group ).split( ',' ) } ),
		},
		query.name && { name: decodeURI( query.name ).split( ',' ) },
		query.not_group && {
			group: Object.assign( {}, { excludes: decodeURI( query.not_group ).split( ',' ) } ),
		},
		query.page && query.page > 0 && { page: query.page }
	);
