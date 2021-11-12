import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Footer from './gui/components/footer'
import Navbar from './gui/components/navbar'
import ScrollToTop from './gui/components/scrollToTop'

import Contact from './gui/screens/Contact'
import Home from './gui/screens/Home'
import LegalNotices from './gui/screens/LegalNotices'
import CGUCGV from './gui/screens/CGUCGV'
import PrivacyPolicy from './gui/screens/PrivacyPolicy'
import RedirectionError from './gui/screens/RedirectionError'
import WhatIsThat from './gui/screens/WhatIsThat'
import Cookies from './gui/screens/Cookies'
import { GlobalStyles } from './style/global'
import { theme } from './style/theme'

const App: React.VoidFunctionComponent = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <GlobalStyles />

          <Navbar />

          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/enquoicaconsiste" exact component={WhatIsThat} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/mentions-legales" exact component={LegalNotices} />
              <Route path="/cgu-cgv" exact component={CGUCGV} />
              <Route path="/confidentialite" exact component={PrivacyPolicy} />
              <Route path="/join/*" exact component={RedirectionError} />
              <Route path="/cookies" exact component={Cookies} />
            </Switch>
          </ScrollToTop>

          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
