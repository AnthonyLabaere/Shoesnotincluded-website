import React from 'react'
import styled from 'styled-components'

import { ContentContainer } from '../../components/common'
import Marginer from '../../components/marginer'
import { ContentPageContainer, InnerPageContainer, PageContainer } from '../../components/pageContainer'

const CGUCGVContentContainer = styled(ContentContainer)`
  text-align: justify;

  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`

const CGUCGV = () => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Conditions générales d'utilisation et de vente</h1>
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
                    - 'Application' : l'application ShoesNotIncluded et l'ensemble de ses pages et écrans
                    <br />
                    - 'Produit' : contenu numérique ou service qu'il est possible d'acheter ou auquel il est possible de souscrire par un achat intégré (in-app) dans l'application
                    <br />
                    - 'Editeur' : La personne, morale ou physique, responsable de l'édition et du contenu de l'application
                    <br />
                    - 'Utilisateur' : Le mobinaute visitant et utilisant l'application
                    <br />
                    - 'Client' : Le mobinaute effectuant un achat de produit dans l'application
                    <br />- 'Store' : La plateforme de téléchargement d'applications en ligne utilisée par l'éditeur pour publier l'application, et utilisée par l'utilisateur pour télécharger l'application
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 2 - <span style={{ marginLeft: 10 }}></span>Mentions imposées par la loi de confiance dans l'économie numérique et objet de l'application
                    </span>
                  </h3>
                  <div>
                    La présente application est éditée par ShoesNotIncluded, auto-entreprise au nom de Anthony Labaere.
                    <br />
                    <br />
                    Les informations légales concernant l'éditeur de l'application, notamment les coordonnées et les éventuelles informations de capital et d'immatriculation, sont fournies dans les mentions légales de l'application.
                    <br />
                    <br />
                    Les informations concernant la collecte et le traitement des données personnelles (politique et déclaration) sont fournies dans la charte de données personnelles de l'application.
                    <br />
                    <br />
                    L'application propose de jouer sur son smartphone, jusqu'à 5 joueurs distincts identifiés via un compte, à des jeux d'escape game en plein air et géolocalisés.
                    <br />
                    <br />
                    L'acquisition d'un produit ou de manière plus générale l'utilisation de l'application suppose l'acceptation, par l'utilisateur, de l'intégralité des présentes conditions générales, qu'il reconnaît du même fait en avoir pris pleinement connaissance. Cette acceptation sera réputée avoir la même valeur qu'une signature manuscrite de la part de l'utilisateur. L'utilisateur reconnaît la valeur de preuve des systèmes d'enregistrement automatique de l'éditeur de l'application et, sauf pour lui d'apporter une preuve contraire, il renonce à les contester en cas de litige.
                    <br />
                    <br />
                    L'acceptation des présentes conditions générales suppose de la part des utilisateurs qu'ils jouissent de la capacité juridique nécessaire pour cela. Si l'utilisateur est mineur ou ne dispose pas de cette capacité juridique, il déclare avoir l'autorisation d'un tuteur, d'un curateur ou de son représentant légal.
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 3 - <span style={{ marginLeft: 10 }}></span>Caractéristiques des produits proposés
                    </span>
                  </h3>
                  <div>
                    <p>Les produits proposés sont ceux qui figurent dans le catalogue publié dans l'application, et chaque produit est accompagné d'un descriptif. Le service clientèle de l'application est accessible par courrier électronique à l'adresse suivante : contact@shoesnotincluded.fr ou par courrier postal à l'adresse suivante : 25 rue Jules Piedeleu, 44100 Nantes auquel cas l'éditeur s'engage à apporter une réponse sous 7 jours. ShoesNotIncluded met aussi à disposition de ses utilisateurs et clients une hotline, ou assistance téléphonique, pour répondre à leurs questions. L'assistance téléphonique peut être contactée par téléphone au 0768481589 (numéro non surtaxé).</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 4 - <span style={{ marginLeft: 10 }}></span>Tarifs
                    </span>
                  </h3>
                  <div>
                    Les prix figurant dans l'application sont des prix entendus en Euros toutes taxes comprises (TTC), tenant compte de la TVA applicable au jour de l'achat.
                    <br />
                    <br />
                    ShoesNotIncluded se réserve le droit de répercuter tout changement du taux de TVA sur le prix des produits ou des services. L'éditeur se réserve également le droit de modifier ses prix à tout moment. Néanmoins, le prix figurant dans l'application le jour de l'achat sera le seul applicable à l'acheteur.
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 5 - <span style={{ marginLeft: 10 }}></span>Compte dans l'application
                    </span>
                  </h3>
                  <div>
                    <p>
                      L'utilisateur créant un compte sur l'application (membre) a la possibilité d'y accéder en se connectant grâce aux identifiants fournis lors de son inscription et en utilisant des systèmes tels que des boutons de connexion tiers de réseaux sociaux. L'utilisateur est entièrement responsable de la protection du mot de passe qu'il a choisi. Il est encouragé à utiliser des mots de passe complexes. En cas d'oubli de mot de passe, le membre a la possibilité d'en générer un nouveau. Ce mot de passe constitue la garantie de la confidentialité des informations contenues dans son compte et l'utilisateur s'interdit donc de le transmettre ou de le communiquer à un tiers. A défaut, l'éditeur de l'application ne pourra être tenu pour responsable des accès non autorisés au compte d'un utilisateur. Le membre peut être invité à fournir un certain nombre d'informations personnelles lors de l'acquisition de produits via l'application ; il s'engage à fournir des informations exactes.
                      Le compte permet au membre client de consulter tous ses achats effectués sur l'application. Si les données contenues dans la rubrique compte membre venaient à disparaître à la suite d'une panne technique ou d'un cas de force majeure, la responsabilité de l'application et de son éditeur ne pourrait être engagée, ces informations n'ayant aucune valeur probante mais uniquement un caractère informatif. Les pages et écrans du compte ne constituent nullement une preuve, elles n'ont qu'un caractère informatif destiné à assurer une gestion efficace des achats ou contributions par le membre. L'éditeur se réserve le droit exclusif de supprimer le compte de tout membre qui aurait contrevenu aux présentes conditions générales (notamment mais sans que cet exemple n'ait un quelconque caractère exhaustif, lorsque le membre aura fourni sciemment des informations erronées, lors de son inscription) ou encore tout compte inactif depuis au moins une année. Ladite suppression ne sera
                      pas susceptible de constituer un dommage pour le membre exclu qui ne pourra prétendre à aucune indemnité de ce fait. Cette exclusion n'est pas exclusive de la possibilité, pour l'éditeur, d'entreprendre des poursuites d'ordre judiciaire à l'encontre du membre, lorsque les faits l'auront justifié.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 6 - <span style={{ marginLeft: 10 }}></span>Exonération de la responsabilité de l'éditeur dans le cadre de l'exécution du présent contrat
                    </span>
                  </h3>
                  <div>
                    <p>En cas d'impossibilité d'accès à l'application, en raison de problèmes techniques ou de toutes natures, l'utilisateur ne pourra se prévaloir d'un dommage et ne pourra prétendre à aucune indemnité. L'indisponibilité, même prolongée et sans aucune durée limitative, d'un ou plusieurs produits, ne peut être constitutive d'un préjudice pour les utilisateurs et ne peut aucunement donner lieu à l'octroi de dommages et intérêts de la part de l'éditeur. Les liens hypertextes présents sur l'application peuvent renvoyer sur d'autres applications ou sur des sites internet et la responsabilité de l'éditeur de l'application ne saurait être engagée si le contenu de ces sites et applications contrevient aux législations en vigueur. De même la responsabilité de l'éditeur ne saurait être engagée si l'utilisation de ces sites ou applications, par l'utilisateur, lui causait un préjudice.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 7 - <span style={{ marginLeft: 10 }}></span>Limitation géographique d'utilisation
                    </span>
                  </h3>
                  <div>
                    <p>L'utilisation de l'application et de ses services est limitée à la France métropolitaine</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 8 - <span style={{ marginLeft: 10 }}></span>Droits de propriété intellectuelle relatifs aux éléments de l'application
                    </span>
                  </h3>
                  <div>
                    Tous les éléments de l'application appartiennent à l'éditeur ou à un tiers mandataire, ou sont utilisés par l'éditeur avec l'autorisation de leur propriétaire. Toute copie des logos, contenus textuels, pictographiques ou vidéos, sans que cette énumération ne soit limitative, est rigoureusement interdite et s'apparente à de la contrefaçon.
                    <br />
                    <br />
                    Tout membre qui se rendrait coupable de contrefaçon serait susceptible de voir son compte supprimé sans préavis ni indemnité et sans que cette suppression ne puisse lui être constitutive d'un dommage, sans réserve d'éventuelles poursuites judiciaires ultérieures à son encontre, à l'initiative de l'éditeur de l'application ou de son mandataire.
                    <br />
                    <br />
                    {/* La présente application utilise des éléments (images, photographies, contenus) dont les crédits reviennent à : . */}
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 9 - <span style={{ marginLeft: 10 }}></span>Contribution des utilisateurs au contenu{' '}
                    </span>
                  </h3>
                  <div>
                    <p>Les utilisateurs se voient offrir la faculté de contribuer aux contenus accessibles par l'application, par la publication de commentaires. Les contributeurs sont informés que l'éditeur, représenté le cas échéant par les modérateurs, peut choisir de publier la contribution en question sur les newsletters de l'application et sur les sites de tous ses partenaires, à charge pour l'éditeur de citer le pseudonyme de l'auteur de la contribution. L'auteur renonce donc à ses droits sur le contenu des contributions, au profit de l'éditeur, pour toute diffusion ou utilisation, même commerciale et ceci, bien évidemment, toujours dans le respect de la paternité de l'auteur.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 10 - <span style={{ marginLeft: 10 }}></span>Marques
                    </span>
                  </h3>
                  <div>
                    <p>Les marques et logos contenus dans l'application sont déposés par ShoesNotIncluded, ou éventuellement par un de ses partenaires. Toute personne procédant à leurs représentations, reproductions, imbrications, diffusions et rediffusions encourt les sanctions prévues aux articles L.713-2 et suivants du Code de la propriété intellectuelle.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 11 - <span style={{ marginLeft: 10 }}></span>Limitation de responsabilité
                    </span>
                  </h3>
                  <div>
                    <p>
                      L'éditeur de l'application, notamment dans le processus de vente en ligne, n'est tenu que par une obligation de moyens ; sa responsabilité ne pourra être engagée pour un dommage résultant de l'application tel que perte de données, intrusion, virus, rupture du service, ou autres. L'éditeur de l'application, ShoesNotIncluded, ne saurait être tenu pour responsable de l'inexécution du contrat conclu, due à la survenance d'un événement de force majeure et notamment en cas de catastrophes causées par inondations ou incendies. Concernant les produits achetés, l'éditeur n'encourra aucune responsabilité pour tous dommages indirects du fait des présentes, perte d'exploitation, perte de profit, dommages ou frais, qui pourraient survenir. Le choix et l'achat d'un produit sont placés sous l'unique responsabilité du client. L'impossibilité totale ou partielle d'utiliser les produits notamment pour cause d'incompatibilité du matériel (version minimum d'Android : 5.0 (Lollipop),
                      version minimum d'IOS : 12.0) ne peut donner lieu à aucun dédommagement, remboursement ou mise en cause de la responsabilité de l'éditeur, sauf dans le cas d'un vice caché avéré, de non-conformité ou de défectuosité. En cas de non mise à disposition d'un achat effectué dans l'application, le client dispose de six mois maximum (à compter de la date d'achat) pour se manifester. Au-delà de ce délai, aucune réclamation ne sera acceptée. L'utilisateur admet expressément utiliser l'application à ses propres risques et sous sa responsabilité exclusive. L'application fournit à l'utilisateur des informations à titre indicatif, avec des imperfections, erreurs, omissions, inexactitudes et autres ambivalences susceptibles d'exister. En tout état de cause, ShoesNotIncluded ne pourra en aucun cas être tenu responsable :<br />
                      - de tout dommage direct ou indirect, notamment en ce qui concerne les pertes de profits, le manque à gagner, les pertes de clientèle, de données pouvant entre autres résulter de l'utilisation de l'application, ou au contraire de l'impossibilité de son utilisation
                      <br />
                      - d'un dysfonctionnement, d'une indisponibilité d'accès, d'une mauvaise utilisation, d'une mauvaise configuration du périphérique de l'utilisateur, ou encore de l'emploi d'un périphérique peu usité ou obsolète par l'utilisateur
                      <br />- du contenu des publicités et autres liens ou sources externes accessibles par l'utilisateur à partir de l'application
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 12 - <span style={{ marginLeft: 10 }}></span>Accès à l'application par connexion Internet
                    </span>
                  </h3>
                  <div>La responsabilité de l'éditeur ne peut être engagée en raison d'une indisponibilité technique de la connexion, qu'elle soit due notamment à un cas de force majeure, à une maintenance, à une mise à jour, à une modification, à une intervention de l'hébergeur, à une grève interne ou externe, à une panne de réseau, à une coupure d'alimentation électrique, ou encore à une mauvaise configuration ou utilisation du périphérique de l'utilisateur.</div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 13 - <span style={{ marginLeft: 10 }}></span>Fermeture de compte
                    </span>
                  </h3>
                  <div>
                    <p>Chaque membre est libre de fermer son compte sur l'application. Pour ceci, le membre doit adresser un e-mail à l'éditeur indiquant qu'il souhaite supprimer son compte. Aucune récupération de ses données ne sera alors possible.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 14 - <span style={{ marginLeft: 10 }}></span>Droit applicable et médiation
                    </span>
                  </h3>
                  <div>
                    <p>Les présentes conditions générales sont soumises à l'application du droit Français. Elles peuvent être modifiées à tout moment par l'éditeur ou son mandataire. Les conditions générales applicables à l'utilisateur sont celles en vigueur au jour de son achat ou de sa connexion sur l'application. L'éditeur s'engage bien évidemment à conserver toutes ses anciennes conditions générales et à les faire parvenir à tout utilisateur qui en ferait la demande.</p>
                    <p>Sauf dispositions d'ordre public, tous litiges qui pourraient survenir dans le cadre de l'exécution des présentes conditions générales pourront avant toute action judiciaire être soumis à l'appréciation de l'éditeur en vue d'un règlement amiable. Il est expressément rappelé que les demandes de règlement amiable ne suspendent pas les délais ouverts pour intenter les actions judiciaires. Sauf disposition contraire, d'ordre public, toute action judiciaire relative à l'exécution du présent contrat devra être soumise à la compétence des juridictions du ressort de la Cour d'appel saisie.</p>
                    <h3>
                      <u>Médiation de la consommation</u>
                    </h3>
                    <p>
                      Selon l'article L.612-1 du Code de la consommation, il est rappelé que « <em>tout consommateur a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable du litige qui l'oppose à un professionnel. A cet effet, le professionnel garantit au consommateur le recours effectif à un dispositif de médiation de la consommation</em> ».
                    </p>
                    <p>A ce titre ShoesNotIncluded propose à ses clients consommateurs, dans le cadre de litiges qui n'auraient pas trouvé résolution de manière amiable, la médiation d'un médiateur de la consommation, dont les coordonnées sont les suivantes :</p>
                    <ul>
                      <li>MEDIATEUR DE LA CONSOMMATION AGREE - DEVIGNY MEDIATION</li>
                      <li>contact@devignymediation.fr</li>
                      <li>https://www.devignymediation.fr/consommateurs.php</li>
                    </ul>
                    <p>Il est rappelé que la médiation n'est pas obligatoire mais uniquement proposée afin de résoudre les litiges en évitant un recours à la justice.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 15 - <span style={{ marginLeft: 10 }}></span>Utilisation de Cookies et de fichiers déposés sur le périphérique
                    </span>
                  </h3>
                  <div>
                    <p>
                      Le mot « Cookie » est ici utilisé au sens large et englobe tout fichier déposé sur le périphérique de l'utilisateur afin de l'identifier ou de sauvegarder des informations de manière durable sur le périphérique. Un « Cookie » permet l'identification de l'utilisateur, la personnalisation de sa consultation et l'accélération de l'affichage de l'application grâce à l'enregistrement d'un fichier de données sur son périphérique. L'application est susceptible d'utiliser des « Cookies » principalement pour 1) permettre à l'application de mémoriser les actions et réglages de l'utilisateur dans l'application, 2) obtenir des statistiques de navigation afin d'améliorer l'expérience de l'Utilisateur, et 3) permettre l'accès à un compte de membre et à du contenu qui n'est pas accessible sans connexion. L'Utilisateur reconnaît être informé de cette pratique et autorise l'éditeur à y recourir. L'Utilisateur peut refuser l'enregistrement de « Cookies » en changeant les réglages
                      de son périphérique ou de l'application, mais l'éditeur ne peut alors garantir que l'application fonctionnera comme attendu, et ne prendra aucune responsabilité en cas de non-fonctionnement de l'application.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 16 - <span style={{ marginLeft: 10 }}></span>Informations relatives au paiement{' '}
                    </span>
                  </h3>
                  <div>
                    <p>L'utilisateur peut passer commande sur la présente application et effectuer son règlement en utilisant la carte bleue dont il aura fourni les informations au Store. Les paiements se font au moyen de transactions sécurisées fournies par le Store. L'application n'a accès à aucune donnée relative aux moyens de paiement de l'utilisateur. Le paiement est effectué directement entre les mains du Store recevant le paiement du client.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 17 - <span style={{ marginLeft: 10 }}></span>Mise à disposition et renonciation au droit de rétractation
                    </span>
                  </h3>
                  <div>
                    <p>L'éditeur s'engage à mettre à disposition les produits immédiatement lors de leur achat. Les produits proposés dans l'application ne permettent pas au client d'exercer son droit de rétractation, en vertu de l'article L.221-28 du Code de la consommation, car il s'agit de services pleinement exécutés avant la fin du délai de rétractation légal ou de contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur, et que l'utilisateur aura renoncé de manière exprès à son droit de rétractation lors de l'achat. Le client reconnaît avoir pris connaissance de la non-application du droit de rétractation pour ses achats, qui sera rappelé lors du processus de vente et nécessitera pour que la renonciation soit valide une renonciation expresse par le client de son droit de rétractation, et renonce de ce fait à son droit de rétractation.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 18 - <span style={{ marginLeft: 10 }}></span>Garantie des produits achetés dans l'application
                    </span>
                  </h3>
                  <div>
                    <p>
                      Tous les produits acquis sur l'application bénéficient des garanties légales suivantes, prévues par le Code Civil ; Garantie de conformité :Selon les articles L.217-4 et suivants du Code de la consommation, le vendeur est tenu de livrer un produit conforme au contrat et de répondre des défauts de conformité existant pendant la délivrance du produit conforme. La garantie de conformité pourra s'exercer si un défaut devait exister le jour de la prise de possession du produit. Garantie des vices cachés : Selon les articles 1641 à 1649 du Code civil, le client pourra demander l'exercice de la garantie de vices cachés si les défauts présentés n'apparaissaient pas lors de l'achat et sont suffisamment graves (le défaut doit soit rendre le produit impropre à l'usage auquel il est destiné, soit diminuer cet usage dans une mesure telle que l'acheteur n'aurait pas acheté le produit ou ne l'aurait pas acheté à un tel prix s'il avait connu le défaut). En cas de non-conformité
                      d'un produit vendu, il pourra être remboursé par le vendeur. Toutes les réclamations ou demandes de remboursement doivent s'effectuer par courrier postal à l'adresse suivante : 25 rue Jules Piedeleu, 44100 Nantes ou par mail à l'adresse contact@shoesnotincluded.fr.
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
                    <p>ShoesNotIncluded archivera les bons de commandes et les factures sur un support fiable et durable constituant une copie fidèle. Les registres informatisés seront considérés par les parties comme preuve des communications, commandes, paiements et transactions intervenus entre les parties.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 20 - <span style={{ marginLeft: 10 }}></span>Encadrement des conditions
                    </span>
                  </h3>
                  <div>
                    <p>Si une disposition des Conditions générales est jugée illégale, nulle ou pour toute autre raison inapplicable, alors cette disposition sera réputée divisible des Conditions et n'affectera pas la validité et l'applicabilité des dispositions restantes. Ces présentes conditions décrivent l'ensemble de l'accord entre l'utilisateur et l'éditeur. Elles remplacent tous accords antérieurs ou contemporains écrits ou oraux. Les conditions générales ne sont pas cessibles, transférables ou sous-licenciable par l'utilisateur lui-même. Une version imprimée des Conditions et de tous les avis donnés sous forme électronique pourra être demandée dans des procédures judiciaires ou administratives en rapport avec les conditions générales. Les parties conviennent que toute la correspondance relative à ces conditions générales doit être rédigée dans la langue française.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 21 - <span style={{ marginLeft: 10 }}></span>Notifications
                    </span>
                  </h3>
                  <div>
                    <p>Toute notification ou avis concernant les présentes conditions générales, les mentions légales ou la charte de données personnelles doit être faite par écrit et doit être remis en mains propres, courrier recommandé ou certifié, par Poste ou tout autre service de messagerie reconnu au niveau national qui permet de suivre régulièrement ses forfaits, ou encore par mail aux adresses indiquées dans les mentions légales de l'application, en précisant vos noms, prénoms, coordonnées et objet de l'avis.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 22 - <span style={{ marginLeft: 10 }}></span>Réclamations
                    </span>
                  </h3>
                  <div>
                    <p>Toute réclamation liée à l'utilisation de l'application, des pages de l'application sur des réseaux sociaux éventuels ou les conditions générales, mentions légales ou charte de données personnelles doit être déposée dans les 365 jours suivant le jour d'origine du problème source de réclamation, et ce indépendamment de toute loi ou règle de droit contraire. Dans le cas où une telle réclamation n'aurait pas été déposée dans les 365 jours suivants, une telle réclamation sera à jamais inapplicable en justice.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 23 - <span style={{ marginLeft: 10 }}></span>Inexactitudes
                    </span>
                  </h3>
                  <div>
                    <p>Il peut être possible que se trouvent, dans l'ensemble de l'application et des produits proposés, et dans une mesure restreinte, des inexactitudes ou des erreurs, ou des informations qui soient en désaccord avec les conditions générales, les mentions légales ou la charte de données personnelles. En outre, il est possible que des modifications non autorisées soient faites par des tiers sur l'application ou sur des services annexes (réseaux sociaux…). Nous mettons tout en œuvre pour que les écarts de ce genre soient corrigés. Dans le cas où une telle situation nous échapperait, merci de nous contacter par courrier postal ou par mail aux adresses indiquées dans les mentions légales de l'application avec, si possible, une description de l'erreur et l'emplacement (URL), ainsi que des informations suffisantes pour nous permettre de vous contacter. Pour les demandes portant sur le droit d'auteur, merci de vous référer à la section sur la propriété intellectuelle.</p>
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 24 - <span style={{ marginLeft: 10 }}></span>Géolocalisation
                    </span>
                  </h3>
                  <div>
                    Conformément à l'article L. 34-1-V du code des postes et des communications électroniques, l'application collectant des données de localisation, elle doit permettre à l'utilisateur de rendre son accord exprès lors de l'installation et de modifier ce choix par la suite.
                    <br />
                    <br />
                    L'utilisation de la fonctionnalité de géolocalisation de l'application nécessite le consentement préalable exprès de l'utilisateur à être géolocalisé. Pour cela l'utilisateur devra activer, s'il le souhaite, la fonction de géolocalisation directement dans les réglages de son terminal mobile et accepter que l'application puisse y avoir recours. Cette fonctionnalité peut, à tout moment, et sans frais, être désactivée ou activée.
                    <br />
                    <br />
                    Grâce à l'acceptation de la fonction de géolocalisation par GPS du périphérique et de l'application, les services suivants sont offerts à l'utilisateur : Géolocaliser le joueur pour permettre de valider la résolution d'une énigme.
                    <br />
                    Le périphérique calcule alors lui-même sa position.
                    <br />
                    <br />
                    La désactivation de géolocalisation par l'application et/ou de la géolocalisation du périphérique bloque les services offerts par l'application qui y sont liés et l'affichage de publicités géociblées.
                  </div>
                </div>
                <div>
                  <h3>
                    <span style={{ marginLeft: 0 }}>
                      Article 25 - <span style={{ marginLeft: 10 }}></span>Prise en charge des risques
                    </span>
                  </h3>
                  <div>
                    Lorsque vous utilisez l'Application, soyez conscient de ce qui vous entoure, et jouez et communiquez en toute sécurité. Vous acceptez que vous utilisiez l'Application à vos propres risques et que vous n'utilisiez pas l'Application pour enfreindre les lois, règlementations ou instructions applicables décrites dans les présentes Conditions et que vous n'encouragiez ni ne permettiez à quiconque de le faire.
                    <br />
                    <br />
                    À moins que la loi applicable ne l'interdise, vous acceptez qu'en achetant une partie, en y participant ou en y assistant, vous assumez volontairement, sciemment et volontairement tous les risques avant, pendant ou après la partie, en ce compris les blessures causées par toute cause ainsi que les dommages, pertes ou vols matériels. Vous reconnaissez que certaines activités comportent des risques inhérents et imprévus, notamment (a) le contact ou la collision avec des personnes ou des objets, (b) les obstacles (par exemple, l'eau naturelle ou artificielle, les risques routiers et de surface), (c) les risques liés au matériel (par exemple un équipement brisé, défectueux ou inadéquat, une défaillance imprévue de l'équipement), (d) les dangers liés aux conditions météorologiques, (e) les premiers soins et/ou mesures d'urgence inadéquats, (f) les problèmes liés au jugement et/ou au comportement et (g) les dangers naturels (terrain inégal ou difficile, faune et insectes,
                    contact avec les plantes). Vous acceptez de prendre des précautions raisonnables avant de jouer à une partie, par exemple consulter un médecin et vous assurer d'être en bonne santé physique, de porter des vêtements appropriés et d'apporter le matériel nécessaire ou recommandé. De plus, vous comprenez et reconnaissez qu'il est de votre responsabilité d'inspecter les lieux de la partie et qu'en participant à l'Événement, vous reconnaissez que les lieux sont sûrs, adéquats et acceptables pour jouer. Si vous estimez ou apprenez l'existence de conditions dangereuses ou de risques déraisonnables, vous acceptez d'aviser immédiatement l'Editeur.
                    <br />
                    <br />
                    Dans la mesure permise par la loi applicable, vous renoncez par les présentes à toute réclamation, demande, cause d'action, dommage, perte, dépense ou responsabilité pouvant découler de votre participation à une partie, en ce compris pour négligence, risques inhérents et imprévus, blessures ou dommages aux personnes ou aux biens et d'action de tiers ou de joueurs ou de spectateurs.
                  </div>
                </div>
                <p style={{ marginTop: 40, textAlign: 'right' }}>Tous droits réservés - 12 novembre 2021</p>{' '}
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
  )
}

export default CGUCGV
