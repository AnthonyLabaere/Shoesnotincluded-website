import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router';

const ReactGAPageView = (): React.ReactElement => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [location]);
  return <></>;
};

export default ReactGAPageView;
