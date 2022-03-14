import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Footer from './gui/components/footer'
import Navbar from './gui/components/navbar'

import Contact from './gui/screens/Contact'
import Home from './gui/screens/Home'
import LegalNotices from './gui/screens/LegalNotices'
import CGUCGV from './gui/screens/CGUCGV'
import PrivacyPolicy from './gui/screens/PrivacyPolicy'
import RedirectionError from './gui/screens/RedirectionError'
import Scenarios from './gui/screens/Scenarios'
import WhatIsThat from './gui/screens/WhatIsThat'
import Cookies from './gui/screens/Cookies'
import { GlobalStyles } from './style/global'
import { theme } from './style/theme'

const App: React.VoidFunctionComponent = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyles />

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/enquoicaconsiste" element={<WhatIsThat />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<LegalNotices />} />
            <Route path="/cgu-cgv" element={<CGUCGV />} />
            <Route path="/confidentialite" element={<PrivacyPolicy />} />
            <Route path="/join/*" element={<RedirectionError />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
