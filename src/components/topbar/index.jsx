import CustomSearchBox from '@/components/topbar/CustomSearchBox'
import SelectLanguage from '@/components/topbar/SelectLanguage'

import './index.css'

const TopBar = () => {
  return (
    <div className='topbar-container'>
      <div className='topbar-content'>
        <CustomSearchBox />
        <SelectLanguage/>
      </div>
    </div>
  )
}

export default TopBar
