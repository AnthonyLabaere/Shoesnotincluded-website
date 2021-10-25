import React from 'react'
// import { Formik } from 'formik';
import styled from 'styled-components'

// import { Button } from "../../components/button"
import { ContentContainer } from '../../components/common'
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer'
import Crowdfunding from '../../components/crowdfunding'

// export const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// export const Input = styled.input`
//     width: 100%;
//     height: 42px;
//     outline: none;
//     border: 1px solid rgba(200, 200, 200, 0.03);
//     padding: 0 10px;
//     transition: all, 200ms ease-in-out;
//     box-sizing: border-box;
//     border-bottom: 1.4px solid rgba(200, 200, 200, 0.4);

//     &::placeholder {
//         color: rgba(170, 170, 170, 1);
//     }

//     &:focus {
//         outline: none;
//         border-bottom: ${({ theme }) => ("2px solid " + theme.linkHoverColor)};
//     }
// `;

// export const Textarea = styled.textarea`
//     width: 100%;
//     height: 168px;
//     outline: none;
//     border: 1px solid rgba(200, 200, 200, 0.03);
//     padding: 10px 10px;
//     transition: all, 200ms ease-in-out;
//     box-sizing: border-box;
//     border-bottom: 1.4px solid rgba(200, 200, 200, 0.4);
//     resize: none;

//     &::placeholder {
//         color: rgba(170, 170, 170, 1);
//     }

//     &:focus {
//         outline: none;
//         border-bottom: ${({ theme }) => ("2px solid " + theme.linkHoverColor)};
//     }
// `;

// export const SubmitButtonContainer = styled.div`
//     width: 100%;
//     margin: 1rem;
//     display: flex;
//     justify-content: center;
// `

// export const Text = styled.p<{ color: string }>`
//   font-family: 'Raleway', sans-serif;
//   color: ${props => props.color || '#4d4d4d'};
// `;

const ContactFormContentContainer = styled(ContentContainer)`
  min-height: 500px;
`

const Contact = () => {
  return (
    <PageContainer>
      <Crowdfunding />
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Contact</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContactFormContentContainer>
          <h2 style={{ textAlign: 'center' }}>Une question sur l&apos;application ou l&apos;un des jeux ? Merci de nous contacter via l&apos;adresse mail suivante :</h2>
          <h2 style={{ textAlign: 'center' }}>contact@shoesnotincluded.fr</h2>
          {/* <h2 style={{ textAlign: 'center' }}>Une question sur l'application ou l'un des jeux ? Merci de remplir le formulaire ci-dessous :</h2> */}
          {/* <Formik
                        initialValues={{ name: '', email: '', message: '' }}
                        validate={values => {
                            const errors: { email?: string } = {};
                            if (!values.email) {
                                errors.email = 'Obligatoire';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Nom*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    required
                                />

                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Adresse mail*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    required
                                />

                                <Textarea
                                    name="message"
                                    placeholder="Message*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.message}
                                    required
                                />
                                <SubmitButtonContainer>
                                    <Button type="submit" disabled={isSubmitting} style={{ fontSize: '1.8em' }}>
                                        Envoyer
                                    </Button>
                                </SubmitButtonContainer>
                            </form>
                        )}
                    </Formik> */}
        </ContactFormContentContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default Contact
