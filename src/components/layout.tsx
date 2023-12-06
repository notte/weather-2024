import { Outlet } from 'react-router-dom'
import { useState } from 'react'

const layout = () => {
  const options = ['選項一', '選項二', '選項三', '選項四']
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  return (
    <>
      <div className="layout">
        <header>
          <div className="container">
            <div className="warn">
              <button>警告訊息</button>
            </div>
            <div className="opitions">
              <button className="position">定位城市</button>
              <select
                id="dropdown"
                onChange={handleOptionChange}
                value={selectedOption || ''}
              >
                <option value="" disabled>
                  請選擇
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
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
