import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import CookieConsent from 'react-cookie-consent';

import * as Constants from '../../constants';

const CookiesBanner = (): React.ReactElement => {
  const [cookies, , removeCookie] = useCookies([
    Constants.GA_CONSENT_COOKIE,
    ...Constants.GA_COOKIES
  ]);

  const removeGACookies = (): void => {
    Constants.GA_COOKIES.forEach((gaCookie) => {
      // console.log('removeCookie', gaCookie);
      removeCookie(gaCookie, { path: '/', domain: window.location.hostname });
      removeCookie(gaCookie, { path: '/', domain: window.location.hostname.replace('www', '') });
    });
  };

  useEffect(() => {
    if (
      cookies[Constants.GA_CONSENT_COOKIE] === false ||
      cookies[Constants.GA_CONSENT_COOKIE] === 'false'
    ) {
      removeGACookies();
    }
  }, [cookies]);

  return (
    <CookieConsent
      location="bottom"
      buttonText="Continuer"
      cookieName={Constants.GA_CONSENT_COOKIE}
      style={{ background: Constants.THEME_BLACK_COLOR }}
      buttonStyle={{
        backgroundColor: Constants.THEME_TURQUOISE_COLORS[0],
        color: Constants.THEME_BLACK_COLOR
      }}
      declineButtonStyle={{
        backgroundColor: Constants.THEME_RED_COLORS[0],
        color: Constants.THEME_WHITE_COLOR
      }}
      onAccept={() => {}}
      enableDeclineButton
      onDecline={() => {
        removeGACookies();
      }}
      declineButtonText="Refuser les cookies"
      buttonWrapperClasses="cookiesConsentBannerButtonWrapper"
      expires={150}>
      En poursuivant votre navigation, vous nous autorisez à déposer des cookies à des fins de
      mesure d&apos;audience.
    </CookieConsent>
  );
};

export default CookiesBanner;
