import { Outlet } from 'react-router-dom'
import Opitions from './opitions'

const layout = () => {
  return (
    <>
      <div className="layout">
        <header>
          <div className="opition-warp">
            <Opitions />
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default layout
