import React, { useEffect } from 'react'
import lodash from 'lodash'

const About = () => {
  useEffect(() => {
    console.log(lodash)
  }, [])
  return <div>Abount</div>
}

export default About
