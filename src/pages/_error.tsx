import { NextPageContext } from 'next';
import React from 'react';

const _error = ({ statusCode }: any) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
};

export default _error;

_error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res?.statusCode : err ? err?.statusCode : 404;
  return { statusCode };
};
