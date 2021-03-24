import React from "react";
import {sortableHandle} from 'react-sortable-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

export default sortableHandle(() => <FontAwesomeIcon icon={faArrowsAlt} />);
