import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

function AllServiceError() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText
  } else if (error instanceof Error){
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknow error';
  }
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurasdsred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}

export default AllServiceError