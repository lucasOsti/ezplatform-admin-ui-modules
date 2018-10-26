import React from 'react';
import PropTypes from 'prop-types';

const PaginationButtonComponent = ({ label, disabled, additionalClasses, onPageChange, page }) => {
    const handleClick = () => {
        if (!disabled && Number.isInteger(page)) {
            onPageChange(page);
        }
    };

    let className = `c-pagination-button page-item ${additionalClasses}`;

    className = disabled ? `${className} disabled` : className;

    return (
        <li className={className}>
            <button className="page-link" onClick={handleClick}>
                {label}
            </button>
        </li>
    );
};

PaginationButtonComponent.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onPageChange: PropTypes.func,
    page: PropTypes.number,
    additionalClasses: PropTypes.string,
};

PaginationButtonComponent.defaultProps = {
    disabled: false,
    additionalClasses: '',
    onPageChange: () => {},
};

export default PaginationButtonComponent;
