import React from 'react'
import styled from 'styled-components'

import Crowdfunding from '../../components/crowdfunding'
import { ContentContainer } from '../../components/common'
import Marginer from '../../components/marginer'
import { ContentPageContainer, InnerPageContainer, PageContainer } from '../../components/pageContainer'

const LegalNoticesTCUContentContainer = styled(ContentContainer)`
  text-align: justify;

  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`

const LegalNoticesAndCGU = () => {
  return (
    <PageContainer>
      <Crowdfunding />
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Mentions Légales & Conditions générales d'utilisation</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <LegalNoticesTCUContentContainer>
            <p style={{ textAlign: 'center' }}>Mis à jour le 27/09/2021</p>

            <h2>Mentions Légales</h2>
            <p>
              Vous êtes actuellement connecté au site internet <a href="https://www.shoesnotincluded.fr/">https://www.shoesnotincluded.fr/</a> (ci-après le « Site ») ou à l'application mobile associée (ci-après l' « Application mobile »).
            </p>

            <h3>1. Éditeur du Site et de l'Application mobile</h3>
            <p>Le Site et l'Application mobile sont édités par Anthony Labaere.</p>
            {/* <p>Le Site et l'Application mobile sont édités par la société SHOESNOTINCLUDED, auto-entreprise au nom de Anthony Labaere immatriculée au Registre du Commerce et des Sociétés de Nantes sous le numéro de SIRET TODO.</p> */}
            <p>Email: contact@shoesnotincluded.fr</p>

            <h3>2. Directeur de publication</h3>
            <p>Le directeur de publication est Anthony Labaere.</p>

            <h3>3. Hébergement et maintenance du Site et de l'Application mobile</h3>
            <p>Le Site et l'Application mobile ont été développés et leurs maintenances sont assurées par la société SHOESNOTINCLUDED.</p>
            <p>Le Site et l'Application mobile sont hébergé par :</p>
            <ul>
              <li>
                la société <strong>Netlify</strong>, dont le siège social est situé au 2325 3rd Street, Suite 215 94107 San Francisco, USA.
              </li>
              <li>
                la société <strong>Firebase</strong>, dont le siège social est situé au 1600 Amphitheatre Parkway, Mountain View, California 94043, USA.
              </li>
            </ul>

            <h2 style={{ marginTop: '2em' }}>Conditions générales d'utilisation</h2>

            <h3>1. Définition</h3>
            <p>Au sein des CGU, les mots ou expressions commençant avec une majuscule auront la signification suivante :</p>
            <p>
              <strong>Contribution(s)</strong> : désigne(nt) l'ensemble des commentaires ou contenus que les Utilisateurs ont la possibilité de publier sur le Site ou l'Application mobile.
            </p>
            <p>
              <strong>SHOESNOTINCLUDED</strong> : la personne physique Anthony Labaere.
              {/* <strong>SHOESNOTINCLUDED</strong> : la société SHOESNOTINCLUDED, auto-entreprise au nom de Anthony Labaere immatriculée au Registre du Commerce et des Sociétés de Nantes sous le numéro de SIRET TODO. */}
            </p>
            <p>
              <strong>Éditeur</strong> : désigne SHOESNOTINCLUDED.
            </p>
            <p>
              <strong>Hébergeurs</strong> : désigne Netlify et Firebase.
            </p>
            <p>
              <strong>Information(s)</strong> : désigne(nt) l'ensemble des informations et publications accessibles sur le Site et l'Application mobile.
            </p>
            <p>
              <strong>Site</strong> : désigne le site proposé par l'Éditeur sur Internet depuis l'adresse <a href="https://www.shoesnotincluded.fr/">https://www.shoesnotincluded.fr/</a>.
            </p>
            <p>
              <strong>Application mobile</strong> : désigne l'application mobile associée proposée par l'Éditeur sur les stores Android et Apple.
            </p>
            <p>
              <strong>Utilisateur(s)</strong> : désigne(nt) toute personne ayant accès au Site et à l'Application mobile quel que soit le lieu où elle se trouve et les modalités de connexion.
            </p>

            <h3>2. Préambules</h3>

            <p>Il est fortement recommandé de lire avec attention l'intégralité des présentes Conditions Générales d'Utilisation avant de consulter le Site ou l'Application mobile.</p>
            <p>
              Les présentes Conditions Générales d'Utilisation (ci-après les <strong>CGU</strong>) ont pour objet de déterminer les conditions d'accès et les règles d'utilisation dans lesquelles le Site et l'application offrent l'accès à plusieurs services en ligne.
            </p>
            <p>L'accès au Site et à l'Application mobile est subordonné au respect des CGU. L'accès au Site et à l'Application mobile est strictement réservé à l'Utilisateur tel que défini dans les CGU.</p>
            <p>SHOESNOTINCLUDED se réserve le droit de modifier ou de mettre à jour à tout moment, unilatéralement, les CGU au gré des changements ou additions effectués, afin notamment de se conformer à toutes évolutions légales, jurisprudentielles, éditoriales et/ou techniques ainsi qu'aux éventuelles modifications des conditions générales d'utilisation des services des Hébergeurs.</p>
            <p>L'Utilisateur doit consulter régulièrement la dernière version des CGU disponible en permanence sur le Site et l'Application mobile.</p>

            <h3>3. Contact</h3>
            <p>Pour toute question relative au fonctionnement du Site ou de l'Application mobile et aux CGU, vous pouvez nous contacter par mail, à l'adresse suivante : contact@shoesnotincluded.fr</p>

            <h3>4. Objets du site et de l'application mobile</h3>
            <p>Le Site a pour objet de mettre à la disposition des Utilisateurs une information et une aide concernant l'ensemble des activités, des produits, des services, et des offres de SHOESNOTINCLUDED.</p>
            <p>L'Application mobile a pour objet de présenter des jeux proposant aux utilisateurs de se déplacer dans des quartiers, de fouiller l'environnement à la recherche d'indices et d'y résoudre des énigmes seul ou à plusieurs.</p>
            <p>Toute utilisation du Site et de l'Application mobile se fera dans le respect des CGU.</p>

            <h3>5. Disponibilité de site et de l'application mobile</h3>
            <p>Le Site et l'Application mobile sont accessibles 24 heures sur 24, 7 jours sur 7, sauf cas de force majeure ou d'événement hors du contrôle de SHOESNOTINCLUDED.</p>
            <p>SHOESNOTINCLUDED n'est tenue à aucune obligation de résultat concernant la disponibilité du Site ou de l'Application mobile et l'accessibilité technique au Site ou de l'Application mobile. SHOESNOTINCLUDED n'est en aucun cas responsable des interruptions et des conséquences qui peuvent en découler pour l'Utilisateur notamment lorsque les interruptions proviennent de celles des Hébergeurs pour ses besoins de maintenance ou autres.</p>
            <p>SHOESNOTINCLUDED se réserve le droit de suspendre, d'interrompre ou de limiter, sans avis préalable, l'accès à tout ou partie du Site ou de l'Application mobile, notamment pour des opérations de maintenance et de mises à jour nécessaires au bon fonctionnement du Site ou de l'Application mobiel et des matériels afférents, ou pour toute autre raison, notamment technique.</p>
            <p>L'Utilisateur est informé que SHOESNOTINCLUDED peut modifier ou mettre fin aux caractéristiques du Site ou de l'Application mobile, à tout moment, sans préavis et sans que l'Utilisateur dispose d'un recours à l'encontre de SHOESNOTINCLUDED.</p>

            <h3>6. Accès et utilisation du site et de l'application mobile</h3>

            <h4>6.1. Accès au site ou à l'application mobile</h4>
            <p>SHOESNOTINCLUDED accorde à l'Utilisateur un droit de consultation, d'utilisation et d'accès aux Informations du Site et de l'Application mobile.</p>
            <p>L'accès au Site est possible à partir d'un ordinateur, d'une tablette ou d'un smartphone connecté à un réseau de télécommunication selon les protocoles de communication utilisés sur le réseau Internet.</p>
            <p>L'accès à l'Application mobile est possible à partir d'une tablette ou d'un smartphone connecté à un réseau de télécommunication selon les protocoles de communication utilisés sur le réseau Internet.</p>

            <h4>6.2. Coût d'accès</h4>
            <p>L'accès au Site et à l'Application mobile est gratuit et ne fait pas l'objet d'un abonnement.</p>
            {/* TODO : lien vers les CGV ci-dessous */}
            <p>L'accès aux jeux disponibles sur l'Application mobile est payant et l'Utilisateur doit se référer aux Conditions Générales de Ventes pour plus d'informations.</p>
            <p>Tous les logiciels et matériels nécessaires à l'utilisation ou au fonctionnement du Site et de l'Application mobile, l'accès à Internet ou les frais de communication sont à la charge exclusive de l'Utilisateur en dehors de son lieu de travail.</p>
            <p>Chaque Utilisateur est entièrement responsable de ses données de connexion le concernant.</p>
            <p>Sauf preuve contraire, toute connexion au Site et à l'Application mobile, ou transmission de données effectuées à partir des informations de connexion de l'Utilisateur, sera réputée avoir été effectuée par ce dernier.</p>

            <h4>6.3. Durée d'accessibilité</h4>
            <p>L'Utilisateur reconnaît, qu'en cas de violation des dispositions législatives et/ou des CGU, SHOESNOTINCLUDED peut bloquer et/ou résilier sans notification préalable et avec effet immédiat l'accès au Site ou à l'Application mobile.</p>
            <p>L'accès de l'Utilisateur au Site et à l'Application mobile est effectué pour une durée illimitée, sans préjudice de la faculté pour l'Utilisateur ou SHOESNOTINCLUDED de résilier unilatéralement, à tout moment, sans préavis, ni motif, ou indemnité.</p>

            <h4>6.4. Utilisation du site et de l'application mobile</h4>

            <p>L'utilisation du Site et de l'Application mobile est réservée à un usage strictement personnel, sauf encarts spécifiés par SHOESNOTINCLUDED.</p>
            <p>L'Utilisateur s'interdit notamment, sans que cette liste soit limitative :</p>
            <ul>
              <li>de « revendre » ou de mettre à disposition d'un tiers et/ou des autres Utilisateurs, à titre onéreux et/ou gratuit, le contenu du Site ou de l'Application mobile</li>
              <li>d'utiliser le Site ou l'Application mobile à des fins de commerce et d'une manière générale de proposer des produits et des services le rémunérant de manière directe ou indirecte</li>
              <li>de diriger les internautes indirectement ou directement, notamment par des liens hypertextes, vers d'autres sites Internet ou applications mobiles qui seraient susceptibles de ne pas respecter la législation française ou les stipulations des CGU</li>
              <li>d'utiliser le Site ou l'Application mobile en vue d'adresser, sous quelque forme que ce soit, de la publicité ou des éléments à caractère promotionnel non sollicités</li>
            </ul>
            <p>Afin de permettre le bon fonctionnement du Site et de l'Application mobile, certaines contraintes techniques doivent être respectées par les Utilisateurs, celles-ci étant susceptibles d'être modifiées.</p>
            <p>L'Utilisateur est tenu de respecter les indications techniques suivantes afin de pouvoir accéder au Site ou à l'Application mobile et d'utiliser les services proposés de manière optimale. Il s'interdit toute action susceptible d'entraver ou de perturber le bon fonctionnement ou l'accessibilité technique du Site et de l'Application mobile.</p>
            <p>La configuration minimale requise pour l'accès au Site est la suivante :</p>
            <ul>
              <li>Écran : 1024 X 768 minimum</li>
              <li>Navigateurs minimum : Microsoft Edge, Safari 14, Mozilla Firefox, Google Chrome</li>
            </ul>
            <p>La configuration minimale requise pour l'accès à l'Application mobile est la suivante :</p>
            <ul>
              <li>Écran : 1024 X 768 minimum</li>
              <li>Version minimum d'Android : 5.0 (Lollipop)</li>
              <li>Version minimum d'IOS : 11.0</li>
            </ul>
            <p>Des espaces d'échanges sont à la disposition des Utilisateurs. Toutefois, SHOESNOTINCLUDED se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données. Le cas échéant, SHOESNOTINCLUDED se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l'Utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie...).</p>
            <p>L'Utilisateur s'engage à accéder au Site ou à l'Application mobile en utilisant un matériel ne contenant pas de virus.</p>
            <p>L'Utilisateur accepte le fait que SHOESNOTINCLUDED ne pourra, en aucun cas, être tenue pour responsable des dommages fortuits, matériels et/ou immatériels, directs ou indirects qui pourraient résulter de l'accès ou de l'utilisation du Site ou de l'Application mobile, y compris l'inaccessibilité, les pertes de données, détériorations, destructions ou virus qui pourraient affecter l'équipement informatique de l'Utilisateur, et/ou de la présence de virus sur son Site ou son Application mobile.</p>
            <p>SHOESNOTINCLUDED ne garantit pas que ses serveurs hébergeant le Site ou l'Application mobile, sont exempts de virus et autres composants dangereux. Il appartient donc à l'Utilisateur de prendre toutes les mesures appropriées pour protéger ses propres données et/ou logiciels de la contamination par d'éventuels virus circulant sur le réseau Internet.</p>
            <p>Par ailleurs, tout matériel téléchargé et/ou obtenu, de quelque manière que ce soit, lors de l'utilisation du Site ou de l'Application mobile, l'est aux risques et périls de l'Utilisateur. SHOESNOTINCLUDED n'est aucunement responsable des dommages et/ou pertes de données subis par son terminal (ordinateur, tablette, téléphone portable).</p>
            <p>Les informations publiées par SHOESNOTINCLUDED et contenues sur le Site et l'Application mobile sont non-contractuelles et fournies à titre informatif, gratuit, et sans aucune obligation de la part de SHOESNOTINCLUDED qui peut les modifier sans préavis.</p>
            <p>SHOESNOTINCLUDED s'efforce de fournir sur le Site et l'Application mobile des informations aussi précises que possible. Toutefois, SHOESNOTINCLUDED ne pourra être tenue pour responsable des inexactitudes, des carences et des omissions dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. L'Utilisateur est vivement conseillé de vérifier toute information diffusée sur le Site et l'Application mobile auprès de sources officielles.</p>

            <h3>7. Hébergement du Site et de l'Application mobile</h3>
            <p>Les Utilisateurs sont expressément informés que les contenus publiés sur le Site et l'Application mobile sont hébergés et stockés sur les serveurs des sociétés Netlify et Firebase, ainsi que sur les stores Android et Apple.</p>

            <h3>8. Propriété intellectuelle</h3>
            <p>SHOESNOTINCLUDED est titulaire de tous les droits de propriété intellectuelle tant sur la forme que sur le contenu du Site et de l'Application mobile (textes, logos, images, éléments sonores, logiciels, icônes, mise en page, base de données…) ou a acquis régulièrement les droits permettant l'exploitation de la structure et du contenu du Site et de l'Application mobile, sans aucune limitation.</p>
            <p>De manière générale, l'Utilisateur s'interdit de porter atteinte aux droits de propriété intellectuelle (droit d'auteur, droits voisins, droit sui generis du producteur de bases de données, droit des marques, noms de domaine…) de SHOESNOTINCLUDED ou des Hébergeurs, ou de tout tiers.</p>
            <p>SHOESNOTINCLUDED concède à l'Utilisateur, le droit d'utiliser le Site et l'Application mobile pour ses besoins strictement privés, à l'exclusion de toute utilisation lucrative. En cas d'utilisation professionnelle, l'Utilisateur devra obtenir l'autorisation expresse, préalable et écrite de SHOESNOTINCLUDED.</p>
            <p>Ainsi, il est interdit à l'Utilisateur notamment de copier, reproduire, représenter, modifier et/ou exploiter, transférer de quelque façon que ce soit et à quelque fin que ce soit, tout ou partie de la structure et du contenu du Site et de l'Application mobile, sauf en cas d'autorisation expresse, préalable et écrite de SHOESNOTINCLUDED.</p>
            <p>Les marques et logos reproduits sur le Site et l'Application mobile sont déposés par les sociétés qui en sont titulaires. Toute reproduction des noms ou logos, par quelque moyen que ce soit, sans autorisation préalable du titulaire concerné est interdite.</p>
            <p>Le non-respect de ces interdictions peut notamment constituer un acte de contrefaçon et/ou de concurrence déloyale et parasitaire engageant la responsabilité civile et/ou pénale de l'Utilisateur.</p>

            <h3>9. Contributions</h3>
            <p>Les Contributions des Utilisateurs sont modérées a posteriori par un modérateur de SHOESNOTINCLUDED en fonction de leur conformité aux lois et règlements français et des exigences rappelées à l'Article 6.4 des CGU et plus largement, pour tout autre motif sérieux.</p>
            <p>SHOESNOTINCLUDED se réserve la possibilité de supprimer toute Contribution qui violerait les CGU ou qui serait susceptible d'engager en tout ou partie la responsabilité de SHOESNOTINCLUDED ou des Hébergeurs.</p>
            <p>L'Utilisateur est responsable de toute Contribution qu'il affiche via le Site ou l'Application mobile ainsi que de leurs conséquences. La Contribution que l'Utilisateur soumet, publie ou affiche pourra être consultée par d'autres Utilisateurs du Site ou Application mobile. L'Utilisateur ne devra fournir que des Contributions qu'il souhaite partager avec d'autres dans le respect des CGU.</p>
            <p>Par ailleurs, les Contributions ne doivent pas :</p>
            <ul>
              <li>porter atteinte aux droits de propriété intellectuelle</li>
              <li>être de nature discriminatoire ou de nature à inciter à la violence ou à la haine, pour des raisons d'origine ethnique, politiques, d'orientation sexuelle etc.</li>
              <li>comporter des contenus obscènes, pornographiques, etc</li>
              <li>porter atteinte à l'intégrité ou la sécurité du Site ou de l'Application mobile et notamment comporter des virus, cheval de Trois, worms, bombe à retardement, cancelbots ou tout autre programme informatique destiné à endommager, à intercepter clandestinement tout système informatique, données ou informations nominatives</li>
              <li>être susceptibles d'engager la responsabilité de SHOESNOTINCLUDED et/ou des Hébergeurs en proposant des liens hypertextes renvoyant vers des sites, applications mobiles ou des contenus illicites, contrefaisants, ou plus largement, vers des contenus susceptibles d'enfreindre les lois ou les règlements en vigueur ou vers des sites avec restriction d'accès sans autorisation des titulaires de droit sur le contenu</li>
            </ul>
            <p>L'Utilisateur déclare être seul et unique titulaire de tout éventuel droit d'auteur sur les Contributions et garantit à SHOESNOTINCLUDED et/ou des Hébergeurs la jouissance libre et entière de toutes servitudes des droits faisant l'objet des CGU, contre tous troubles, revendications et évictions quelconques.</p>
            <p>L'Utilisateur garantit notamment qu'aucun litige ou procès n'est en cours ou sur le point d'être intenté quant aux Contributions mettant en cause les droits d'auteur.</p>

            <h3>10. Liens hypertextes</h3>
            <p>À l'exception de sites diffusant notamment des informations et/ou contenus ayant un caractère illégal, un Utilisateur peut créer un lien hypertexte sur un site vers le Site ou l'Application mobile.</p>
            <p>En cas d'utilisation de ces sites, l'Utilisateur est invité à se reporter aux Conditions Générales d'Utilisation du site concerné. Au titre de la présente autorisation, SHOESNOTINCLUDED se réserve toutefois un droit d'opposition et se dégage de toute responsabilité quant aux informations contenues dans ces sites qui pourraient être liés au sien par un lien hypertexte ou autre moyen.</p>
            <p>À contrario, des liens hypertextes contenus sur le Site ou l'Application mobile peuvent renvoyer vers d'autres sites Internet par tout moyen.</p>
            <p>Dans la mesure où SHOESNOTINCLUDED ne peut contrôler ces sites et ces sources externes, SHOESNOTINCLUDED ne peut être tenue pour responsable de la mise à disposition de ces sites et sources externes, et ne peut supporter aucune responsabilité quant aux contenus, publicités, produits, services ou tout autre matériel, disponibles sur ou à partir de ces sites ou sources externes.</p>
            <p>De plus, SHOESNOTINCLUDED ne pourra être tenue pour responsable de tout dommage avéré ou allégué consécutif ou en relation avec l'utilisation ou avec le fait d'avoir fait confiance aux contenus, à des biens ou des services disponibles sur ces sites ou sources externes.</p>
            <p>Enfin, dans la limite autorisée par la loi, SHOESNOTINCLUDED ne saura être tenue pour responsable dans le cas où le contenu desdits autres sites contreviendrait aux dispositions légales et réglementaires en vigueur.</p>

            <h3>11. Garanties & Responsabilité</h3>
            <p>L'Utilisateur s'engage, lors de l'utilisation qu'il fait du Site et de l'Application mobile, à ne pas contrevenir aux CGU, aux dispositions législatives et réglementaires en vigueur et aux bons usages d'Internet.</p>
            <p>De manière générale, SHOESNOTINCLUDED se dégage de toute responsabilité en cas d'utilisation non-conforme aux CGU et de ses services.</p>
            <p>Dans les mêmes conditions, l'Utilisateur s'engage également à respecter les règles et usages internes relatifs à l'utilisation des systèmes d'information et réseaux de SHOESNOTINCLUDED.</p>
            <p>L'Utilisateur s'engage à agir avec diligence pour répondre à toute réclamation.</p>
            <p>L'Utilisateur est responsable envers SHOESNOTINCLUDED et/ou les tiers de tout préjudice matériel ou immatériel, direct et/ou indirect de quelque nature que ce soit causé par l'Utilisateur, et/ou ses préposés en cas d'utilisation non-conforme aux CGU.</p>
            <p>L'Utilisateur est informé que toute violation des stipulations des CGU est susceptible d'entraîner des poursuites judiciaires et des sanctions à son encontre.</p>
            <p>L'Utilisateur garantit SHOESNOTINCLUDED, ses représentants, ses salariés, ses partenaires, et les Hébergeurs, contre toute demande, réclamation, revendication et/ou recours de toute sorte, résultant de toute violation desdites stipulations.</p>
            <p>L'Utilisateur les tiendra indemnisés, à tout moment et à première demande, contre tout dommage ou contre toute demande, action, plainte émanant de tiers résultant de toute violation desdites stipulations.</p>
            <p>Cette garantie couvre tant les dommages et intérêts qui seraient éventuellement versés, quelle que soit leur origine directe ou indirecte, tels que notamment les honoraires d'avocat, frais d'expertise, frais de justice.</p>
            <p>SHOESNOTINCLUDED s'engage à faire ses meilleurs efforts afin de mettre en œuvre des mesures techniques et d'organisation pour protéger les Informations circulant sur le Site ou l'Application mobile.</p>
            <p>L'Utilisateur se déclare, néanmoins, parfaitement informé que les données ne sont pas protégées contre toute forme d'intrusion y compris par voie de piratage.</p>
            <p>L'Utilisateur reconnaît qu'il est impossible de garantir une sécurité totale aux données transmises. En conséquence, SHOESNOTINCLUDED ne pourra être tenue responsable des incidents qui pourraient découler de cette transmission.</p>
            <p>Il appartient à l'Utilisateur de mettre en œuvre tous moyens utiles aux fins de préserver la confidentialité des données transmises.</p>
            <p>Chaque Utilisateur du Site ou de l'Application mobile s'engage expressément :</p>
            <ul>
              <li>à renoncer expressément à utiliser des logiciels ou dispositifs susceptibles de perturber le bon fonctionnement du Site ou de l'Application mobile, ni à engager d'action de nature à imposer une charge disproportionnée pour les infrastructures de SHOESNOTINCLUDED</li>
              <li>à ne pas collecter des informations sur des tiers, y compris les adresses électroniques, afin de les utiliser pour l'envoi de sollicitations commerciales ou équivalentes, ou de les intégrer au sein d'un service de référencement ou équivalent, gratuit ou payant, ou encore afin d'effectuer une veille concurrentielle</li>
              <li>à ne pas altérer ou modifier voire créer des œuvres dérivées à partir des Informations du Site ou de l'Application mobile sans le consentement exprès et préalable de SHOESNOTINCLUDED</li>
              <li>à ne pas utiliser de logiciels ou de procédés destiné à copier les Informations du Site ou de l'Application mobile sans l'autorisation expresse et préalable de SHOESNOTINCLUDED</li>
              <li>à ne procéder à de courtes citations, analyses et reproductions destinées à des revues de presse ou autres utilisations expressément autorisées par la loi que dans les limites et conditions fixées par ces dernières et sous réserve notamment de citer le nom des auteurs et la source</li>
              <li>à informer SHOESNOTINCLUDED dès la connaissance d'une atteinte quelle qu'elle soit (notamment aux droits de propriété intellectuelle de SHOESNOTINCLUDED) en particulier de toute utilisation illicite ou non contractuelle des Informations du Site et de l'Application mobile et ce, quel que soit le mode de diffusion utilisé</li>
              <li>à ne pas mettre en place des systèmes susceptibles ou de nature à pirater le Site ou l'Application mobile en tout ou partie, ou de nature à violer les CGU</li>
            </ul>
            <p>L'Utilisateur qui publie une Contribution sur le Site ou l'Application mobile reconnaît être personnellement responsable, tant vis-à-vis des tiers que de SHOESNOTINCLUDED, en cas de violation des dispositions législatives ou réglementaires applicables et garantit, en conséquence, SHOESNOTINCLUDED contre tout trouble, revendication et éviction quelconque.</p>

            <h3>12. Nullité d'une clause</h3>
            <p>La nullité en tout ou partie d'une ou de plusieurs stipulations des CGU, aux termes d'une disposition légale ou réglementaire ou d'une décision de justice devenue définitive, n'entraîne pas la nullité des autres stipulations ou de la partie de la disposition non entachées de nullité.</p>

            <h3>13. Droit applicable - Règlement des litiges</h3>
            <p>Les CGU sont soumises au droit français.</p>
            <p>L'Utilisateur et SHOESNOTINCLUDED conviennent de déployer leurs meilleurs efforts afin de régler à l'amiable le litige en cas de différends relatifs à l'interprétation, la validité ou l'exécution des CGU.</p>
            <p>Tout potentiel litige se rapportant à l'exécution ou l'interprétation des CGU sera soumis à la compétence des tribunaux de Nantes, dans le cas où un accord amiable ne serait pas trouvé.</p>
          </LegalNoticesTCUContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default LegalNoticesAndCGU
