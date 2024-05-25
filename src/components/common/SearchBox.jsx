import { FaSearch } from "react-icons/fa"
import { MdOutlineClear } from "react-icons/md"
import PropTypes from 'prop-types'

import './SearchBox.css'

const Searchbox = ({ className = '', query, onChange }) => {
  return (
    <form className={`${className} searchbox-container`} noValidate action="" role="search">
      <div className="searchbox-icon">
        <FaSearch />
      </div>
      <input
        type="text"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search..."
      />
      {query && (
        <div className="searchbox-clear-icon" onClick={() => onChange('')}>
          <MdOutlineClear />
        </div>
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
