import { useState, useCallback } from 'react'
import { map } from 'lodash'

const opitions = () => {
  const options = ['選項一', '選項二', '選項三', '選項四']
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  return (
    <>
      <div className="opitions">
        {/* <select
          id="dropdown"
          onChange={handleOptionChange}
          value={selectedOption || ''}
        >
          <option value="" disabled>
            請選擇
          </option>
          {map(options, (option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select> */}
      </div>
    </>
  )
}

export default opitions
