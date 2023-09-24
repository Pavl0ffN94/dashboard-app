import { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from 'UI/Badge';
import { Card } from 'UI/Card';
import { Stack } from 'UI/Stack';

import { selectFilters } from 'store/filters/filter-selectors';
import { removeFilter, clearFilter } from 'store/filters/filter-actions';

const FilterPanelImpl = () => {
  const dispatch = useDispatch();
  const currentFilters = useSelector(selectFilters);

  const clearsFilter = useCallback(() => dispatch(clearFilter), [dispatch]);

  if (currentFilters.length === 0) {
    return null;
  }

  return (
    <Card className='filter-panel'>
      <div className='filter-panel-wrapper'>
        <Stack>
          {currentFilters.map((filter) => (
            <Badge
              key={filter}
              variant='clearable'
              onClear={() => dispatch(removeFilter(filter))}>
              {filter}
            </Badge>
          ))}
        </Stack>

        <button className='link' onClick={clearsFilter}>
          Clear
        </button>
      </div>
    </Card>
  );
};

export const FilterPanel = memo(FilterPanelImpl);
