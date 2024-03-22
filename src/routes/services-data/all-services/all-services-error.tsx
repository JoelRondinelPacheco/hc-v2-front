import React from 'react'
import { useRouteError } from 'react-router-dom'

function AllServiceError() {
    const error = useRouteError();
    console.log(error)
  return (
    <div><h1>ALL SERVICES ERROR</h1>
    </div>
  )
}

export default AllServiceError