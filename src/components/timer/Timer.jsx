import React from 'react'
import { motion } from "motion/react"
import { tap } from 'node:test/reporters'
// import * as motion from "motion/react-client"

const Timer = () => {
    const box = {
    width: 100,
    height: 100,
    backgroundColor: "#ff0088",
    borderRadius: 5,
}
  return (
     <motion.div
    //  whileTap={tap}
            style={box}
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
        />
  )
}

export default Timer




