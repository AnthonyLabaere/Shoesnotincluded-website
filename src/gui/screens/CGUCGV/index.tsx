import React from 'react';
import styled from 'styled-components';

import { ContentContainer } from '../../components/common';
import Marginer from '../../components/marginer';
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer
} from '../../components/pageContainer';

const CGUCGVContentContainer = styled(ContentContainer)`
  text-align: justify;

  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`;

const CGUCGV = (): React.ReactElement => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Conditions générales d&apos;utilisation et de vente</h1>
            <CGUCGVContentContainer>
              <div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 1 - <span style={{ marginLeft: 10 }}></span>Définitions
                    </span>
                  </h3>
                  <div>
                    On désignera par la suite:
                    <br />
                    <br />
                    - &apos;Application&apos; : l&apos;application ShoesNotIncluded et
                    l&apos;ensemble de ses pages et écrans
                    <br />
                    - &apos;Produit&apos; : contenu numérique ou service qu&apos;il est possible
                    d&apos;acheter ou auquel il est possible de souscrire par un achat intégré
                    (in-app) dans l&apos;application
                    <br />
                    - &apos;Editeur&apos; : La personne, morale ou physique, responsable de
                    l&apos;édition et du contenu de l&apos;application
                    <br />
                    - &apos;Utilisateur&apos; : Le mobinaute visitant et utilisant
                    l&apos;application
                    <br />
                    - &apos;Client&apos; : Le mobinaute effectuant un achat de produit dans
                    l&apos;application
                    <br />- &apos;Store&apos; : La plateforme de téléchargement d&apos;applications
                    en ligne utilisée par l&apos;éditeur pour publier l&apos;application, et
                    utilisée par l&apos;utilisateur pour télécharger l&apos;application
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 2 - <span style={{ marginLeft: 10 }}></span>Mentions imposées par la
                      loi de confiance dans l&apos;économie numérique et objet de l&apos;application
                    </span>
                  </h3>
                  <div>
                    La présente application est éditée par ShoesNotIncluded, auto-entreprise au nom
                    de Anthony Labaere.
                    <br />
                    <br />
                    Les informations légales concernant l&apos;éditeur de l&apos;application,
                    notamment les coordonnées et les éventuelles informations de capital et
                    d&apos;immatriculation, sont fournies dans les mentions légales de
                    l&apos;application.
                    <br />
                    <br />
                    Les informations concernant la collecte et le traitement des données
                    personnelles (politique et déclaration) sont fournies dans la charte de données
                    personnelles de l&apos;application.
                    <br />
                    <br />
                    L&apos;application propose de jouer sur son smartphone, jusqu&apos;à 5 joueurs
                    distincts identifiés via un compte, à des jeux d&apos;escape game en plein air
                    et géolocalisés.
                    <br />
                    <br />
                    L&apos;acquisition d&apos;un produit ou de manière plus générale
                    l&apos;utilisation de l&apos;application suppose l&apos;acceptation, par
                    l&apos;utilisateur, de l&apos;intégralité des présentes conditions générales,
                    qu&apos;il reconnaît du même fait en avoir pris pleinement connaissance. Cette
                    acceptation sera réputée avoir la même valeur qu&apos;une signature manuscrite
                    de la part de l&apos;utilisateur. L&apos;utilisateur reconnaît la valeur de
                    preuve des systèmes d&apos;enregistrement automatique de l&apos;éditeur de
                    l&apos;application et, sauf pour lui d&apos;apporter une preuve contraire, il
                    renonce à les contester en cas de litige.
                    <br />
                    <br />
                    L&apos;acceptation des présentes conditions générales suppose de la part des
                    utilisateurs qu&apos;ils jouissent de la capacité juridique nécessaire pour
                    cela. Si l&apos;utilisateur est mineur ou ne dispose pas de cette capacité
                    juridique, il déclare avoir l&apos;autorisation d&apos;un tuteur, d&apos;un
                    curateur ou de son représentant légal.
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 3 - <span style={{ marginLeft: 10 }}></span>Caractéristiques des
                      produits proposés
                    </span>
                  </h3>
                  <div>
                    <p>
                      Les produits proposés sont ceux qui figurent dans le catalogue publié dans
                      l&apos;application, et chaque produit est accompagné d&apos;un descriptif. Le
                      service clientèle de l&apos;application est accessible par courrier
                      électronique à l&apos;adresse suivante : contact@shoesnotincluded.fr ou par
                      courrier postal à l&apos;adresse suivante : 25 rue Jules Piedeleu, 44100
                      Nantes auquel cas l&apos;éditeur s&apos;engage à apporter une réponse sous 7
                      jours. ShoesNotIncluded met aussi à disposition de ses utilisateurs et clients
                      une hotline, ou assistance téléphonique, pour répondre à leurs questions.
                      L&apos;assistance téléphonique peut être contactée par téléphone au 0768481589
                      (numéro non surtaxé).
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 4 - <span style={{ marginLeft: 10 }}></span>Tarifs
                    </span>
                  </h3>
                  <div>
                    Les prix figurant dans l&apos;application sont des prix entendus en Euros toutes
                    taxes comprises (TTC), tenant compte de la TVA applicable au jour de
                    l&apos;achat.
                    <br />
                    <br />
                    ShoesNotIncluded se réserve le droit de répercuter tout changement du taux de
                    TVA sur le prix des produits ou des services. L&apos;éditeur se réserve
                    également le droit de modifier ses prix à tout moment. Néanmoins, le prix
                    figurant dans l&apos;application le jour de l&apos;achat sera le seul applicable
                    à l&apos;acheteur.
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 5 - <span style={{ marginLeft: 10 }}></span>Compte dans
                      l&apos;application
                    </span>
                  </h3>
                  <div>
                    <p>
                      L&apos;utilisateur créant un compte sur l&apos;application (membre) a la
                      possibilité d&apos;y accéder en se connectant grâce aux identifiants fournis
                      lors de son inscription et en utilisant des systèmes tels que des boutons de
                      connexion tiers de réseaux sociaux. L&apos;utilisateur est entièrement
                      responsable de la protection du mot de passe qu&apos;il a choisi. Il est
                      encouragé à utiliser des mots de passe complexes. En cas d&apos;oubli de mot
                      de passe, le membre a la possibilité d&apos;en générer un nouveau. Ce mot de
                      passe constitue la garantie de la confidentialité des informations contenues
                      dans son compte et l&apos;utilisateur s&apos;interdit donc de le transmettre
                      ou de le communiquer à un tiers. A défaut, l&apos;éditeur de
                      l&apos;application ne pourra être tenu pour responsable des accès non
                      autorisés au compte d&apos;un utilisateur. Le membre peut être invité à
                      fournir un certain nombre d&apos;informations personnelles lors de
                      l&apos;acquisition de produits via l&apos;application ; il s&apos;engage à
                      fournir des informations exactes. Le compte permet au membre client de
                      consulter tous ses achats effectués sur l&apos;application. Si les données
                      contenues dans la rubrique compte membre venaient à disparaître à la suite
                      d&apos;une panne technique ou d&apos;un cas de force majeure, la
                      responsabilité de l&apos;application et de son éditeur ne pourrait être
                      engagée, ces informations n&apos;ayant aucune valeur probante mais uniquement
                      un caractère informatif. Les pages et écrans du compte ne constituent
                      nullement une preuve, elles n&apos;ont qu&apos;un caractère informatif destiné
                      à assurer une gestion efficace des achats ou contributions par le membre.
                      L&apos;éditeur se réserve le droit exclusif de supprimer le compte de tout
                      membre qui aurait contrevenu aux présentes conditions générales (notamment
                      mais sans que cet exemple n&apos;ait un quelconque caractère exhaustif,
                      lorsque le membre aura fourni sciemment des informations erronées, lors de son
                      inscription) ou encore tout compte inactif depuis au moins une année. Ladite
                      suppression ne sera pas susceptible de constituer un dommage pour le membre
                      exclu qui ne pourra prétendre à aucune indemnité de ce fait. Cette exclusion
                      n&apos;est pas exclusive de la possibilité, pour l&apos;éditeur,
                      d&apos;entreprendre des poursuites d&apos;ordre judiciaire à l&apos;encontre
                      du membre, lorsque les faits l&apos;auront justifié.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 6 - <span style={{ marginLeft: 10 }}></span>Exonération de la
                      responsabilité de l&apos;éditeur dans le cadre de l&apos;exécution du présent
                      contrat
                    </span>
                  </h3>
                  <div>
                    <p>
                      En cas d&apos;impossibilité d&apos;accès à l&apos;application, en raison de
                      problèmes techniques ou de toutes natures, l&apos;utilisateur ne pourra se
                      prévaloir d&apos;un dommage et ne pourra prétendre à aucune indemnité.
                      L&apos;indisponibilité, même prolongée et sans aucune durée limitative,
                      d&apos;un ou plusieurs produits, ne peut être constitutive d&apos;un préjudice
                      pour les utilisateurs et ne peut aucunement donner lieu à l&apos;octroi de
                      dommages et intérêts de la part de l&apos;éditeur. Les liens hypertextes
                      présents sur l&apos;application peuvent renvoyer sur d&apos;autres
                      applications ou sur des sites internet et la responsabilité de l&apos;éditeur
                      de l&apos;application ne saurait être engagée si le contenu de ces sites et
                      applications contrevient aux législations en vigueur. De même la
                      responsabilité de l&apos;éditeur ne saurait être engagée si l&apos;utilisation
                      de ces sites ou applications, par l&apos;utilisateur, lui causait un
                      préjudice.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 7 - <span style={{ marginLeft: 10 }}></span>Limitation géographique
                      d&apos;utilisation
                    </span>
                  </h3>
                  <div>
                    <p>
                      L&apos;utilisation de l&apos;application et de ses services est limitée à la
                      France métropolitaine
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 8 - <span style={{ marginLeft: 10 }}></span>Droits de propriété
                      intellectuelle relatifs aux éléments de l&apos;application
                    </span>
                  </h3>
                  <div>
                    Tous les éléments de l&apos;application appartiennent à l&apos;éditeur ou à un
                    tiers mandataire, ou sont utilisés par l&apos;éditeur avec l&apos;autorisation
                    de leur propriétaire. Toute copie des logos, contenus textuels, pictographiques
                    ou vidéos, sans que cette énumération ne soit limitative, est rigoureusement
                    interdite et s&apos;apparente à de la contrefaçon.
                    <br />
                    <br />
                    Tout membre qui se rendrait coupable de contrefaçon serait susceptible de voir
                    son compte supprimé sans préavis ni indemnité et sans que cette suppression ne
                    puisse lui être constitutive d&apos;un dommage, sans réserve d&apos;éventuelles
                    poursuites judiciaires ultérieures à son encontre, à l&apos;initiative de
                    l&apos;éditeur de l&apos;application ou de son mandataire.
                    <br />
                    <br />
                    {/* La présente application utilise des éléments (images, photographies, contenus) dont les crédits reviennent à : . */}
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 9 - <span style={{ marginLeft: 10 }}></span>Contribution des
                      utilisateurs au contenu{' '}
                    </span>
                  </h3>
                  <div>
                    <p>
                      Les utilisateurs se voient offrir la faculté de contribuer aux contenus
                      accessibles par l&apos;application, par la publication de commentaires. Les
                      contributeurs sont informés que l&apos;éditeur, représenté le cas échéant par
                      les modérateurs, peut choisir de publier la contribution en question sur les
                      newsletters de l&apos;application et sur les sites de tous ses partenaires, à
                      charge pour l&apos;éditeur de citer le pseudonyme de l&apos;auteur de la
                      contribution. L&apos;auteur renonce donc à ses droits sur le contenu des
                      contributions, au profit de l&apos;éditeur, pour toute diffusion ou
                      utilisation, même commerciale et ceci, bien évidemment, toujours dans le
                      respect de la paternité de l&apos;auteur.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 10 - <span style={{ marginLeft: 10 }}></span>Marques
                    </span>
                  </h3>
                  <div>
                    <p>
                      Les marques et logos contenus dans l&apos;application sont déposés par
                      ShoesNotIncluded, ou éventuellement par un de ses partenaires. Toute personne
                      procédant à leurs représentations, reproductions, imbrications, diffusions et
                      rediffusions encourt les sanctions prévues aux articles L.713-2 et suivants du
                      Code de la propriété intellectuelle.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 11 - <span style={{ marginLeft: 10 }}></span>Limitation de
                      responsabilité
                    </span>
                  </h3>
                  <div>
                    <p>
                      L&apos;éditeur de l&apos;application, notamment dans le processus de vente en
                      ligne, n&apos;est tenu que par une obligation de moyens ; sa responsabilité ne
                      pourra être engagée pour un dommage résultant de l&apos;application tel que
                      perte de données, intrusion, virus, rupture du service, ou autres.
                      L&apos;éditeur de l&apos;application, ShoesNotIncluded, ne saurait être tenu
                      pour responsable de l&apos;inexécution du contrat conclu, due à la survenance
                      d&apos;un événement de force majeure et notamment en cas de catastrophes
                      causées par inondations ou incendies. Concernant les produits achetés,
                      l&apos;éditeur n&apos;encourra aucune responsabilité pour tous dommages
                      indirects du fait des présentes, perte d&apos;exploitation, perte de profit,
                      dommages ou frais, qui pourraient survenir. Le choix et l&apos;achat d&apos;un
                      produit sont placés sous l&apos;unique responsabilité du client.
                      L&apos;impossibilité totale ou partielle d&apos;utiliser les produits
                      notamment pour cause d&apos;incompatibilité du matériel (version minimum
                      d&apos;Android : 5.0 (Lollipop), version minimum d&apos;IOS : 12.0) ne peut
                      donner lieu à aucun dédommagement, remboursement ou mise en cause de la
                      responsabilité de l&apos;éditeur, sauf dans le cas d&apos;un vice caché avéré,
                      de non-conformité ou de défectuosité. En cas de non mise à disposition
                      d&apos;un achat effectué dans l&apos;application, le client dispose de six
                      mois maximum (à compter de la date d&apos;achat) pour se manifester. Au-delà
                      de ce délai, aucune réclamation ne sera acceptée. L&apos;utilisateur admet
                      expressément utiliser l&apos;application à ses propres risques et sous sa
                      responsabilité exclusive. L&apos;application fournit à l&apos;utilisateur des
                      informations à titre indicatif, avec des imperfections, erreurs, omissions,
                      inexactitudes et autres ambivalences susceptibles d&apos;exister. En tout état
                      de cause, ShoesNotIncluded ne pourra en aucun cas être tenu responsable :
                      <br />
                      - de tout dommage direct ou indirect, notamment en ce qui concerne les pertes
                      de profits, le manque à gagner, les pertes de clientèle, de données pouvant
                      entre autres résulter de l&apos;utilisation de l&apos;application, ou au
                      contraire de l&apos;impossibilité de son utilisation
                      <br />
                      - d&apos;un dysfonctionnement, d&apos;une indisponibilité d&apos;accès,
                      d&apos;une mauvaise utilisation, d&apos;une mauvaise configuration du
                      périphérique de l&apos;utilisateur, ou encore de l&apos;emploi d&apos;un
                      périphérique peu usité ou obsolète par l&apos;utilisateur
                      <br />- du contenu des publicités et autres liens ou sources externes
                      accessibles par l&apos;utilisateur à partir de l&apos;application
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 12 - <span style={{ marginLeft: 10 }}></span>Accès à
                      l&apos;application par connexion Internet
                    </span>
                  </h3>
                  <div>
                    La responsabilité de l&apos;éditeur ne peut être engagée en raison d&apos;une
                    indisponibilité technique de la connexion, qu&apos;elle soit due notamment à un
                    cas de force majeure, à une maintenance, à une mise à jour, à une modification,
                    à une intervention de l&apos;hébergeur, à une grève interne ou externe, à une
                    panne de réseau, à une coupure d&apos;alimentation électrique, ou encore à une
                    mauvaise configuration ou utilisation du périphérique de l&apos;utilisateur.
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 13 - <span style={{ marginLeft: 10 }}></span>Fermeture de compte
                    </span>
                  </h3>
                  <div>
                    <p>
                      Chaque membre est libre de fermer son compte sur l&apos;application. Pour
                      ceci, le membre doit adresser un e-mail à l&apos;éditeur indiquant qu&apos;il
                      souhaite supprimer son compte. Aucune récupération de ses données ne sera
                      alors possible.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 14 - <span style={{ marginLeft: 10 }}></span>Droit applicable et
                      médiation
                    </span>
                  </h3>
                  <div>
                    <p>
                      Les présentes conditions générales sont soumises à l&apos;application du droit
                      Français. Elles peuvent être modifiées à tout moment par l&apos;éditeur ou son
                      mandataire. Les conditions générales applicables à l&apos;utilisateur sont
                      celles en vigueur au jour de son achat ou de sa connexion sur
                      l&apos;application. L&apos;éditeur s&apos;engage bien évidemment à conserver
                      toutes ses anciennes conditions générales et à les faire parvenir à tout
                      utilisateur qui en ferait la demande.
                    </p>
                    <p>
                      Sauf dispositions d&apos;ordre public, tous litiges qui pourraient survenir
                      dans le cadre de l&apos;exécution des présentes conditions générales pourront
                      avant toute action judiciaire être soumis à l&apos;appréciation de
                      l&apos;éditeur en vue d&apos;un règlement amiable. Il est expressément rappelé
                      que les demandes de règlement amiable ne suspendent pas les délais ouverts
                      pour intenter les actions judiciaires. Sauf disposition contraire,
                      d&apos;ordre public, toute action judiciaire relative à l&apos;exécution du
                      présent contrat devra être soumise à la compétence des juridictions du ressort
                      de la Cour d&apos;appel saisie.
                    </p>
                    <h3>
                      <u>Médiation de la consommation</u>
                    </h3>
                    <p>
                      Selon l&apos;article L.612-1 du Code de la consommation, il est rappelé que «{' '}
                      <em>
                        tout consommateur a le droit de recourir gratuitement à un médiateur de la
                        consommation en vue de la résolution amiable du litige qui l&apos;oppose à
                        un professionnel. A cet effet, le professionnel garantit au consommateur le
                        recours effectif à un dispositif de médiation de la consommation
                      </em>{' '}
                      ».
                    </p>
                    <p>
                      A ce titre ShoesNotIncluded propose à ses clients consommateurs, dans le cadre
                      de litiges qui n&apos;auraient pas trouvé résolution de manière amiable, la
                      médiation d&apos;un médiateur de la consommation, dont les coordonnées sont
                      les suivantes :
                    </p>
                    <ul>
                      <li>MEDIATEUR DE LA CONSOMMATION AGREE - DEVIGNY MEDIATION</li>
                      <li>contact@devignymediation.fr</li>
                      <li>https://www.devignymediation.fr/consommateurs.php</li>
                    </ul>
                    <p>
                      Il est rappelé que la médiation n&apos;est pas obligatoire mais uniquement
                      proposée afin de résoudre les litiges en évitant un recours à la justice.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 15 - <span style={{ marginLeft: 10 }}></span>Utilisation de Cookies et
                      de fichiers déposés sur le périphérique
                    </span>
                  </h3>
                  <div>
                    <p>
                      Le mot « Cookie » est ici utilisé au sens large et englobe tout fichier déposé
                      sur le périphérique de l&apos;utilisateur afin de l&apos;identifier ou de
                      sauvegarder des informations de manière durable sur le périphérique. Un «
                      Cookie » permet l&apos;identification de l&apos;utilisateur, la
                      personnalisation de sa consultation et l&apos;accélération de l&apos;affichage
                      de l&apos;application grâce à l&apos;enregistrement d&apos;un fichier de
                      données sur son périphérique. L&apos;application est susceptible
                      d&apos;utiliser des « Cookies » principalement pour 1) permettre à
                      l&apos;application de mémoriser les actions et réglages de l&apos;utilisateur
                      dans l&apos;application, 2) obtenir des statistiques de navigation afin
                      d&apos;améliorer l&apos;expérience de l&apos;Utilisateur, et 3) permettre
                      l&apos;accès à un compte de membre et à du contenu qui n&apos;est pas
                      accessible sans connexion. L&apos;Utilisateur reconnaît être informé de cette
                      pratique et autorise l&apos;éditeur à y recourir. L&apos;Utilisateur peut
                      refuser l&apos;enregistrement de « Cookies » en changeant les réglages de son
                      périphérique ou de l&apos;application, mais l&apos;éditeur ne peut alors
                      garantir que l&apos;application fonctionnera comme attendu, et ne prendra
                      aucune responsabilité en cas de non-fonctionnement de l&apos;application.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 16 - <span style={{ marginLeft: 10 }}></span>Informations relatives au
                      paiement{' '}
                    </span>
                  </h3>
                  <div>
                    <p>
                      L&apos;utilisateur peut passer commande sur la présente application et
                      effectuer son règlement en utilisant la carte bleue dont il aura fourni les
                      informations au Store. Les paiements se font au moyen de transactions
                      sécurisées fournies par le Store. L&apos;application n&apos;a accès à aucune
                      donnée relative aux moyens de paiement de l&apos;utilisateur. Le paiement est
                      effectué directement entre les mains du Store recevant le paiement du client.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 17 - <span style={{ marginLeft: 10 }}></span>Mise à disposition et
                      renonciation au droit de rétractation
                    </span>
                  </h3>
                  <div>
                    <p>
                      L&apos;éditeur s&apos;engage à mettre à disposition les produits immédiatement
                      lors de leur achat. Les produits proposés dans l&apos;application ne
                      permettent pas au client d&apos;exercer son droit de rétractation, en vertu de
                      l&apos;article L.221-28 du Code de la consommation, car il s&apos;agit de
                      services pleinement exécutés avant la fin du délai de rétractation légal ou de
                      contenu numérique non fourni sur un support matériel dont l&apos;exécution a
                      commencé après accord préalable exprès du consommateur, et que
                      l&apos;utilisateur aura renoncé de manière exprès à son droit de rétractation
                      lors de l&apos;achat. Le client reconnaît avoir pris connaissance de la
                      non-application du droit de rétractation pour ses achats, qui sera rappelé
                      lors du processus de vente et nécessitera pour que la renonciation soit valide
                      une renonciation expresse par le client de son droit de rétractation, et
                      renonce de ce fait à son droit de rétractation.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 18 - <span style={{ marginLeft: 10 }}></span>Garantie des produits
                      achetés dans l&apos;application
                    </span>
                  </h3>
                  <div>
                    <p>
                      Tous les produits acquis sur l&apos;application bénéficient des garanties
                      légales suivantes, prévues par le Code Civil ; Garantie de conformité :Selon
                      les articles L.217-4 et suivants du Code de la consommation, le vendeur est
                      tenu de livrer un produit conforme au contrat et de répondre des défauts de
                      conformité existant pendant la délivrance du produit conforme. La garantie de
                      conformité pourra s&apos;exercer si un défaut devait exister le jour de la
                      prise de possession du produit. Garantie des vices cachés : Selon les articles
                      1641 à 1649 du Code civil, le client pourra demander l&apos;exercice de la
                      garantie de vices cachés si les défauts présentés n&apos;apparaissaient pas
                      lors de l&apos;achat et sont suffisamment graves (le défaut doit soit rendre
                      le produit impropre à l&apos;usage auquel il est destiné, soit diminuer cet
                      usage dans une mesure telle que l&apos;acheteur n&apos;aurait pas acheté le
                      produit ou ne l&apos;aurait pas acheté à un tel prix s&apos;il avait connu le
                      défaut). En cas de non-conformité d&apos;un produit vendu, il pourra être
                      remboursé par le vendeur. Toutes les réclamations ou demandes de remboursement
                      doivent s&apos;effectuer par courrier postal à l&apos;adresse suivante : 25
                      rue Jules Piedeleu, 44100 Nantes ou par mail à l&apos;adresse
                      contact@shoesnotincluded.fr.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 19 - <span style={{ marginLeft: 10 }}></span>Archivage
                    </span>
                  </h3>
                  <div>
                    <p>
                      ShoesNotIncluded archivera les bons de commandes et les factures sur un
                      support fiable et durable constituant une copie fidèle. Les registres
                      informatisés seront considérés par les parties comme preuve des
                      communications, commandes, paiements et transactions intervenus entre les
                      parties.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 20 - <span style={{ marginLeft: 10 }}></span>Encadrement des
                      conditions
                    </span>
                  </h3>
                  <div>
                    <p>
                      Si une disposition des Conditions générales est jugée illégale, nulle ou pour
                      toute autre raison inapplicable, alors cette disposition sera réputée
                      divisible des Conditions et n&apos;affectera pas la validité et
                      l&apos;applicabilité des dispositions restantes. Ces présentes conditions
                      décrivent l&apos;ensemble de l&apos;accord entre l&apos;utilisateur et
                      l&apos;éditeur. Elles remplacent tous accords antérieurs ou contemporains
                      écrits ou oraux. Les conditions générales ne sont pas cessibles, transférables
                      ou sous-licenciable par l&apos;utilisateur lui-même. Une version imprimée des
                      Conditions et de tous les avis donnés sous forme électronique pourra être
                      demandée dans des procédures judiciaires ou administratives en rapport avec
                      les conditions générales. Les parties conviennent que toute la correspondance
                      relative à ces conditions générales doit être rédigée dans la langue
                      française.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 21 - <span style={{ marginLeft: 10 }}></span>Notifications
                    </span>
                  </h3>
                  <div>
                    <p>
                      Toute notification ou avis concernant les présentes conditions générales, les
                      mentions légales ou la charte de données personnelles doit être faite par
                      écrit et doit être remis en mains propres, courrier recommandé ou certifié,
                      par Poste ou tout autre service de messagerie reconnu au niveau national qui
                      permet de suivre régulièrement ses forfaits, ou encore par mail aux adresses
                      indiquées dans les mentions légales de l&apos;application, en précisant vos
                      noms, prénoms, coordonnées et objet de l&apos;avis.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 22 - <span style={{ marginLeft: 10 }}></span>Réclamations
                    </span>
                  </h3>
                  <div>
                    <p>
                      Toute réclamation liée à l&apos;utilisation de l&apos;application, des pages
                      de l&apos;application sur des réseaux sociaux éventuels ou les conditions
                      générales, mentions légales ou charte de données personnelles doit être
                      déposée dans les 365 jours suivant le jour d&apos;origine du problème source
                      de réclamation, et ce indépendamment de toute loi ou règle de droit contraire.
                      Dans le cas où une telle réclamation n&apos;aurait pas été déposée dans les
                      365 jours suivants, une telle réclamation sera à jamais inapplicable en
                      justice.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 23 - <span style={{ marginLeft: 10 }}></span>Inexactitudes
                    </span>
                  </h3>
                  <div>
                    <p>
                      Il peut être possible que se trouvent, dans l&apos;ensemble de
                      l&apos;application et des produits proposés, et dans une mesure restreinte,
                      des inexactitudes ou des erreurs, ou des informations qui soient en désaccord
                      avec les conditions générales, les mentions légales ou la charte de données
                      personnelles. En outre, il est possible que des modifications non autorisées
                      soient faites par des tiers sur l&apos;application ou sur des services annexes
                      (réseaux sociaux…). Nous mettons tout en œuvre pour que les écarts de ce genre
                      soient corrigés. Dans le cas où une telle situation nous échapperait, merci de
                      nous contacter par courrier postal ou par mail aux adresses indiquées dans les
                      mentions légales de l&apos;application avec, si possible, une description de
                      l&apos;erreur et l&apos;emplacement (URL), ainsi que des informations
                      suffisantes pour nous permettre de vous contacter. Pour les demandes portant
                      sur le droit d&apos;auteur, merci de vous référer à la section sur la
                      propriété intellectuelle.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 24 - <span style={{ marginLeft: 10 }}></span>Géolocalisation
                    </span>
                  </h3>
                  <div>
                    Conformément à l&apos;article L. 34-1-V du code des postes et des communications
                    électroniques, l&apos;application collectant des données de localisation, elle
                    doit permettre à l&apos;utilisateur de rendre son accord exprès lors de
                    l&apos;installation et de modifier ce choix par la suite.
                    <br />
                    <br />
                    L&apos;utilisation de la fonctionnalité de géolocalisation de l&apos;application
                    nécessite le consentement préalable exprès de l&apos;utilisateur à être
                    géolocalisé. Pour cela l&apos;utilisateur devra activer, s&apos;il le souhaite,
                    la fonction de géolocalisation directement dans les réglages de son terminal
                    mobile et accepter que l&apos;application puisse y avoir recours. Cette
                    fonctionnalité peut, à tout moment, et sans frais, être désactivée ou activée.
                    <br />
                    <br />
                    Grâce à l&apos;acceptation de la fonction de géolocalisation par GPS du
                    périphérique et de l&apos;application, les services suivants sont offerts à
                    l&apos;utilisateur : Géolocaliser le joueur pour permettre de valider la
                    résolution d&apos;une énigme.
                    <br />
                    Le périphérique calcule alors lui-même sa position.
                    <br />
                    <br />
                    La désactivation de géolocalisation par l&apos;application et/ou de la
                    géolocalisation du périphérique bloque les services offerts par
                    l&apos;application qui y sont liés et l&apos;affichage de publicités géociblées.
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 25 - <span style={{ marginLeft: 10 }}></span>Prise en charge des
                      risques
                    </span>
                  </h3>
                  <div>
                    Lorsque vous utilisez l&apos;Application, soyez conscient de ce qui vous
                    entoure, et jouez et communiquez en toute sécurité. Vous acceptez que vous
                    utilisiez l&apos;Application à vos propres risques et que vous n&apos;utilisiez
                    pas l&apos;Application pour enfreindre les lois, règlementations ou instructions
                    applicables décrites dans les présentes Conditions et que vous
                    n&apos;encouragiez ni ne permettiez à quiconque de le faire.
                    <br />
                    <br />
                    À moins que la loi applicable ne l&apos;interdise, vous acceptez qu&apos;en
                    achetant une partie, en y participant ou en y assistant, vous assumez
                    volontairement, sciemment et volontairement tous les risques avant, pendant ou
                    après la partie, en ce compris les blessures causées par toute cause ainsi que
                    les dommages, pertes ou vols matériels. Vous reconnaissez que certaines
                    activités comportent des risques inhérents et imprévus, notamment (a) le contact
                    ou la collision avec des personnes ou des objets, (b) les obstacles (par
                    exemple, l&apos;eau naturelle ou artificielle, les risques routiers et de
                    surface), (c) les risques liés au matériel (par exemple un équipement brisé,
                    défectueux ou inadéquat, une défaillance imprévue de l&apos;équipement), (d) les
                    dangers liés aux conditions météorologiques, (e) les premiers soins et/ou
                    mesures d&apos;urgence inadéquats, (f) les problèmes liés au jugement et/ou au
                    comportement et (g) les dangers naturels (terrain inégal ou difficile, faune et
                    insectes, contact avec les plantes). Vous acceptez de prendre des précautions
                    raisonnables avant de jouer à une partie, par exemple consulter un médecin et
                    vous assurer d&apos;être en bonne santé physique, de porter des vêtements
                    appropriés et d&apos;apporter le matériel nécessaire ou recommandé. De plus,
                    vous comprenez et reconnaissez qu&apos;il est de votre responsabilité
                    d&apos;inspecter les lieux de la partie et qu&apos;en participant à
                    l&apos;Événement, vous reconnaissez que les lieux sont sûrs, adéquats et
                    acceptables pour jouer. Si vous estimez ou apprenez l&apos;existence de
                    conditions dangereuses ou de risques déraisonnables, vous acceptez d&apos;aviser
                    immédiatement l&apos;Editeur.
                    <br />
                    <br />
                    Dans la mesure permise par la loi applicable, vous renoncez par les présentes à
                    toute réclamation, demande, cause d&apos;action, dommage, perte, dépense ou
                    responsabilité pouvant découler de votre participation à une partie, en ce
                    compris pour négligence, risques inhérents et imprévus, blessures ou dommages
                    aux personnes ou aux biens et d&apos;action de tiers ou de joueurs ou de
                    spectateurs.
                  </div>
                </div>
                <p style={{ marginTop: 40, textAlign: 'right' }}>
                  Tous droits réservés - 12 novembre 2021
                </p>{' '}
              </div>
            </CGUCGVContentContainer>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <CGUCGVContentContainer></CGUCGVContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  );
};

export default CGUCGV;
