import { Outlet } from 'react-router-dom'
import Opitions from './opitions'
import Loading from './loading'

const layout = () => {
  return (
    <>
      {/* <Loading /> */}
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
