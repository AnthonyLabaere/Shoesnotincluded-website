/* eslint-disable prettier/prettier */
import React from 'react'
import styled from 'styled-components'

import Crowdfunding from '../../components/crowdfunding'
import { ContentContainer } from '../../components/common'
import Marginer from '../../components/marginer'
import { ContentPageContainer, InnerPageContainer, PageContainer } from '../../components/pageContainer'

const PrivacyPolicyContentContainer = styled(ContentContainer)`
  text-align: justify;

  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`

const PrivacyPolicy = () => {
  return (
    <PageContainer>
      <Crowdfunding />
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Politique de confidentialité</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <PrivacyPolicyContentContainer>
            <p style={{ textAlign: 'center' }}>Mis à jour le 27/09/2021</p>

            <h2>1. Définitions</h2>
            <p>
              <strong>SHOESNOTINCLUDED</strong> : la personne physique Anthony Labaere.
              {/* <strong>SHOESNOTINCLUDED</strong> : la société SHOESNOTINCLUDED, auto-entreprise au nom de Anthony Labaere immatriculée au Registre du Commerce et des Sociétés de Nantes sous le numéro de SIRET TODO. */}
            </p>
            <p>
              <b>Site :</b> le site internet <a href="https://www.shoesnotincluded.fr/">https://www.shoesnotincluded.fr/</a>.
            </p>
            <p>
              <b>Application mobile :</b> l'application mobile ShoesNotIncluded disponible sur les stores Android et Apple.
            </p>
            <p>
              <b>Client :</b> tout professionnel ou personne physique capable au sens des articles 1123 et suivants du Code civil, ou personne morale, qui visite le Site et Application mobile objets des présentes conditions générales.
              <br />
              <b>Prestations et Services :</b> le Site et l'Application mobile mettent à disposition des Clients :
            </p>
            <p>
              <b>Contenu :</b> Ensemble des éléments constituants l'information présente sur le Site et l'Application mobile, notamment textes – images – vidéos.
            </p>
            <p>
              <b>Informations clients :</b> Ci après dénommé « Information(s) » qui correspondent à l'ensemble des données personnelles susceptibles d'être détenues par le Site et l'Application mobile pour la gestion de votre compte, de la gestion de la relation client et à des fins d'analyses et de statistiques.
            </p>
            <p>
              <b>Utilisateur :</b> Internaute se connectant, utilisant le Site ou l'Application mobile susnommé.
            </p>
            <p>
              <b>Informations personnelles :</b> « Les informations qui permettent, sous quelque forme que ce soit, directement ou non, l&apos;identification des personnes physiques auxquelles elles s&apos;appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).
            </p>
            <p>Les termes « données à caractère personnel », « personne concernée », « sous traitant » et « données sensibles » ont le sens défini par le Règlement Général sur la Protection des Données (RGPD : n° 2016-679)</p>

            <h2>2. Gestion des données personnelles.</h2>
            <p>Le Client est informé des réglementations concernant la communication marketing, la loi du 21 Juin 2014 pour la confiance dans l'Economie Numérique, la Loi Informatique et Liberté du 06 Août 2004 ainsi que du Règlement Général sur la Protection des Données (RGPD : n° 2016-679).</p>

            <h3>2.1 Responsable de la collecte des données personnelles</h3>
            <p>Pour les Données Personnelles collectées dans le cadre de la création du compte personnel de l'Utilisateur et de sa navigation sur le Site ou l'Application mobile, le responsable du traitement des Données Personnelles est : Anthony Labaere. SHOESNOTINCLUDED est représenté par Anthony Labaere, son représentant légal.</p>
            <p>En tant que responsable du traitement des données qu'il collecte, SHOESNOTINCLUDED s'engage à respecter le cadre des dispositions légales en vigueur. Il lui appartient notamment au Client d'établir les finalités de ses traitements de données, de fournir à ses prospects et clients, à partir de la collecte de leurs consentements, une information complète sur le traitement de leurs données personnelles et de maintenir un registre des traitements conforme à la réalité. Chaque fois que SHOESNOTINCLUDED traite des Données Personnelles, SHOESNOTINCLUDED prend toutes les mesures raisonnables pour s'assurer de l'exactitude et de la pertinence des Données Personnelles au regard des finalités pour lesquelles le Site ou l'Application mobile les traite.</p>

            <h3>2.2 Données personnelles collectées pour les besoins du site et de l'application mobile</h3>
            <p>SHOESNOTINCLUDED traite les données personnelles de l'Utilisateur afin de lui donner accès à son compte. Le traitement opéré par SHOESNOTINCLUDED s'inscrit donc dans le cadre de l'article 6-1) b) du Règlement 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des données (le « RGPD »), en vertu duquel le traitement est licite s'il est nécessaire à l'exécution d'un contrat auquel la personne concernée est partie.</p>
            <p>Les données personnelles recueillies sur l'application résultent du consentement explicite de l'utilisateur à communiquer des informations via les formulaires présents sur l'application. Certaines données signalées comme obligatoires doivent être complétées sans quoi votre inscription ne pourra être prise en compte.</p>
            <p>La création du compte par l'utilisation d'un compte associé (Google, Facebook, Twitter, Apple) transmet à SHOESNOTINCLUDED la liste de données personnelles suivante :</p>
            <ul>
              <li>Nom</li>
              <li>Prénom</li>
              <li>Adresse mail</li>
              <li>Numéro de téléphone</li>
              <li>Photo de profil</li>
            </ul>
            <p>Vos informations personnelles sont conservées pendant une durée qui ne saurait excéder 36 mois sauf si :</p>
            <ul>
              <li>Vous exercez votre droit de suppression des données vous concernant, dans la limite des conditions décrites à l'article 17 du RGPD.</li>
              <li>Une durée de conservation plus longue est autorisée ou imposée en vertu d'une obligation légale ou réglementaire.</li>
              <li>Pendant cette période, nous mettons en place tous les moyens aptes à assurer la confidentialité et la sécurité de vos données personnelles, de manière à empêcher leur endommagement, effacement ou accès par des tiers non autorisés.</li>
            </ul>

            <h3>2.3 Finalité des données collectées</h3>
            <p>SHOESNOTINCLUDED est susceptible de traiter tout ou partie des données :</p>
            <ul>
              <li>pour gérer l'inscription de l'Utilisateur et la gestion de son compte</li>
              <li>pour déterminer la position géographique de l'Utilisateur </li>
              <li>pour associer le pseudonyme de l'Utilisateur ou de son équipe à un tableau des scores</li>
              <li>pour permettre la navigation sur le Site et l'Application mobile et la gestion et la traçabilité des prestations et services commandés par l'utilisateur : données de connexion et d'utilisation du Site et de l'Application mobile, facturation, historique des commandes, etc. </li>
              <li>pour prévenir et lutter contre la fraude informatique (spamming, hacking…) : matériel informatique utilisé pour la navigation, l'adresse IP, le mot de passe (hashé) </li>
              <li>pour améliorer la navigation sur le Site ou l'application Mobile : données de connexion et d'utilisation </li>
              <li>pour mener des enquêtes de satisfaction facultatives sur le Site ou l'Application mobile : adresse email</li>
              <li>pour mener des campagnes de communication (mail) : adresse email</li>
            </ul>
            <p>SHOESNOTINCLUDED ne commercialise pas vos données personnelles qui sont donc uniquement utilisées par nécessité ou à des fins statistiques et d'analyses.</p>

            <h3>2.4 Droit d'accès, de rectification et d'opposition</h3>
            <p>Conformément à la réglementation européenne en vigueur, les Utilisateurs du Site et de l'Application mobile disposent des droits suivants :</p>
            <ul>
              <li>droit d&apos;accès (article 15 RGPD) et de rectification (article 16 RGPD), de mise à jour, de complétude des données des Utilisateurs droit de verrouillage ou d'effacement des données des Utilisateurs à caractère personnel (article 17 du RGPD), lorsqu'elles sont inexactes, incomplètes, équivoques, périmées, ou dont la collecte, l&apos;utilisation, la communication ou la conservation est interdite </li>
              <li>droit de retirer à tout moment un consentement (article 13-2c RGPD) </li>
              <li>droit à la limitation du traitement des données des Utilisateurs (article 18 RGPD) </li>
              <li>droit d'opposition au traitement des données des Utilisateurs (article 21 RGPD) </li>
              <li>droit à la portabilité des données que les Utilisateurs auront fournies, lorsque ces données font l'objet de traitements automatisés fondés sur leur consentement ou sur un contrat (article 20 RGPD) </li>
              <li>droit de définir le sort des données des Utilisateurs après leur mort et de choisir à qui SHOESNOTINCLUDED devra communiquer (ou non) ses données à un tiers qu'il aura préalablement désigné</li>
            </ul>
            <p>Dès que SHOESNOTINCLUDED a connaissance du décès d'un Utilisateur et à défaut d'instructions de sa part, SHOESNOTINCLUDED s'engage à détruire ses données, sauf si leur conservation s'avère nécessaire à des fins probatoires ou pour répondre à une obligation légale.</p>
            <p>Si l'Utilisateur souhaite savoir comment SHOESNOTINCLUDED utilise ses Données Personnelles, demander à les rectifier ou s'oppose à leur traitement, l'Utilisateur peut contacter SHOESNOTINCLUDED par mail à l'adresse suivante : contact@shoesnotincluded.fr</p>
            <p>Dans ce cas, l'Utilisateur doit indiquer les Données Personnelles qu'il souhaiterait que SHOESNOTINCLUDED corrige, mette à jour ou supprime, en s'identifiant précisément avec une copie d'une pièce d'identité (carte d'identité ou passeport). </p>
            <p>Les demandes de suppression de Données Personnelles seront soumises aux obligations qui sont imposées à SHOESNOTINCLUDED par la loi, notamment en matière de conservation ou d'archivage des documents. Enfin, les Utilisateurs du Site ou de l'Application mobile peuvent déposer une réclamation auprès des autorités de contrôle, et notamment de la CNIL (https://www.cnil.fr/fr/plaintes).</p>

            <h3>2.5 Non-communication des données personnelles</h3>
            <p>SHOESNOTINCLUDED s'interdit de traiter, héberger ou transférer les Informations collectées sur ses Clients vers un pays situé en dehors de l'Union européenne ou reconnu comme « non adéquat » par la Commission européenne sans en informer préalablement le client. Pour autant, SHOESNOTINCLUDED reste libre du choix de ses sous-traitants techniques et commerciaux à la condition qu'il présentent les garanties suffisantes au regard des exigences du Règlement Général sur la Protection des Données (RGPD : n° 2016-679).</p>
            <p>SHOESNOTINCLUDED s'engage à prendre toutes les précautions nécessaires afin de préserver la sécurité des Informations et notamment qu'elles ne soient pas communiquées à des personnes non autorisées. Cependant, si un incident impactant l'intégrité ou la confidentialité des Informations du Client est portée à la connaissance de SHOESNOTINCLUDED, celle-ci devra dans les meilleurs délais informer le Client et lui communiquer les mesures de corrections prises. Par ailleurs SHOESNOTINCLUDED ne collecte aucune « données sensibles ».</p>
            <p>Les Données Personnelles de l'Utilisateur peuvent être traitées par des filiales de SHOESNOTINCLUDED et des sous-traitants (prestataires de services), exclusivement afin de réaliser les finalités de la présente politique.</p>
            <p>Dans la limite de leurs attributions respectives et pour les finalités rappelées ci-dessus, les principales personnes susceptibles d'avoir accès aux données des Utilisateurs du Site et de l'Application mobile sont principalement les agents de notre service client.</p>
            <div ng-bind-html="rgpdHTML"></div>

            <h2>3. Notification d'incident</h2>
            <p>Quels que soient les efforts fournis, aucune méthode de transmission sur Internet et aucune méthode de stockage électronique n&apos;est complètement sûre. Nous ne pouvons en conséquence pas garantir une sécurité absolue. Si nous prenions connaissance d&apos;une brèche de la sécurité, nous avertirions les utilisateurs concernés afin qu&apos;ils puissent prendre les mesures appropriées. Nos procédures de notification d'incident tiennent compte de nos obligations légales, qu&apos;elles se situent au niveau national ou européen. Nous nous engageons à informer pleinement nos clients de toutes les questions relevant de la sécurité de leur compte et à leur fournir toutes les informations nécessaires pour les aider à respecter leurs propres obligations réglementaires en matière de reporting.</p>
            <p>Aucune information personnelle de l&apos;utilisateur du Site ou de l'Application mobile n&apos;est publiée à l&apos;insu de l&apos;utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. Seule l&apos;hypothèse du rachat de SHOESNOTINCLUDED et de ses droits permettrait la transmission des dites informations à l&apos;éventuel acquéreur qui serait à son tour tenu de la même obligation de conservation et de modification des données vis à vis de l&apos;utilisateur du Site et de l'Application mobile.</p>

            <h3>3.1 Sécurité</h3>
            <p>Pour assurer la sécurité et la confidentialité des Données Personnelles, le Site et l'Application mobile utilise des réseaux protégés par des dispositifs standards tels que par pare-feu, la pseudonymisation, l'encryption et mot de passe.</p>
            <p>Lors du traitement des Données Personnelles, SHOESNOTINCLUDED prend toutes les mesures raisonnables visant à les protéger contre toute perte, utilisation détournée, accès non autorisé, divulgation, altération ou destruction.</p>

            <h2>4. Liens hypertextes « cookies » et balises « tags » internet</h2>
            <p>Le Site et l'Application mobile n'utilisent pas de « cookies » ou de balises « tags » internet.</p>
            {/* <p>Le Site contient un certain nombre de liens hypertextes vers d'autres sites, mis en place avec l'autorisation de SHOESNOTINCLUDED. Cependant, SHOESNOTINCLUDED n'a pas la possibilité de vérifier le contenu des sites ainsi visités, et n'assumera en conséquence aucune responsabilité de ce fait.</p>
            Sauf si vous décidez de désactiver les cookies, vous acceptez que le Site puisse les utiliser. Vous pouvez à tout moment désactiver ces cookies et ce gratuitement à partir des possibilités de désactivation qui vous sont offertes et rappelées ci-après, sachant que cela peut réduire ou empêcher l'accessibilité à tout ou partie des Services proposés par le site. */}

            {/* <h3>4.1. « COOKIES »</h3>
            <p>Un « cookie » est un petit fichier d'information envoyé sur le navigateur de l'Utilisateur et enregistré au sein du terminal de l'Utilisateur (ex : ordinateur, smartphone), (ci-après « Cookies »). Ce fichier comprend des informations telles que le nom de domaine de l'Utilisateur, le fournisseur d'accès Internet de l'Utilisateur, le système d'exploitation de l'Utilisateur, ainsi que la date et l'heure d'accès. Les Cookies ne risquent en aucun cas d'endommager le terminal de l'Utilisateur.</p>
            <p>SHOESNOTINCLUDED est susceptible de traiter les informations de l'Utilisateur concernant sa visite du Site, telles que les pages consultées, les recherches effectuées. Ces informations permettent à SHOESNOTINCLUDED d'améliorer le contenu du Site, de la navigation de l'Utilisateur.</p>
            <p>Les Cookies facilitant la navigation et/ou la fourniture des services proposés par le Site, l'Utilisateur peut configurer son navigateur pour qu'il lui permette de décider s'il souhaite ou non les accepter de manière à ce que des Cookies soient enregistrés dans le terminal ou, au contraire, qu'ils soient rejetés, soit systématiquement, soit selon leur émetteur. L'Utilisateur peut également configurer son logiciel de navigation de manière à ce que l'acceptation ou le refus des Cookies lui soient proposés ponctuellement, avant qu'un Cookie soit susceptible d'être enregistré dans son terminal. SHOESNOTINCLUDED informe l'Utilisateur que, dans ce cas, il se peut que les fonctionnalités de son logiciel de navigation ne soient pas toutes disponibles.</p>
            <p>Si l'Utilisateur refuse l'enregistrement de Cookies dans son terminal ou son navigateur, ou si l'Utilisateur supprime ceux qui y sont enregistrés, l'Utilisateur est informé que sa navigation et son expérience sur le Site peuvent être limitées. Cela pourrait également être le cas lorsque SHOESNOTINCLUDED ou l'un de ses prestataires ne peut pas reconnaître, à des fins de compatibilité technique, le type de navigateur utilisé par le terminal, les paramètres de langue et d'affichage ou le pays depuis lequel le terminal semble connecté à Internet.</p>
            <p>Le cas échéant, SHOESNOTINCLUDED décline toute responsabilité pour les conséquences liées au fonctionnement dégradé du Site et des services éventuellement proposés par SHOESNOTINCLUDED, résultant (i) du refus de Cookies par l'Utilisateur (ii) de l'impossibilité pour le Site d'enregistrer ou de consulter les Cookies nécessaires à leur fonctionnement du fait du choix de l'Utilisateur. Pour la gestion des Cookies et des choix de l'Utilisateur, la configuration de chaque navigateur est différente. Elle est décrite dans le menu d'aide du navigateur, qui permettra de savoir de quelle manière l'Utilisateur peut modifier ses souhaits en matière de Cookies.</p>
            <p>À tout moment, l'Utilisateur peut faire le choix d'exprimer et de modifier ses souhaits en matière de Cookies. SHOESNOTINCLUDED pourra en outre faire appel aux services de prestataires externes pour l'aider à recueillir et traiter les informations décrites dans cette section.</p>
            <p>Enfin, en cliquant sur les icônes dédiées aux réseaux sociaux Twitter, Facebook, Linkedin et Google Plus figurant sur le Site ou l'Application mobile et si l'Utilisateur a accepté le dépôt de cookies en poursuivant sa navigation sur le Site Internet ou l'Application mobile, Twitter, Facebook, Linkedin et Google Plus peuvent également déposer des cookies sur vos terminaux (ordinateur, tablette, téléphone portable).</p>
            <p>Ces types de cookies ne sont déposés sur vos terminaux qu'à condition que vous y consentiez, en continuant votre navigation sur le Site Internet ou l'Application mobile. À tout moment, l'Utilisateur peut néanmoins revenir sur son consentement à ce que SHOESNOTINCLUDED dépose ce type de cookies.</p> */}

            {/* <h3>4.2. BALISES « TAGS » INTERNET</h3>
            <p>SHOESNOTINCLUDED peut employer occasionnellement des balises Internet (également appelées « tags », ou balises d'action, GIF à un pixel, GIF transparents, GIF invisibles et GIF un à un) et les déployer par l'intermédiaire d'un partenaire spécialiste d'analyses Web susceptible de se trouver (et donc de stocker les informations correspondantes, y compris l'adresse IP de l'Utilisateur) dans un pays étranger.</p>
            <p>Ces balises sont placées à la fois dans les publicités en ligne permettant aux internautes d'accéder au Site, et sur les différentes pages de celui-ci.</p>
            <p>Cette technologie permet à SHOESNOTINCLUDED d'évaluer les réponses des visiteurs face au Site et l'efficacité de ses actions (par exemple, le nombre de fois où une page est ouverte et les informations consultées), ainsi que l'utilisation de ce Site par l'Utilisateur. </p>
            <p>Le prestataire externe pourra éventuellement recueillir des informations sur les visiteurs du Site et d'autres sites Internet grâce à ces balises, constituer des rapports sur l'activité du Site à l'attention de SHOESNOTINCLUDED, et fournir d'autres services relatifs à l'utilisation de celui-ci et d'Internet.</p> */}

          </PrivacyPolicyContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default PrivacyPolicy
