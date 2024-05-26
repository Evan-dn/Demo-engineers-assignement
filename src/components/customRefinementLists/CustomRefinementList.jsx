import { useState } from 'react'
import { useRefinementList } from 'react-instantsearch'
import PropTypes from 'prop-types'

import Searchbox from '@/components/common/SearchBox'
import Button from '@/components/common/Button'
import NoResult from '@/components/common/NoResult'

import './CustomRefinementList.css'

const CustomRefinementList = ({ attribute }) => {
  const {
    items,
    refine,
    searchForItems,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList({
    attribute: attribute.key,
    operator: 'and',
    showMore: true,
    sortBy: ['count:desc', 'name:asc'],
    limit: 8
  })

  const [query, setQuery] = useState('')

  const handleChange = (newQuery) => {
    setQuery(newQuery)
    searchForItems(newQuery)
  }

  const hasItems = items.length > 0
  return (
    <div className='refinement-list-container'>

      <h3>{attribute.name}</h3>
      
      <Searchbox className='refinement-list-container-search-box' query={query} onChange={handleChange} />
      <ul>
        {!hasItems && <NoResult/>}
        {items.map((item) => (
          <li className='refinement-list-li-container' key={item.label}>
            <label>
              <input
                className='refinement-list-checkbox'
                type="checkbox"
                checked={item.isRefined}
                onChange={() => refine(item.value)}
              />
              <span className='refinement-list-label'>{item.label}</span>
              <span className='refinement-list-count'>{item.count}</span>
            </label>
          </li>
        ))}
      </ul>
      <Button disabled={!hasItems} onClick={toggleShowMore}>
        {isShowingMore ? 'Show less' : 'Show more'}
      </Button>
    </div>
  )
}
CustomRefinementList.propTypes = {
  attribute: PropTypes?.object
}

export default CustomRefinementList
