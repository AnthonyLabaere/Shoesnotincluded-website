import { useFormik } from 'formik'
import React from 'react'

import Layout from '@/src/gui/components/layout'

import * as FirebaseFunctions from '../../firebase/functions'
import Button from '../../gui/components/button'
import { ContentContainer } from '../../gui/components/common'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'
import * as NotificationUtils from '../../utils/notificationUtils'
import styles from './index.module.scss'

interface ContactErrors {
  lastName?: string
  firstName?: string
  email?: string
  subject?: string
  message?: string
}

const Contact = (): React.ReactElement => {
  const validate = (values: {
    firstName?: string
    lastName?: string
    email?: string
    subject?: string
    message?: string
  }): ContactErrors => {
    const errors: ContactErrors = {}
    if (values.lastName == null || values.lastName === '') {
      errors.lastName = 'Champ requis'
    }
    if (values.firstName == null || values.firstName === '') {
      errors.firstName = 'Champ requis'
    }
    if (values.email == null || values.email === '') {
      errors.email = 'Champ requis'
    }
    if (values.subject == null || values.subject === '') {
      errors.subject = 'Champ requis'
    }
    if (values.message == null || values.message === '') {
      errors.message = 'Champ requis'
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      lastName: '',
      firstName: '',
      email: '',
      subject: '',
      message: '',
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      FirebaseFunctions.contact(
        values.lastName,
        values.firstName,
        values.email,
        values.subject,
        values.message,
        () => {
          NotificationUtils.handleMessage(
            `Votre message a été envoyé. Nous vous répondrons dès que possible.`
          )
          setSubmitting(false)
        },
        () => {
          setSubmitting(false)
        }
      )
    },
  })

  return (
    <Layout
      meta={{
        title: 'Escape Game - Contact - ShoesNotIncluded',
        description:
          "Contactez l'équipe de ShoesNotIncluded pour demander un devis pour une activité de team building ou pour toute question sur nos escape games en extérieur.",
      }}
      noIndex
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Nous contacter</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentContainer className={styles.contactFormContentContainer}>
            <h2>
              Une question sur l&apos;application, l&apos;un des scénarios ou
              une demande de devis pour un activité d&apos;entreprise ?
            </h2>
            <h3 className="mb-5">
              Merci de remplir le formulaire ci-dessous :
            </h3>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="lastName">Nom</label>
                <input className={styles.input} id="lastName"
                  type="text"
                  {...formik.getFieldProps('lastName')}
                />
                <div className={styles.errorMessage}>
                  {formik.touched.lastName === true &&
                  formik.errors.lastName != null
                    ? formik.errors.lastName
                    : ''}
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="firstName">Prénom</label>
                <input className={styles.input} id="firstName"
                  type="text"
                  {...formik.getFieldProps('firstName')}
                />
                <div className={styles.errorMessage}>
                  {formik.touched.firstName === true &&
                  formik.errors.firstName != null
                    ? formik.errors.firstName
                    : ''}
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="email">Adresse mail</label>
                <input className={styles.input} id="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                />
                <div className={styles.errorMessage}>
                  {formik.touched.email === true && formik.errors.email != null
                    ? formik.errors.email
                    : ''}
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="subject">Objet</label>
                <input className={styles.input} id="subject"
                  type="text"
                  {...formik.getFieldProps('subject')}
                />
                <div className={styles.errorMessage}>
                  {formik.touched.subject === true &&
                  formik.errors.subject != null
                    ? formik.errors.subject
                    : ''}
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="message">Message</label>
                <textarea className={styles.textarea} id="message" {...formik.getFieldProps('message')} />
                <div className={styles.errorMessage}>
                  {formik.touched.message === true &&
                  formik.errors.message != null
                    ? formik.errors.message
                    : ''}
                </div>
              </div>

              <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
              </Button>
            </form>
          </ContentContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

export default Contact
