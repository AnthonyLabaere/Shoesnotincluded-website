import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Footer from './gui/components/footer'
import Navbar from './gui/components/navbar'
import ScrollToTop from './gui/components/scrollToTop'

import Contact from './gui/screens/Contact'
import Home from './gui/screens/Home'
import LegalNoticesAndCGU from './gui/screens/LegalNoticesAndCGU'
import PrivacyPolicy from './gui/screens/PrivacyPolicy'
import WhatIsThat from './gui/screens/WhatIsThat'
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
              <Route path="/cgu" exact component={LegalNoticesAndCGU} />
              <Route path="/confidentialite" exact component={PrivacyPolicy} />
            </Switch>
          </ScrollToTop>

          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
