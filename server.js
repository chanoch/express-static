const describeEnvironment = require('./describeEnvironment')
const initialiseServer = require('express-vanilla')

describeEnvironment(process.env.IMMEDIATELY_DESCRIBE_ENV)

initialiseServer()
