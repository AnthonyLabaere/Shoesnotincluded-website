import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

import { SOCIAL_NETWORKS_URLS } from '../../constants'
import Brand from './brand'
import styles from './footer.module.scss'
import Marginer from './marginer'

const GREY_COLOR = '#353535'
const GREY_HOVER_COLOR = '#666666'

interface BottomStyledLinkProps
  extends Omit<React.ComponentProps<typeof Link>, 'className'> {
  className?: string
  children?: React.ReactNode
}

function BottomStyledLink({
  className,
  children,
  ...rest
}: BottomStyledLinkProps): React.ReactElement {
  const composedClassName =
    className !== undefined && className !== ''
      ? `${styles.bottomStyledLink} ${className}`
      : styles.bottomStyledLink
  return (
    <Link {...rest} className={composedClassName}>
      {children}
    </Link>
  )
}

function CGUStyledLink(
  props: Omit<BottomStyledLinkProps, 'className' | 'children'>
): React.ReactElement {
  return <BottomStyledLink {...props} className={styles.cguStyledLink} />
}

function PrivacyPolicyStyledLink(
  props: Omit<BottomStyledLinkProps, 'className' | 'children'>
): React.ReactElement {
  return (
    <BottomStyledLink {...props} className={styles.privacyPolicyStyledLink} />
  )
}

const Footer = (): React.ReactElement => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.topContainer}>
        <div className={styles.topContentContainer}>
          <div className={styles.contentContainer}>
            <span className={styles.topSubContainer}>
              <h2 className={styles.title}>À propos</h2>
              <p>
                ShoesNotIncluded est une application mobile multijoueur
                reprenant les codes de l&apos;escape game mais en plein air. Les
                jeux vous proposent de vous déplacer dans des quartiers, de
                fouiller l&apos;environnement à la recherche d&apos;indices et
                d&apos;y résoudre des énigmes. L&apos;application permet de
                jouer seul mais aussi à plusieurs.
              </p>
            </span>
            <span className={styles.topSubContainer}>
              <h2 className={styles.title}>Où jouer ?</h2>
              <p>
                Plusieurs scénarios sont disponibles à Nantes et d&apos;autres
                sont en cours de création. N&apos;hésitez pas à nous suivre sur
                les réseaux sociaux pour ne pas rater les évènements à venir.
              </p>
            </span>
          </div>
          <div className={styles.contentContainer}>
            <span className={styles.topSubContainer}>
              <h2 className={styles.title}>
                Suivez-nous sur les réseaux sociaux :
              </h2>
              <div className={styles.socialIconContainer}>
                <a href={SOCIAL_NETWORKS_URLS.facebook} title="Facebook">
                  <div className={styles.socialIcon}>
                    <FontAwesomeIcon icon={faFacebook} fontSize={45} />
                  </div>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href={SOCIAL_NETWORKS_URLS.linkedin} title="Linkedin">
                  <div className={styles.socialIcon}>
                    <FontAwesomeIcon icon={faLinkedinIn} fontSize={45} />
                  </div>
                  <span className="sr-only">Linkedin</span>
                </a>
                <a href={SOCIAL_NETWORKS_URLS.instagram} title="Instagram">
                  <div className={styles.socialIcon}>
                    <FontAwesomeIcon icon={faInstagram} fontSize={45} />
                  </div>
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </span>
          </div>
          <Marginer direction="vertical" margin={25} />
          <div className={styles.contentContainer}>
            <span className={styles.topSubContainer}>
              <BottomStyledLink href="/ils-parlent-de-nous" prefetch={false}>
                Ils parlent de nous.
              </BottomStyledLink>
            </span>
          </div>
          <Marginer direction="vertical" margin={25} />
          <div className={styles.contentContainer}>
            <span className={styles.topSubContainer}>
              <BottomStyledLink href="/contact" prefetch={false}>
                Nous contacter
              </BottomStyledLink>
            </span>
          </div>
        </div>
      </div>

      <span className={styles.bottomContainer}>
        <div className={styles.bottomSubContainerColumn}>
          <BottomStyledLink href="/">
            <Brand
              className="fs-6"
              color={GREY_COLOR}
              hoverColor={GREY_HOVER_COLOR}
            />
          </BottomStyledLink>
          <div className={styles.privacyText}> Marque déposée. 2021</div>
        </div>

        <div className={styles.bottomSubContainerRow}>
          <BottomStyledLink href="/mentions-legales" prefetch={false}>
            Mentions légales
          </BottomStyledLink>
          <Marginer direction="horizontal" margin={10} />
          <CGUStyledLink href="/cgu-cgv" prefetch={false} />
          <Marginer direction="horizontal" margin={10} />
          <PrivacyPolicyStyledLink href="/confidentialite" prefetch={false} />
        </div>
      </span>
    </div>
  )
}

export default Footer
