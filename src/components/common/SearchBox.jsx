import { FaSearch } from "react-icons/fa"
import { GrClose } from "react-icons/gr"
import PropTypes from 'prop-types'

import './SearchBox.css'

const Searchbox = ({ className = '', query, onChange }) => {
  return (
    <form className={`${className} searchbox-container`} noValidate action="" role="search">
        <FaSearch className='searchbox-icon'/>
      <input
        type="text"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search..."
      />
      {query && (
        <GrClose className='searchbox-clear-icon' onClick={() => onChange('')} />
      )}
    </form>
  )
}

Searchbox.propTypes = {
  className: PropTypes?.string,
  query: PropTypes.string,
  onChange: PropTypes.func
}

export default Searchbox
