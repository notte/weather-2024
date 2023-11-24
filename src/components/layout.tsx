import { Outlet } from 'react-router-dom'

const layout = () => {
  return (
    <>
      <div className="layout">
        <Outlet />
      </div>
    </>
  )
}

export default layout
