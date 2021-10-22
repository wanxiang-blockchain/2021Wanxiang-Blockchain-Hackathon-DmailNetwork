import * as React from 'react';
import { Pagination } from 'react-admin';

// https://material-ui.com/zh/components/data-grid/pagination/
const PostPagination = props => {
    return (
        <Pagination rowsPerPageOptions={[10]} labelRowsPerPage={''} {...props} limit={null} />
    )
}

export default PostPagination;