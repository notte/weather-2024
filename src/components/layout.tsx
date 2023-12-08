import { Outlet } from 'react-router-dom'
import Opitions from './opitions'

const layout = () => {
  return (
    <>
      <div className="layout">
        <header>
          <div className="container">
            <div className="warn">
              <button>警告訊息</button>
            </div>
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
