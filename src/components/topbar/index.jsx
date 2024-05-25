import CustomSearchBox from '@/components/topbar/CustomSearchBox'
import './index.css'

const TopBar = () => {
  return (
    <div className='topbar-container'>
      <div className='topbar-content'>
        <CustomSearchBox />
      </div>
    </div>
  )
}

export default TopBar
