import { Outlet } from 'react-router-dom'
import Opitions from './opitions'

const layout = () => {
  return (
    <>
      <div className="layout">
        <Opitions />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default layout
