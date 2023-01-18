import { useFormik } from 'formik';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import * as Constants from '../../../constants';
import * as FirebaseFunctions from '../../../firebase/functions';
import { Theme } from '../../../style/theme';
import * as NotificationUtils from '../../../utils/notificationUtils';
import Button from '../../components/button';
import { ContentContainer } from '../../components/common';
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer
} from '../../components/pageContainer';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;
  width: 50%;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    width: 100%;
    text-align: center;
  }
`;

export const Label = styled.label`
  font-size: 1.5em;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.03);
  padding: 0 10px;
  transition: all, 200ms ease-in-out;
  box-sizing: border-box;
  border-bottom: 1.4px solid rgba(200, 200, 200, 0.4);

  &::placeholder {
    color: rgba(170, 170, 170, 1);
  }

  &:focus {
    outline: none;
    border-bottom: ${({ theme }: { theme: Theme }) => `2px solid ${theme.linkHoverColor}`};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 168px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.03);
  padding: 10px 10px;
  transition: all, 200ms ease-in-out;
  box-sizing: border-box;
  border-bottom: 1.4px solid rgba(200, 200, 200, 0.4);
  resize: none;

  &::placeholder {
    color: rgba(170, 170, 170, 1);
  }

  &:focus {
    outline: none;
    border-bottom: ${({ theme }: { theme: Theme }) => `2px solid ${theme.linkHoverColor}`};
  }
`;

export const ErrorMessage = styled.div`
  font-weight: bold;
  color: ${Constants.THEME_RED_COLORS[0]};
  margin-top: 5px;
  min-height: 20px;
`;

const ContactFormContentContainer = styled(ContentContainer)`
  min-height: 500px;
`;

interface ContactErrors {
  lastName?: string;
  firstName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = (): React.ReactElement => {
  const validate = (values: {
    firstName?: string;
    lastName?: string;
    email?: string;
    subject?: string;
    message?: string;
  }): ContactErrors => {
    const errors: ContactErrors = {};
    if (values.lastName == null || values.lastName === '') {
      errors.lastName = 'Champ requis';
    }
    if (values.firstName == null || values.firstName === '') {
      errors.firstName = 'Champ requis';
    }
    if (values.email == null || values.email === '') {
      errors.email = 'Champ requis';
    }
    if (values.subject == null || values.subject === '') {
      errors.subject = 'Champ requis';
    }
    if (values.message == null || values.message === '') {
      errors.message = 'Champ requis';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      lastName: '',
      firstName: '',
      email: '',
      subject: '',
      message: ''
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
          );
          setSubmitting(false);
        },
        () => {
          setSubmitting(false);
        }
      );
    }
  });

  return (
    <>
      <Helmet>
        <title>Escape Game - Contact - ShoesNotIncluded</title>
        <meta
          name="description"
          content="Contactez l'équipe de ShoesNotIncluded pour demander un devis pour une activité de team building ou pour toute question sur nos escape games en extérieur."
        />
      </Helmet>
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Nous contacter</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContactFormContentContainer>
            <div className="fs-3 text-center mb-5">
              Une question sur l&apos;application ou l&apos;un des scénarios ? Merci de remplir le
              formulaire ci-dessous :
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <InputContainer>
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" type="text" {...formik.getFieldProps('lastName')} />
                <ErrorMessage>
                  {formik.touched.lastName === true && formik.errors.lastName != null
                    ? formik.errors.lastName
                    : ''}
                </ErrorMessage>
              </InputContainer>

              <InputContainer>
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" type="text" {...formik.getFieldProps('firstName')} />
                <ErrorMessage>
                  {formik.touched.firstName === true && formik.errors.firstName != null
                    ? formik.errors.firstName
                    : ''}
                </ErrorMessage>
              </InputContainer>

              <InputContainer>
                <Label htmlFor="email">Adresse mail</Label>
                <Input id="email" type="email" {...formik.getFieldProps('email')} />
                <ErrorMessage>
                  {formik.touched.email === true && formik.errors.email != null
                    ? formik.errors.email
                    : ''}
                </ErrorMessage>
              </InputContainer>

              <InputContainer>
                <Label htmlFor="subject">Objet</Label>
                <Input id="subject" type="text" {...formik.getFieldProps('subject')} />
                <ErrorMessage>
                  {formik.touched.subject === true && formik.errors.subject != null
                    ? formik.errors.subject
                    : ''}
                </ErrorMessage>
              </InputContainer>

              <InputContainer>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" {...formik.getFieldProps('message')} />
                <ErrorMessage>
                  {formik.touched.message === true && formik.errors.message != null
                    ? formik.errors.message
                    : ''}
                </ErrorMessage>
              </InputContainer>

              <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
              </Button>
            </Form>
          </ContactFormContentContainer>
        </InnerPageContainer>
      </PageContainer>
    </>
  );
};

export default Contact;
