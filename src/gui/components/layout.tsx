import Head from 'next/head'
import Script from 'next/script'
import { useCookies } from 'react-cookie'

import * as Constants from '@/src/constants'
import useCurrentUser from '@/src/hooks/useCurrentUser'

import Footer from '../../gui/components/footer'
import Navbar from '../../gui/components/navbar'

interface LayoutProps {
  meta: {
    title: string
    description: string
  }
  noIndex?: boolean
  children: React.ReactElement
}

export default function Layout({ meta, children, noIndex }: LayoutProps) {
  useCurrentUser(true)

  // RGPD : ne charger Google Tag Manager qu'après consentement explicite.
  // Le cookie `ga-consent` est posé par le bandeau `CookiesBanner`
  // (react-cookie-consent), avec la valeur "true" si l'utilisateur a accepté.
  // `useCookies` déclenche un re-render dès que le cookie change, ce qui
  // permet de charger les scripts immédiatement après acceptation.
  const [cookies] = useCookies([Constants.GA_CONSENT_COOKIE])
  const gaConsentGranted =
    cookies[Constants.GA_CONSENT_COOKIE] === true ||
    cookies[Constants.GA_CONSENT_COOKIE] === 'true'

  const gaTrackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

  return (
    <div>
      {gaConsentGranted && gaTrackingId !== undefined && gaTrackingId !== '' && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
          />

          <Script id="ga" strategy="lazyOnload">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                });
            `}
  