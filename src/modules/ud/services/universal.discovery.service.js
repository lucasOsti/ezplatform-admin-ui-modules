import { showErrorNotification } from '../../common/services/notification.service';
import { handleRequestResponse } from '../../common/helpers/request.helper.js';

const HEADERS_CREATE_VIEW = {
    Accept: 'application/vnd.ez.api.View+json; version=1.1',
    'Content-Type': 'application/vnd.ez.api.ViewInput+json; version=1.1',
};
const ENDPOINT_CREATE_VIEW = '/api/ezp/v2/views';

export const QUERY_LIMIT = 50;

export const findLocationsByParentLocationId = (
    { token, siteaccess, parentLocationId, limit = QUERY_LIMIT, offset = 0, sortClauses = { SectionIdentifier: 'ascending' } },
    callback
) => {
    const body = JSON.stringify({
        ViewInput: {
            identifier: `udw-locations-by-parent-location-id-${parentLocationId}`,
            public: false,
            LocationQuery: {
                Criteria: {},
                FacetBuilders: {},
                SortClauses: sortClauses,
                Filter: { ParentLocationIdCriterion: parentLocationId },
                limit,
                offset,
            },
        },
    });
    const request = new Request(ENDPOINT_CREATE_VIEW, {
        method: 'POST',
        headers: { ...HEADERS_CREATE_VIEW, 'X-Siteaccess': siteaccess, 'X-CSRF-Token': token },
        body,
        mode: 'same-origin',
        credentials: 'same-origin',
    });

    fetch(request)
        .then(handleRequestResponse)
        .then((json) => {
            const items = json.View.Result.searchHits.searchHit.map((searchHit) => searchHit.value.Location);

            callback({
                parentLocationId,
                offset,
                items,
            });
        })
        .catch(showErrorNotification);
};