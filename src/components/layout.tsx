import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const layout = () => {
  return (
    <>
      <div className="layout">
        <div className="switch">
          <NavLink to="weather">天氣觀測</NavLink>
          <NavLink to="air">空氣品質</NavLink>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default layout
