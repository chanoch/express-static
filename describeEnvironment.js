/* eslint-disable no-console */

const describeEnvironment = run => {
  if(run) {
    console.log(`Using port ${process.env.PORT}`)
  }
}

module.exports = describeEnvironment
