import React from 'react';
import styled from 'styled-components';

import { ContentContainer, StyledLink } from '../../components/common';
import Marginer from '../../components/marginer';
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer
} from '../../components/pageContainer';

const PrivacyPolicyContentContainer = styled(ContentContainer)`
  text-align: justify;

  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`;

const PrivacyPolicy = (): React.ReactElement => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Politique de confidentialité</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <PrivacyPolicyContentContainer>
            <div>
              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Définition des termes utilisés dans la politique de confidentialité
                  </span>
                </h3>
                <div>
                  <p>On désignera par la suite :</p>
                  <ul>
                    <li>
                      <strong>« Donnée personnelle »&nbsp;</strong>: se définit comme «{' '}
                      <em>
                        toute information relative à une personne physique identifiée ou qui peut
                        être identifiée, directement ou indirectement, par référence à un numéro
                        d&apos;identification ou à un ou plusieurs éléments qui lui sont propres
                      </em>{' '}
                      », conformément à la loi Informatique et libertés du 6 janvier 1978.
                    </li>
                    <li>
                      <strong>« Service »</strong> : le service https://www.shoesnotincluded.fr/ et
                      l&apos;ensemble de ses contenus.
                    </li>
                    <li>
                      <strong>« Editeur »</strong> ou <strong>« Nous »</strong> ou{' '}
                      <strong>« ShoesNotIncluded »</strong> : la société ShoesNotIncluded,
                      auto-entreprise au nom de Anthony Labaere responsable de l&apos;édition et du
                      contenu du Service.
                    </li>
                    <li>
                      <strong>« Utilisateur »&nbsp;</strong>ou <strong>« Vous »</strong> :
                      l&apos;internaute visitant et utilisant le Service.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 1 - <span style={{ marginLeft: 10 }}></span>Introduction et rôle de la
                    Politique de confidentialité
                  </span>
                </h3>
                <div>
                  <p>
                    La présente charte vise à vous informer des engagements du Service eu égard au
                    respect de votre vie privée et à la protection des Données personnelles vous
                    concernant, collectées et traitées à l&apos;occasion de votre utilisation du
                    Service.
                  </p>
                  <p>
                    Il est important que vous lisiez la présente politique de confidentialité afin
                    que vous soyez conscient des raisons pour lesquelles nous utilisons vos données
                    et comment nous le faisons.
                  </p>
                  <p>
                    En vous inscrivant sur le Service, vous vous engagez à nous fournir des
                    informations véritables vous concernant. La communication de fausses
                    informations est contraire aux conditions générales figurant sur le Service.
                  </p>
                  <p>
                    Veuillez noter que la présente Politique de confidentialité est susceptible
                    d&apos;être modifiée ou complétée à tout moment, notamment en vue de se
                    conformer à toute évolution législative, réglementaire, jurisprudentielle ou
                    technologique. La date de sa mise à jour sera clairement mentionnée, le cas
                    échéant.
                  </p>
                  <p>
                    Ces modifications vous engagent dès leur mise en ligne et nous vous invitons
                    donc à consulter régulièrement la présente Politique de confidentialité afin de
                    prendre connaissance des éventuelles modifications.
                  </p>
                  <p>
                    Vous trouverez également la description de vos droits à la protection de la vie
                    privée et la façon dont la loi vous protège.
                  </p>
                  <p>
                    Si vous avez des questions concernant la présente politique de confidentialité
                    ou si vous voulez exercer vos droits tels que décrit à l&apos;article 10 de la
                    présente Politique de confidentialité, veuillez nous contacter par e-mail à
                    l&apos;adresse : contact@shoesnotincluded ou par courrier adressé à : 25 rue
                    Jules Piedeleu.
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 2 - <span style={{ marginLeft: 10 }}></span>Données collectées sur le
                    Site
                  </span>
                </h3>
                <div>
                  <p>
                    Les Données collectées et ultérieurement traitées par le Service sont celles que
                    vous nous transmettez volontairement en remplissant les différents formulaires
                    présents au sein du Service. Pour certaines opérations sur les contenus, vous
                    pourrez être amenés à transmettre des Données vous concernant à des tiers
                    partenaires au travers de leurs propres services, plus spécifiquement lors des
                    paiements que vous pourrez effectuer. Nous ne disposerons pas des dites données,
                    leur collecte et leur traitement étant régis par les conditions propres à ces
                    intervenants. Nous vous invitons à consulter leurs conditions avant de
                    communiquer vos Données dans ce cadre.
                  </p>
                  <p>
                    Votre adresse IP (numéro d&apos;identification attribué sur Internet à votre
                    ordinateur) est collectée automatiquement. Vous êtes informés que le Service est
                    susceptible de mettre en œuvre un procédé automatique de traçage (Cookie),
                    auquel vous pouvez faire obstacle en modifiant les paramètres concernés de votre
                    navigateur internet, comme expliqué dans les conditions générales du présent
                    Service.
                  </p>
                  <p>
                    D&apos;une manière générale, il vous est possible de visiter le Service
                    https://www.shoesnotincluded.fr/ sans communiquer aucune information personnelle
                    vous concernant. Dans tous les cas, vous n&apos;avez aucune obligation de
                    transmettre ces informations. Néanmoins, en cas de refus, il se peut que vous ne
                    puissiez pas bénéficier de certaines informations ou services.
                  </p>
                  <p>
                    Nous recueillons, utilisons et partageons également des données agrégées telles
                    que des données statistiques ou démographiques quel qu&apos;en soit
                    l&apos;usage. Les données agrégées peuvent provenir de vos informations
                    personnelles mais ne sont pas concernées comme telles par la loi car ces données
                    ne révèlent pas directement votre identité. Par exemple, nous pouvons agréger
                    vos données d&apos;utilisation afin de calculer le pourcentage
                    d&apos;utilisateurs qui accèdent à une fonctionnalité spécifique du Service.
                  </p>
                  <p></p>
                  <p>Nous ne collectons pas de données dites « sensibles ».</p>
                  <p>
                    Les coordonnées des Utilisateurs du Service qui se seront inscrits sur celui-ci
                    seront sauvegardées, dans le respect des dispositions de la loi informatique et
                    liberté du 6 janvier 1978. Conformément à cette dernière, ils disposent
                    d&apos;un droit d&apos;accès, de retrait, de modification ou de rectification
                    des Données qu&apos;ils ont fournies. Pour cela, il leur suffit d&apos;en faire
                    la demande à l&apos;adresse électronique suivante : contact@shoesnotincluded, ou
                    par courrier : 25 rue Jules Piedeleu.
                  </p>
                  <p>
                    La collecte des Données personnelles des Utilisateurs par l&apos;Editeur ne
                    nécessite pas de déclaration auprès de l&apos;autorité française de protection
                    des Données personnelles (la Commission Nationale de l&apos;Informatique et des
                    Libertés – CNIL).
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 3 - <span style={{ marginLeft: 10 }}></span>Identité du responsable du
                    traitement
                  </span>
                </h3>
                <div>
                  <p>
                    Le responsable du traitement est la société Anthony Labaere, ayant son siège
                    social à l&apos;adresse suivante : 25 rue Jules Piedeleu, 44100 Nantes .
                  </p>
                  <p>
                    <br />
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 4 - <span style={{ marginLeft: 10 }}></span>Finalité des Données
                    collectées
                  </span>
                </h3>
                <div>
                  <p>
                    Les Données identifiées comme étant obligatoires sur les formulaires du Service
                    sont nécessaires afin de pouvoir bénéficier des fonctionnalités correspondantes
                    du Service, et plus spécifiquement des opérations sur les contenus proposés au
                    sein de celui-ci.
                  </p>
                  <p>
                    Le Service est susceptible de collecter et traiter les Données de ses
                    Utilisateurs :
                  </p>
                  <ul>
                    <li>
                      Aux fins de vous fournir les informations ou les services auxquels vous avez
                      souscrit, notamment : Escape game mobile en plein air.
                    </li>
                    <li>
                      Aux fins de recueillir des informations nous permettant d&apos;améliorer notre
                      Service, nos produits et fonctionnalités (notamment par l&apos;usage des
                      cookies).
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 5 - <span style={{ marginLeft: 10 }}></span>Destinataires et utilisation
                    des Données collectées
                  </span>
                </h3>
                <div>
                  <p>
                    Les Données collectées par nos soins sont traitées pour les besoins
                    d&apos;exécution des opérations sur les contenus du Service.
                  </p>
                  <p>
                    Vous êtes susceptible de recevoir des courriers électroniques (emails) de notre
                    Service, notamment dans le cadre de newsletters que vous avez acceptées. Vous
                    pouvez demander à ne plus recevoir ces courriers électroniques en nous
                    contactant à l&apos;adresse contact@shoesnotincluded ou sur le lien prévu à cet
                    effet dans chacun des courriers électroniques qui vous seront adressés.
                  </p>
                  <p>
                    Seul ShoesNotIncluded est destinataire de vos Informations personnelles.
                    Celles-ci ne sont jamais transmises à un tiers, nonobstant les sous-traitants
                    auxquels ShoesNotIncluded fait appel. Ni ShoesNotIncluded ni ses sous-traitants
                    ne procèdent à la commercialisation des données personnelles des visiteurs et
                    utilisateurs de son Service.
                  </p>
                  <p>
                    Vos données personnelles peuvent être partagées avec les parties indiquées
                    ci-dessous aux fins définies dans la présente politique de confidentialité.
                  </p>
                  <p>
                    Nous exigeons que tous les tiers garantissent la sécurité de vos données
                    personnelles et les traitent conformément à la loi. Nous ne permettons pas à nos
                    fournisseurs de services tiers d&apos;utiliser vos données.
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 6 - <span style={{ marginLeft: 10 }}></span>Fondements légaux régissant
                    le traitement des données
                  </span>
                </h3>
                <div>
                  <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD),
                    ShoesNotIncluded ne traite des données à caractère personnel que dans les
                    situations suivantes :
                  </p>
                  <ul>
                    <li>
                      avec votre <strong>consentement</strong>
                      <span>&nbsp;</span>;
                    </li>
                    <li>
                      lorsqu&apos;il existe une<span>&nbsp;</span>
                      <strong>obligation contractuelle</strong>
                      <span>&nbsp;</span>(un contrat entre ShoesNotIncluded et vous) ;
                    </li>
                    <li>
                      pour répondre à une<span>&nbsp;</span>
                      <strong>
                        obligation légale<span>&nbsp;</span>
                      </strong>
                      (en vertu de la législation UE ou nationale).
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 7 - <span style={{ marginLeft: 10 }}></span>Sécurité des Données
                  </span>
                </h3>
                <div>
                  Vous êtes informés que vos Données pourront être divulguées en application
                  d&apos;une loi, d&apos;un règlement ou en vertu d&apos;une décision d&apos;une
                  autorité réglementaire ou judiciaire compétente ou encore, si cela s&apos;avère
                  nécessaire, aux fins, pour l&apos;Editeur, de préserver ses droits et intérêts.
                  <br />
                  <br />
                  Nous avons mis en place des mesures de sécurité appropriées afin d&apos;empêcher
                  que vos données personnelles ne soient accidentellement perdues, utilisées,
                  modifiées, dévoilées ou consultées sans autorisation. De plus, l&apos;accès à vos
                  données personnelles est soumis à une procédure de sécurité définie et documentée.
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 8 - <span style={{ marginLeft: 10 }}></span>Durée de conservation des
                    Données
                  </span>
                </h3>
                <div>
                  <p>
                    <span>
                      Les Données sont stockées chez l&apos;hébergeur du Service, dont les
                      coordonnées figurent dans les mentions légales du Service, et sont conservées
                      pour la durée strictement nécessaire à la réalisation des finalités visées
                      ci-avant{' '}
                      <span>
                        et ne saurait excéder <span></span>
                        <span>36</span>
                        <span></span> mois
                      </span>
                      . Au-delà de cette durée, elles seront conservées à des fins exclusivement
                      statistiques et ne donneront lieu à aucune exploitation, de quelque nature que
                      ce soit.
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 9 - <span style={{ marginLeft: 10 }}></span>Prestataires habilités et
                    transfert vers un pays tiers de l&apos;Union Européenne
                  </span>
                </h3>
                <div>
                  <p>
                    ShoesNotIncluded vous informe qu&apos;il a recours à des prestataires habilités
                    pour faciliter le recueil et le traitement des données que vous nous avez
                    communiquées. Ces prestataires peuvent être situés en dehors de l&apos;Union
                    Européenne et ont communication des données recueillies par le biais des divers
                    formulaires présents sur le Service.
                  </p>
                  <p>
                    ShoesNotIncluded s&apos;est préalablement assuré de la mise en œuvre par ses
                    prestataires de garanties adéquates et du respect de conditions strictes en
                    matière de confidentialité, d&apos;usage et de protection des données. Tout
                    particulièrement, la vigilance s&apos;est portée sur l&apos;existence d&apos;un
                    fondement légal pour effectuer un quelconque transfert de données vers un pays
                    tiers. A ce titre, certains de nos prestataires sont soumis à des règles
                    internes d&apos;entreprise (ou « Binding Corporate Rules ») qui ont été
                    approuvées par la CNIL en 2016 quand les autres obéissent non seulement à des
                    Clauses Contractuelles Types mais également au Privacy Shield.
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 10 - <span style={{ marginLeft: 10 }}></span>Droits informatiques et
                    libertés
                  </span>
                </h3>
                <div>
                  <p>
                    Conformément à la législation sur la protection des données personnelles, vous
                    avez les droits détaillés ci-après que vous pouvez exercer, comme indiqué à
                    l&apos;Article 1 de la Présente Politique de confidentialité en nous écrivant à
                    l&apos;adresse postale mentionnée en tête (25 rue Jules Piedeleu) ou en envoyant
                    un courriel à contact@shoesnotincluded :
                  </p>
                  <ul>
                    <li>
                      Le droit d&apos;information : nous avons l&apos;obligation de vous informer de
                      la manière dont nous utilisons vos données personnelles (tel que décrit dans
                      la présente politique de confidentialité).
                    </li>
                    <li>
                      Le droit d&apos;accès : c&apos;est votre droit d&apos;effectuer une demande
                      d&apos;accès aux données vous concernant afin de recevoir une copie des
                      données à caractère personnel que nous détenons ; Toutefois, en raison de
                      l&apos;obligation de sécurité et de confidentialité dans le traitement des
                      données à caractère personnel qui incombe à ShoesNotIncluded, vous êtes
                      informé que votre demande sera traitée sous réserve que vous rapportiez la
                      preuve de votre identité, notamment par la production d&apos;un scan ou
                      d&apos;une photocopie de votre titre d&apos;identité valide.
                    </li>
                    <li>
                      Le droit de rectification : le droit de nous demander de rectifier des données
                      personnelles vous concernant qui seraient incomplètes ou inexactes. Au titre
                      de ce droit, la législation vous autorise à demander la rectification, la mise
                      à jour, le verrouillage ou encore l&apos;effacement des données vous
                      concernant qui peuvent être inexactes, erronées, incomplètes ou obsolètes.
                    </li>
                    <li>
                      Le droit à l&apos;effacement, aussi connu sous le nom de « droit à
                      l&apos;oubli » : dans certains cas, vous pouvez nous demander de supprimer les
                      données personnelles que nous avons vous concernant (mis à part s&apos;il
                      existe une raison juridique impérieuse qui nous oblige à les conserver).
                    </li>
                    <li>
                      Le droit à la limitation du traitement : vous avez le droit dans certains cas
                      de nous demander de suspendre le traitement des données personnelles,
                    </li>
                    <li>
                      Le droit à la portabilité des données : vous avez le droit de nous demander
                      une copie de vos données personnelles dans un format courant (par exemple un
                      fichier .csv).
                    </li>
                    <li>
                      Le droit d&apos;opposition : vous avez le droit de vous opposer au traitement
                      de vos données personnelles (par exemple, en nous interdisant de traiter vos
                      données à des fins de marketing direct).
                    </li>
                  </ul>
                  <p>
                    Cependant, l&apos;exercice de ce droit n&apos;est possible que dans l&apos;une
                    des deux situations suivantes : lorsque l&apos;exercice de ce droit est fondé
                    sur des motifs légitimes ou lorsque l&apos;exercice de ce droit vise à faire
                    obstacle à ce que les données recueillies soient utilisées à des fins de
                    prospection commerciale.
                  </p>
                  <p>
                    Contactez-nous si vous souhaitez exercer l&apos;un des droits décrits ci-dessus
                    en nous écrivant à 25 rue Jules Piedeleu ou par courriel à
                    contact@shoesnotincluded
                  </p>
                  <p>
                    Vous n&apos;aurez pas de frais à payer pour l&apos;accès à vos données
                    personnelles (ni pour l&apos;exercice de tout autre droit). Cependant, nous
                    pourrons vous facturer des frais raisonnables si votre demande est manifestement
                    infondée, répétitive ou excessive. Dans ce cas, nous pouvons aussi refuser de
                    répondre à votre demande.
                  </p>
                  <p>
                    ShoesNotIncluded sera en droit, le cas échéant, de s&apos;opposer aux demandes
                    manifestement abusives de par leur caractère systématique, répétitif, ou leur
                    nombre.
                  </p>
                  <p>
                    Nous pouvons vous demander des informations spécifiques afin de confirmer votre
                    identité et d&apos;assurer votre droit d&apos;accès à vos données personnelles
                    (ou pour exercer tout autre droit). Il s&apos;agit d&apos;une mesure de sécurité
                    pour garantir que ces données personnelles ne soient pas délivrées à une
                    personne non autorisée à les recevoir. Nous pouvons aussi vous contacter pour
                    obtenir plus d&apos;informations concernant votre demande, afin de vous donner
                    une réponse plus rapide.
                  </p>
                  <p>
                    Nous essayons de répondre à toutes les demandes légitimes dans un délai
                    d&apos;un mois. Ce délai d&apos;un mois peut être dépassé dans le cas où votre
                    demande est particulièrement complexe ou si vous en avez fait plusieurs. Dans ce
                    cas, nous vous préviendrons et vous tiendrons informé.
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 11 - <span style={{ marginLeft: 10 }}></span>Plainte auprès de
                    l&apos;Autorité de protection des données
                  </span>
                </h3>
                <div>
                  <p>
                    Si vous considérez que ShoesNotIncluded ne respecte pas ses obligations au
                    regard de vos Informations Personnelles, vous pouvez adresser une plainte ou une
                    demande auprès de l&apos;autorité compétente. En France, l&apos;autorité
                    compétente est la CNIL à laquelle vous pouvez adresser une demande par voie
                    électronique à l&apos;adresse suivante :{' '}
                    <a href="https://www.cnil.fr/fr/plaintes/internet">
                      https://www.cnil.fr/fr/plaintes/internet
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 0 }}>
                    Article 12 - <span style={{ marginLeft: 10 }}></span>Politique relative aux
                    cookies
                  </span>
                </h3>
                <div>
                  <p>
                    Lors de votre première utilisation du Service https://www.shoesnotincluded.fr/,
                    vous êtes avertis par un bandeau que des informations relatives à votre
                    navigation sont susceptibles d&apos;être enregistrées dans des fichiers
                    alphanumériques dénommés « cookies ». Notre politique d&apos;utilisation des
                    cookies vous permet de mieux comprendre les dispositions que nous mettons en
                    œuvre en matière de navigation sur notre Service. Elle vous informe notamment
                    sur l&apos;ensemble des cookies présents sur notre Service, leur finalité et
                    vous donne la marche à suivre pour les paramétrer.
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 30 }}>
                    a) <span style={{ marginLeft: 10 }}></span>Informations générales sur les
                    cookies présents sur le site
                  </span>
                </h3>
                <div>
                  <p>
                    ShoesNotIncluded, en tant qu&apos;éditeur du présent Service, pourra procéder à
                    l&apos;implantation de cookies sur le disque dur de votre terminal (ordinateur,
                    tablette, mobile etc.) afin de vous garantir une navigation fluide et optimale
                    sur notre Service.
                  </p>
                  <p>
                    Les « cookies » (ou témoins de connexion) sont des petits fichiers texte de
                    taille limitée qui nous permettent de reconnaître votre ordinateur, votre
                    tablette ou votre mobile aux fins de personnaliser les services que nous vous
                    proposons.
                  </p>
                  <p>
                    Les informations recueillies par le biais des cookies ne permettent en aucune
                    manière de vous identifier nominativement. Elles sont utilisées exclusivement
                    pour nos besoins propres afin d&apos;améliorer l&apos;interactivité et la
                    performance de notre Service et de vous adresser des contenus adaptés à vos
                    centres d&apos;intérêts. Aucune de ces informations ne fait l&apos;objet
                    d&apos;une communication auprès de tiers sauf lorsque ShoesNotIncluded a obtenu
                    au préalable votre consentement ou bien lorsque la divulgation de ces
                    informations est requise par la loi, sur ordre d&apos;un tribunal ou toute
                    autorité administrative ou judiciaire habilitée à en connaître.
                  </p>
                  <p>
                    Pour mieux vous éclairer sur les informations que les cookies identifient, vous
                    trouverez un tableau listant les différents types de cookies susceptibles
                    d&apos;être utilisés sur le Service de ShoesNotIncluded, leur nom, leur finalité
                    ainsi que leur durée de conservation à l&apos;adresse{' '}
                    <a href="https://www.shoesnotincluded.fr/cookies">
                      https://www.shoesnotincluded.fr/cookies
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 30 }}>
                    b) <span style={{ marginLeft: 10 }}></span>Configuration de vos préférences sur
                    les cookies
                  </span>
                </h3>
                <div>
                  <p>Vous pouvez accepter ou refuser le dépôt de cookies à tout moment.</p>
                  <p>
                    Lors de votre première utilisation du Service https://www.shoesnotincluded.fr/,
                    une bannière présentant brièvement des informations relatives au dépôt de
                    cookies et de technologies similaires apparaît en bas de votre écran. Cette
                    bannière vous avertit qu&apos;en poursuivant votre navigation sur le Service de
                    ShoesNotIncluded (en chargeant une nouvelle page ou en cliquant sur divers
                    éléments du Service par exemple), vous acceptez le dépôt de cookies sur votre
                    terminal.
                  </p>
                  <p>
                    Selon le type de cookie en cause, le recueil de votre consentement au dépôt et à
                    la lecture de cookies sur votre terminal peut être impératif.
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 30 }}>
                    c) <span style={{ marginLeft: 10 }}></span>Les cookies exemptés de consentement
                  </span>
                </h3>
                <div>
                  <p>
                    Conformément aux recommandations de la Commission Nationale de
                    l&apos;Informatique et des Libertés (CNIL), certains cookies sont dispensés du
                    recueil préalable de votre consentement dans la mesure où ils sont strictement
                    nécessaires au fonctionnement du Service ou ont pour finalité exclusive de
                    permettre ou faciliter la communication par voie électronique. Il s&apos;agit
                    notamment des cookies d&apos;identifiant de session, d&apos;authentification, de
                    session d&apos;équilibrage de charge ainsi que des cookies de personnalisation
                    de votre interface. Ces cookies sont intégralement soumis à la présente
                    politique dans la mesure où ils sont émis et gérés par ShoesNotIncluded.
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 30 }}>
                    d) <span style={{ marginLeft: 10 }}></span>Les cookies nécessitant le recueil
                    préalable de votre consentement
                  </span>
                </h3>
                <div>
                  <p>
                    Cette exigence concerne les cookies émis par des tiers et qui sont qualifiés de
                    « persistants » dans la mesure où ils demeurent dans votre terminal jusqu&apos;à
                    leur effacement ou leur date d&apos;expiration.
                  </p>
                  <p>
                    De tels cookies étant émis par des tiers, leur utilisation et leur dépôt sont
                    soumis à leurs propres politiques de confidentialité dont vous trouverez un lien
                    ci-dessous. Cette famille de cookie regroupe les cookies de mesure
                    d&apos;audience, les cookies publicitaires, auxquels ShoesNotIncluded n&apos;a
                    pas recours, ainsi que les cookies de partage de réseaux sociaux (Facebook,
                    YouTube, Twitter, LinkedIn, etc.). Les cookies de partage des réseaux sociaux
                    sont émis et gérés par l&apos;éditeur du réseau social concerné. Sous réserve de
                    votre consentement, ces cookies vous permettent de partager facilement une
                    partie du contenu publié sur le Service, notamment par l&apos;intermédiaire
                    d&apos;un « bouton » applicatif de partage selon le réseau social concerné.
                  </p>
                  <p>
                    Les cookies de mesure d&apos;audience établissent des statistiques concernant la
                    fréquentation et l&apos;utilisation de divers éléments du Service (comme les
                    contenus / pages que vous avez visité). Ces données participent à
                    l&apos;amélioration de l&apos;ergonomie du Service.{' '}
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 30 }}>
                    e) <span style={{ marginLeft: 10 }}></span>Outils de paramétrage des cookies
                  </span>
                </h3>
                <div>
                  <p>
                    La plupart des navigateurs Internet sont configurés par défaut de façon à ce que
                    le dépôt de cookies soit autorisé. Votre navigateur vous offre
                    l&apos;opportunité de modifier ces paramètres standards de manière à ce que
                    l&apos;ensemble des cookies soit rejeté systématiquement ou bien à ce
                    qu&apos;une partie seulement des cookies soit acceptée ou refusée en fonction de
                    leur émetteur.
                  </p>
                  <p>
                    ATTENTION : Nous attirons votre attention sur le fait que le refus du dépôt de
                    cookies sur votre terminal est néanmoins susceptible d&apos;altérer votre
                    expérience d&apos;utilisateur ainsi que votre accès à certains services ou
                    fonctionnalités du présent Service. Le cas échéant, ShoesNotIncluded décline
                    toute responsabilité concernant les conséquences liées à la dégradation de vos
                    conditions de navigation qui interviennent en raison de votre choix de refuser,
                    supprimer ou bloquer les cookies nécessaires au fonctionnement du Service. Ces
                    conséquences ne sauraient constituer un dommage et vous ne pourrez prétendre à
                    aucune indemnité de ce fait.
                  </p>
                  <p>
                    Votre navigateur vous permet également de supprimer les cookies existants sur
                    votre terminal ou encore de vous signaler lorsque de nouveaux cookies sont
                    susceptibles d&apos;être déposés sur votre terminal. Ces paramétrages n&apos;ont
                    pas d&apos;incidence sur votre navigation mais vous font perdre tout le bénéfice
                    apporté par le cookie.
                  </p>
                  <p>
                    Veuillez ci-dessous prendre connaissance des multiples outils mis à votre
                    disposition afin que vous puissiez paramétrer les cookies déposés sur votre
                    terminal.
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 30 }}>
                    f) <span style={{ marginLeft: 10 }}></span>Paramétrage de votre navigateur
                    internet
                  </span>
                </h3>
                <div>
                  <p>
                    Chaque navigateur Internet propose ses propres paramètres de gestion des
                    cookies. Pour savoir de quelle manière modifier vos préférences en matière de
                    cookies, vous trouverez ci-dessous les liens vers l&apos;aide nécessaire pour
                    accéder au menu de votre navigateur prévu à cet effet.
                  </p>
                  <p>
                    Google Chrome :{' '}
                    <a href="https://support.google.com/chrome/answer/95647?hl=fr">
                      https://support.google.com/chrome/answer/95647?hl=fr
                    </a>
                    <br />
                    Internet Explorer :{' '}
                    <a href="https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies#ie=ie-11">
                      https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies#ie=ie-11
                    </a>
                    <br />
                    Mozilla Firefox :{' '}
                    <a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies">
                      https://support.mozilla.org/fr/kb/activer-desactiver-cookies
                    </a>
                    <br />
                    Opera :{' '}
                    <a href="http://help.opera.com/Windows/10.20/fr/cookies.html">
                      http://help.opera.com/Windows/10.20/fr/cookies.html
                    </a>
                    <br />
                    Safari{' '}
                    <a href="https://support.apple.com/kb/PH21411?viewlocale=fr_FR&amp;locale=fr_FR">
                      https://support.apple.com/kb/PH21411?viewlocale=fr_FR&amp;locale=fr_FR
                    </a>
                    <br />
                    <br />
                    Pour de plus amples informations concernant les outils de maîtrise des cookies,
                    vous pouvez consulter le site internet de la CNIL :{' '}
                    <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser">
                      https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser
                    </a>
                    .
                  </p>
                  <p>
                    Pour toute interrogation ou demande complémentaire d&apos;informations relative
                    à la présente politique des cookies, merci de bien vouloir nous contacter.
                  </p>
                </div>
              </div>

              <div>
                <h3>
                  <span style={{ marginLeft: 30 }}>
                    g) <span style={{ marginLeft: 10 }}></span>Liste des cookies
                  </span>
                </h3>
                <div>
                  <p>
                    La liste détaillée des cookies utilisés sur le Service
                    https://www.shoesnotincluded.fr/ est disponible à l&apos;adresse suivante :
                    <StyledLink to="/cookies">https://www.shoesnotincluded.fr/cookies</StyledLink>.
                  </p>
                </div>
              </div>

              <p style={{ marginTop: 40, textAlign: 'right' }}>
                Tous droits réservés - 12 novembre 2021
              </p>
            </div>
          </PrivacyPolicyContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  );
};

export default PrivacyPolicy;
