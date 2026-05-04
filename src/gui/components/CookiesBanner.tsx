import Link from 'next/link'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import CookieConsent from 'react-cookie-consent'

import * as Constants from '../../constants'

const CookiesBanner = (): React.ReactElement => {
  const [cookies, , removeCookie] = useCookies([
    Constants.GA_CONSENT_COOKIE,
    ...Constants.GA_COOKIES,
  ])

  const removeGACookies = (): void => {
    Constants.GA_COOKIES.forEach((gaCookie) => {
      // console.log('removeCookie', gaCookie);
      removeCookie(gaCookie, { path: '/', domain: window.location.hostname })
      removeCookie(gaCookie, {
        path: '/',
        domain: window.location.hostname.replace('www', ''),
      })
    })
  }

  useEffect(() => {
    if (
      cookies[Constants.GA_CONSENT_COOKIE] === false ||
      cookies[Constants.GA_CONSENT_COOKIE] === 'false'
    ) {
      removeGACookies()
    }
  }, [cookies])

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accepter"
      cookieName={Constants.GA_CONSENT_COOKIE}
      style={{ background: Constants.THEME_BLACK_COLOR }}
      buttonStyle={{
        backgroundColor: Constants.THEME_TURQUOISE_COLORS[0],
        color: Constants.THEME_BLACK_COLOR,
      }}
      declineButtonStyle={{
        backgroundColor: Constants.THEME_RED_COLORS[0],
        color: Constants.THEME_WHITE_COLOR,
      }}
      // onAccept={() => {}}
      enableDeclineButton
      onDecline={() => {
        removeGACookies()
      }}
      declineButtonText="Refuser"
      buttonWrapperClasses="cookiesConsentBannerButtonWrapper"
      expires={150}
    >
      Nous utilisons des cookies de mesure d&apos;audience pour comprendre
      comment notre site est utilisé. Aucun cookie n&apos;est déposé sans votre
      accord. Vous pouvez les accepter, les refuser, ou consulter notre{' '}
      <Link
        href="/cookies"
        style={{
          color: Constants.THEME_TURQUOISE_COLORS[0],
          textDecoration: 'underline',
        }}
      >
        politique cookies
      </Link>
      .
    </CookieConsent>
  )
}

export default CookiesBanner
