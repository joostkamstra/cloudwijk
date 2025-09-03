import { Question } from './types'

export const assessmentQuestions: Record<string, Question[]> = {
  scope: [
    {
      id: 'isAISystem',
      type: 'single',
      title: 'Is dit een AI-systeem volgens de definitie?',
      description: 'Een AI-systeem is software die met verschillende technieken (machine learning, logic-based, statistisch) output genereert zoals voorspellingen, aanbevelingen of beslissingen voor bepaalde doelen.',
      help: 'AI-systeem definitie (Art. 3.1): "machine-based system designed to operate with varying levels of autonomy and that may exhibit adaptiveness after deployment and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments"',
      options: [
        { value: 'yes', label: 'Ja, dit is een AI-systeem' },
        { value: 'no', label: 'Nee, dit is geen AI-systeem' },
        { value: 'unsure', label: 'Niet zeker' },
      ],
      required: true,
    },
    {
      id: 'usedInEU',
      type: 'single',
      title: 'Wordt het systeem gebruikt binnen de EU-markt?',
      description: 'Dit omvat gebruik binnen EU-lidstaten, verkoop aan EU-klanten, of aanbieden van diensten aan EU-burgers.',
      help: 'De AI Act is van toepassing op AI-systemen die op de EU-markt worden gebracht of in gebruik worden gesteld, ongeacht waar de provider gevestigd is.',
      options: [
        { value: 'yes', label: 'Ja, gebruikt in EU' },
        { value: 'no', label: 'Nee, niet in EU' },
        { value: 'planned', label: 'Gepland voor EU-markt' },
      ],
      required: true,
      dependsOn: [{ questionId: 'isAISystem', value: 'yes' }],
    },
  ],

  prohibited: [
    {
      id: 'subliminalTechniques',
      type: 'boolean',
      title: 'Gebruikt het systeem subliminale technieken om gedrag te beïnvloeden?',
      description: 'Technieken die buiten het bewustzijn van personen opereren om hun gedrag materieel te veranderen.',
      help: 'Art. 5.1(a): AI-systemen die subliminale technieken gebruiken die buiten het bewustzijn van een persoon opereren.',
      required: true,
    },
    {
      id: 'exploitingVulnerabilities',
      type: 'boolean',
      title: 'Exploiteert het systeem kwetsbaarheden van specifieke groepen?',
      description: 'Misbruik maken van leeftijd, lichamelijke of geestelijke beperking om gedrag materieel te veranderen.',
      help: 'Art. 5.1(b): AI-systemen die kwetsbaarheden van personen misbruiken vanwege hun leeftijd, lichamelijke of geestelijke beperking.',
      required: true,
    },
    {
      id: 'socialScoring',
      type: 'boolean',
      title: 'Doet het systeem aan social scoring door overheidsinstanties?',
      description: 'Evaluatie of classificatie van natuurlijke personen door overheidsinstanties gebaseerd op sociaal gedrag.',
      help: 'Art. 5.1(c): AI-systemen voor social scoring door overheidsinstanties.',
      required: true,
    },
    {
      id: 'biometricIdentification',
      type: 'boolean',
      title: 'Doet het systeem aan realtime biometrische identificatie in publieke ruimtes?',
      description: 'Realtime identificatie van personen via gezichtsherkenning of andere biometrische gegevens in publiek toegankelijke ruimtes.',
      help: 'Art. 5.1(d): Realtime remote biometrische identificatiesystemen in publiek toegankelijke ruimtes voor rechtshandhaving (met uitzonderingen).',
      required: true,
    },
    {
      id: 'facialRecognitionDatabase',
      type: 'boolean',
      title: 'Scrapt het ongerichteerd gezichtsbeelden voor databases?',
      description: 'Ongerichte verzameling van gezichtsbeelden van internet of CCTV-systemen voor gezichtsherkenningsdatabases.',
      help: 'Art. 5.1(f): Ongerichte scraping van gezichtsbeelden voor gezichtsherkenningsdatabases.',
      required: true,
    },
    {
      id: 'emotionRecognition',
      type: 'boolean',
      title: 'Herkent het systeem emoties op de werkplek of in onderwijsinstellingen?',
      description: 'Emotieherkenning in onderwijsinstellingen of op werkplekken, behalve veiligheidsredenen of medische doeleinden.',
      help: 'Art. 5.1(g): Emotieherkenning op de werkplek en in onderwijsinstellingen (met uitzonderingen voor veiligheid/medisch).',
      required: true,
    },
    {
      id: 'predictivePolicing',
      type: 'boolean',
      title: 'Voorspelt het criminaliteit van individuen?',
      description: 'Risico-beoordeling van natuurlijke personen om de waarschijnlijkheid van criminaliteit te voorspellen.',
      help: 'Art. 5.1(h): AI-systemen die de waarschijnlijkheid van criminaliteit door individuen voorspellen op basis van profiling.',
      required: true,
    },
    {
      id: 'biometricCategorisation',
      type: 'boolean',
      title: 'Categoriseert het personen via biometrische gegevens?',
      description: 'Indeling van personen in categorieën zoals ras, politieke overtuigingen, vakbondslidmaatschap, religieuze overtuigingen, etc.',
      help: 'Art. 5.1(i): Biometrische categorisatiesystemen om personen te classificeren in gevoelige categorieën.',
      required: true,
    },
  ],

  highRisk: [
    {
      id: 'category',
      type: 'single',
      title: 'In welke categorie valt uw AI-systeem?',
      description: 'Selecteer de categorie die het beste past bij de toepassing van uw AI-systeem.',
      help: 'Annex III definieert 8 categorieën van hoog-risico AI-systemen. Elk heeft specifieke use cases en vereisten.',
      options: [
        { value: 'none', label: 'Geen van bovenstaande' },
        { value: 'biometrics', label: 'Biometrische identificatie en categorisering (Annex III.1)' },
        { value: 'criticalInfrastructure', label: 'Kritieke infrastructuur (Annex III.2)' },
        { value: 'education', label: 'Onderwijs en beroepstraining (Annex III.3)' },
        { value: 'employment', label: 'Werkgelegenheid en HR (Annex III.4)' },
        { value: 'essentialServices', label: 'Essentiële diensten (Annex III.5)' },
        { value: 'lawEnforcement', label: 'Rechtshandhaving (Annex III.6)' },
        { value: 'migration', label: 'Migratie, asiel en grenscontrole (Annex III.7)' },
        { value: 'justice', label: 'Rechtspraak en democratische processen (Annex III.8)' },
      ],
      required: true,
    },
    {
      id: 'context',
      type: 'text',
      title: 'Wat is de specifieke context/toepassing?',
      description: 'Beschrijf kort hoe het AI-systeem wordt gebruikt binnen deze categorie.',
      help: 'Deze informatie helpt bij het bepalen van specifieke verplichtingen en conformiteitsprocedures.',
      required: false,
      dependsOn: [{ questionId: 'category', value: ['biometrics', 'criticalInfrastructure', 'education', 'employment', 'essentialServices', 'lawEnforcement', 'migration', 'justice'] }],
    },
  ],

  exceptions: [
    {
      id: 'narrowProcedural',
      type: 'boolean',
      title: 'Voert het systeem alleen enge procedurele taken uit?',
      description: 'Bijvoorbeeld documentverwerking, routering van berichten zonder inhoudelijke beslissingen.',
      help: 'Art. 6.3(a): Systemen die alleen enge procedurele taken uitvoeren.',
      required: true,
    },
    {
      id: 'humanActivity',
      type: 'boolean',
      title: 'Is het bedoeld om menselijke activiteit te verbeteren of te assisteren?',
      description: 'Systemen die alleen menselijke vaardigheden ondersteunen zonder zelfstandige beslissingen te nemen.',
      help: 'Art. 6.3(b): Systemen bedoeld om menselijke activiteit te verbeteren zonder belangrijke beslissingen te nemen.',
      required: true,
    },
    {
      id: 'patternDetection',
      type: 'boolean',
      title: 'Detecteert het alleen patronen zonder persoonsbeoordeling?',
      description: 'Patroondetectie die niet leidt tot beoordeling of classificatie van individuen.',
      help: 'Art. 6.3(c): Systemen die alleen patronen detecteren in events of documenten.',
      required: true,
    },
    {
      id: 'preparatoryTask',
      type: 'boolean',
      title: 'Voert het alleen voorbereidende taken uit?',
      description: 'Taken die input voorbereiden voor een ander systeem dat de daadwerkelijke beslissing neemt.',
      help: 'Art. 6.3(d): Systemen die alleen voorbereidende taken uitvoeren.',
      required: true,
    },
    {
      id: 'profiling',
      type: 'boolean',
      title: 'Doet het systeem aan profiling van natuurlijke personen?',
      description: 'Elke vorm van geautomatiseerde verwerking om aspecten van een persoon te evalueren, analyseren of voorspellen.',
      help: 'Als het systeem profiling doet, geldt de uitzondering uit Art. 6.3 NIET.',
      required: true,
    },
  ],

  limitedRisk: [
    {
      id: 'humanInteraction',
      type: 'boolean',
      title: 'Interacteert het systeem direct met personen?',
      description: 'Chatbots, virtuele assistenten, of andere systemen die direct communiceren met gebruikers.',
      help: 'Art. 50.1: AI-systemen bedoeld voor directe interactie met natuurlijke personen.',
      required: true,
    },
    {
      id: 'syntheticContent',
      type: 'boolean',
      title: 'Genereert het synthetische content?',
      description: 'AI-gegenereerde tekst, afbeeldingen, audio of video content.',
      help: 'Art. 50.2: AI-systemen die audio, afbeelding, video of tekstcontent genereren of manipuleren.',
      required: true,
    },
    {
      id: 'deepfakes',
      type: 'boolean',
      title: 'Creëert het deepfakes of manipuleert het bestaande content?',
      description: 'Realistische maar kunstmatige content die mensen, objecten, plaatsen of gebeurtenissen weergeeft.',
      help: 'Art. 50.2: Specifieke focus op deepfakes en andere misleidende synthetische content.',
      required: true,
    },
    {
      id: 'emotionRecognition',
      type: 'boolean',
      title: 'Herkent het emoties of intenties?',
      description: 'Systemen die menselijke emoties, intenties of psychologische toestanden detecteren.',
      help: 'Art. 50.3: Emotieherkennings- en biometrische categorisatiesystemen.',
      required: true,
    },
    {
      id: 'biometricCategorisation',
      type: 'boolean',
      title: 'Categoriseert het personen via biometrische gegevens?',
      description: 'Indeling van personen op basis van biometrische gegevens (behalve verboden categorieën).',
      help: 'Art. 50.3: Biometrische categorisatie die niet onder verboden praktijken valt.',
      required: true,
    },
  ],

  roles: [
    {
      id: 'actor',
      type: 'single',
      title: 'Wat is uw rol ten opzichte van het AI-systeem?',
      description: 'Provider: ontwikkelt/traint het systeem. Importer: brengt EU-buitenlands systeem naar EU-markt. Distributor: verkoopt/distribueert. Deployer: gebruikt het systeem.',
      help: 'Verschillende rollen hebben verschillende verplichtingen onder de AI Act.',
      options: [
        { value: 'provider', label: 'Provider - Ik ontwikkel/train het AI-systeem' },
        { value: 'importer', label: 'Importer - Ik breng buitenlands systeem naar EU' },
        { value: 'distributor', label: 'Distributor - Ik verkoop/distribueer het systeem' },
        { value: 'deployer', label: 'Deployer - Ik gebruik het systeem operationeel' },
      ],
      required: true,
    },
    {
      id: 'publicAuthority',
      type: 'boolean',
      title: 'Bent u een publieke instantie die het systeem gebruikt?',
      description: 'Overheidsinstanties die hoog-risico AI-systemen gebruiken hebben aanvullende verplichtingen.',
      help: 'Art. 27: Deployers die publieke instanties zijn moeten een fundamentele-rechten-impact-assessment (FRIA) uitvoeren voor hoog-risico systemen.',
      required: true,
      dependsOn: [{ questionId: 'actor', value: 'deployer' }],
    },
    {
      id: 'gpaiProvider',
      type: 'boolean',
      title: 'Biedt u een General-Purpose AI model aan?',
      description: 'Foundation models zoals GPT, BERT, etc. die voor verschillende doeleinden kunnen worden gebruikt.',
      help: 'Hoofdstuk 5 heeft specifieke verplichtingen voor GPAI model providers.',
      required: true,
    },
  ],

  gpai: [
    {
      id: 'modelType',
      type: 'single',
      title: 'Wat voor type model biedt u aan?',
      description: 'Selecteer het type dat het beste uw model beschrijft.',
      options: [
        { value: 'foundationModel', label: 'Foundation model (zoals GPT, BERT)' },
        { value: 'multimodalModel', label: 'Multimodaal model (tekst, beeld, audio)' },
        { value: 'specializedModel', label: 'Gespecialiseerd model voor specifiek domein' },
        { value: 'apiService', label: 'API-service bovenop bestaand model' },
      ],
      required: true,
      dependsOn: [{ questionId: 'gpaiProvider', value: true }],
    },
    {
      id: 'computeThreshold',
      type: 'boolean',
      title: 'Overschrijdt uw model de 10^25 FLOPs training compute threshold?',
      description: 'Modellen boven deze drempel hebben aanvullende "systemic risk" verplichtingen.',
      help: 'Art. 51.1: GPAI modellen met systemic risk hebben extra verplichtingen onder Art. 55.',
      required: true,
      dependsOn: [{ questionId: 'gpaiProvider', value: true }],
    },
    {
      id: 'capabilities',
      type: 'multiple',
      title: 'Welke capabilities heeft uw model?',
      description: 'Selecteer alle toepasselijke mogelijkheden.',
      options: [
        { value: 'textGeneration', label: 'Tekstgeneratie' },
        { value: 'codeGeneration', label: 'Codegeneratie' },
        { value: 'imageGeneration', label: 'Beeldgeneratie' },
        { value: 'reasoning', label: 'Redeneer-/planningsvaardigheden' },
        { value: 'multilingualSupport', label: 'Meertalige ondersteuning' },
      ],
      required: true,
      dependsOn: [{ questionId: 'gpaiProvider', value: true }],
    },
  ],

  compliance: [
    {
      id: 'riskManagement',
      type: 'boolean',
      title: 'Heeft u een risk management systeem?',
      description: 'Systematische identificatie, analyse en mitigatie van AI-risicos (Artikel 9).',
      help: 'Art. 9: Risk management systeem gedurende de volledige lifecycle.',
      required: true,
    },
    {
      id: 'dataGovernance',
      type: 'boolean',
      title: 'Heeft u data governance maatregelen?',
      description: 'Kwaliteitsbeheer van training-, validatie- en testdata (Artikel 10).',
      help: 'Art. 10: Data en data governance voor training, validatie en testing.',
      required: true,
    },
    {
      id: 'documentation',
      type: 'boolean',
      title: 'Is technische documentatie beschikbaar?',
      description: 'Uitgebreide documentatie conform Annex IV vereisten.',
      help: 'Art. 11 + Annex IV: Technische documentatie.',
      required: true,
    },
    {
      id: 'humanOversight',
      type: 'boolean',
      title: 'Is menselijk toezicht geïmplementeerd?',
      description: 'Maatregelen om betekenisvolle menselijke controle te waarborgen (Artikel 14).',
      help: 'Art. 14: Human oversight maatregelen.',
      required: true,
    },
    {
      id: 'accuracyRobustness',
      type: 'boolean',
      title: 'Zijn accuracy en robustness gevalideerd?',
      description: 'Testing en validatie van systeemprestaties onder verschillende omstandigheden (Artikel 15).',
      help: 'Art. 15: Accuracy, robustness en cybersecurity.',
      required: true,
    },
    {
      id: 'qualityManagement',
      type: 'boolean',
      title: 'Heeft u een kwaliteitsmanagementsysteem?',
      description: 'QMS voor ontwikkeling, testing en lifecycle management (Artikel 17).',
      help: 'Art. 17: Quality management systeem.',
      required: true,
    },
    {
      id: 'conformityAssessment',
      type: 'boolean',
      title: 'Is een conformity assessment uitgevoerd?',
      description: 'Formele beoordeling volgens Annex VI of VII procedures.',
      help: 'Art. 43: Conformity assessment procedures.',
      required: true,
    },
    {
      id: 'ceMarking',
      type: 'boolean',
      title: 'Is CE-markering aangebracht?',
      description: 'CE-markering en EU Declaration of Conformity voor marktintroductie.',
      help: 'Art. 48: CE marking vereisten.',
      required: true,
    },
    {
      id: 'registration',
      type: 'boolean',
      title: 'Is het systeem geregistreerd in EU-database?',
      description: 'Registratie in EU-brede database voor hoog-risico AI-systemen.',
      help: 'Art. 49: Registration vereisten voor hoog-risico AI-systemen.',
      required: true,
    },
  ],
}

// Helper function to get questions based on current answers
export function getNextQuestions(
  section: string,
  answers: Record<string, any>
): Question[] {
  const sectionQuestions = assessmentQuestions[section] || []
  
  return sectionQuestions.filter(question => {
    if (!question.dependsOn) return true
    
    return question.dependsOn.every(dependency => {
      const answerValue = answers[dependency.questionId]
      if (Array.isArray(dependency.value)) {
        return dependency.value.includes(answerValue)
      }
      return answerValue === dependency.value
    })
  })
}

// Question flow order
export const questionSections = [
  'scope',
  'prohibited',
  'highRisk',
  'exceptions',
  'limitedRisk',
  'roles',
  'gpai',
  'compliance',
] as const