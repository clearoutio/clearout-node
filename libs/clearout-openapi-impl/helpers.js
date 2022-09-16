function handleError(error) {
  if (error.response && error.response.data) {
    return error.response.data.error; // => the response payload 
  }
  return error
}

function handleResult(result) {
  if (result && result.data && result.data.status === 'failed') {
    throw result.data.error; // => the response payload 
  }
  return result.data.data
}

module.exports = {
  handleError, handleResult
}