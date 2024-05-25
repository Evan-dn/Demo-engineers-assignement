import { useSearchBox } from 'react-instantsearch'
import Searchbox from '@/components/common/SearchBox'
import './CustomSearchBox.css'

const CustomSearchBox = () => {
  const { query, refine } = useSearchBox()

  const handleSearchChange = (newQuery) => refine(newQuery)

  return <Searchbox className='custom-searchbox' query={query} onChange={handleSearchChange} />
}

export default CustomSearchBox
