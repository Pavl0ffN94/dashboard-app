import { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { JobPosition } from './JobPosition';
import { selectVisiblePositions } from 'store/position/position-selectors';
import { addFilter } from 'store/filters/filter-actions';
import { selectFilters } from 'store/filters/filter-selectors';

const JobListImpl = () => {
  const dispatch = useDispatch();
  const currentFilters = useSelector(selectFilters);
  const positions = useSelector((state) => selectVisiblePositions(state, currentFilters));

  const handleAddFilter = useCallback(
    (filter) => {
      dispatch(addFilter(filter));
    },
    [dispatch],
  );

  return (
    <div className='job-list'>
      {positions.map((item) => (
        <JobPosition key={item.id} handleAddFilter={handleAddFilter} {...item} />
      ))}
    </div>
  );
};

export const JobList = memo(JobListImpl);
