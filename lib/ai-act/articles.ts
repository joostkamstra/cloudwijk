// Complete mapping of EU AI Act articles and their requirements
export const articles = {
  'Art. 5': {
    title: 'Verboden AI-praktijken',
    description: 'AI-systemen die gebruik maken van verboden technieken',
    requirements: [
      'Geen subliminale technieken',
      'Geen exploitatie van kwetsbaarheden',
      'Geen social scoring door overheid',
      'Geen realtime biometrische identificatie in publieke ruimtes',
      'Geen ongerichte scraping van gezichtsbeelden',
      'Geen emotieherkenning op werkplek/onderwijs',
      'Geen predictive policing van individuen',
      'Geen biometrische categorisatie van gevoelige attributen'
    ],
    penalties: 'Tot €35 miljoen of 7% van jaaromzet'
  },

  'Art. 6': {
    title: 'Classificatie hoog-risico AI-systemen',
    description: 'Definitie en uitzonderingen voor hoog-risico systemen',
    requirements: [
      'AI-systemen vermeld in Annex III',
      'Gebruikt als safety component of is zelf het product',
      'Geen uitzondering onder Art. 6.3'
    ],
    exceptions: [
      'Enge procedurele taken (6.3.a)',
      'Verbetering menselijke activiteit (6.3.b)', 
      'Patroondetectie zonder beoordeling (6.3.c)',
      'Voorbereidende taken (6.3.d)',
      'NIET van toepassing bij profiling'
    ]
  },

  'Art. 9': {
    title: 'Risk management systeem',
    description: 'Systematische identificatie en mitigatie van risicos',
    requirements: [
      'Continu proces gedurende lifecycle',
      'Identificatie van bekende en voorzienbare risicos',
      'Schatting en evaluatie van risicos',
      'Analyse van andere risicos na mitigatie-maatregelen',
      'Eliminatie of reductie voor zover technisch mogelijk',
      'Adequate informatie voor deployers',
      'Testing voor bias en discriminatie',
      'Evaluatie van impact op fundamentele rechten'
    ]
  },

  'Art. 10': {
    title: 'Data en data governance',
    description: 'Kwaliteit van training-, validatie- en testdata',
    requirements: [
      'Training data relevant voor beoogde use case',
      'Dataset design choices documenteren',
      'Data kwaliteit maatregelen',
      'Relevante data governance en management praktijken',
      'Training/validation/test data onderscheiden',
      'Dataset bias identificatie en mitigatie',
      'Data gaps identificatie',
      'Bias detection en correction maatregelen'
    ]
  },

  'Art. 11': {
    title: 'Technische documentatie',
    description: 'Uitgebreide documentatie conform Annex IV',
    requirements: [
      'Algemene beschrijving AI-systeem',
      'Gedetailleerde beschrijving elementen',
      'Gedetailleerde informatie over monitoring',
      'Relevante informatie over data requirements',
      'Wijzigingen gedurende lifecycle',
      'Lijst van harmonized standards',
      'Kopie EU Declaration of Conformity',
      'Gedetailleerde beschrijving conformity assessment'
    ]
  },

  'Art. 12': {
    title: 'Record-keeping',
    description: 'Automatische logging en record-keeping',
    requirements: [
      'Automatische registratie van events',
      'Records voor identificatie van situaties',
      'Records voor monitoring van systeem operatie',
      'Records voor post-market monitoring',
      'Logging van input data',
      'Logging van operatie van systeem',
      'Logging van output resultaten'
    ]
  },

  'Art. 13': {
    title: 'Transparantie en informatie aan deployers',
    description: 'Informatie aan gebruikers van het systeem',
    requirements: [
      'Duidelijke en uitgebreide informatie',
      'Informatie over performance levels',
      'Informatie over intended purpose',
      'Informatie over conditions voor accurate operation',
      'Informatie over expected level van accuracy',
      'Informatie over input data requirements',
      'Informatie over interpretatie van outputs',
      'Informatie over human oversight measures'
    ]
  },

  'Art. 14': {
    title: 'Human oversight',
    description: 'Menselijke controle over AI-systemen',
    requirements: [
      'Systeem design voor effectief human oversight',
      'Menselijke toezicht tijdens gebruik',
      'Mensen begrijpen capaciteiten en limieten',
      'Kunnen systeem output correct interpreteren',
      'Kunnen beslissen wanneer niet te gebruiken',
      'Kunnen interventies doen of systeem stoppen',
      'Blijvend bewust van automation bias risico'
    ]
  },

  'Art. 15': {
    title: 'Accuracy, robustness en cybersecurity',
    description: 'Technische prestaties en veiligheid',
    requirements: [
      'Consistent hoge level van accuracy, robustness, cybersecurity',
      'Performance gedurende lifecycle',
      'Resilience tegen fouten, faults, inconsistenties',
      'Resilience tegen attempts om systeem te compromitteren',
      'Protection tegen cyberattacks',
      'Accuracy metrics en thresholds',
      'Maatregelen voor accuracy gedurende gebruik'
    ]
  },

  'Art. 16': {
    title: 'Verplichtingen importers',
    description: 'Verantwoordelijkheden bij import van AI-systemen',
    requirements: [
      'Verificatie van provider compliance',
      'Verificatie van EU Declaration of Conformity',
      'Verificatie van CE marking',
      'Verificatie van technische documentatie',
      'Registratie in EU database',
      'Name en address op systeem of documentation',
      'Ensure instructions for use bij systeem'
    ]
  },

  'Art. 17': {
    title: 'Quality management systeem',
    description: 'QMS voor ontwikkeling en lifecycle',
    requirements: [
      'Systematische aanpak voor design en ontwikkeling',
      'Quality management systeem documentatie',
      'Examination, test, validatie procedures',
      'Procedures voor design controle en verificatie',
      'Methods voor monitoring quality tijdens lifecycle',
      'Post-market monitoring procedures',
      'Procedures voor handling van non-conformities',
      'Communication en management review procedures'
    ]
  },

  'Art. 25': {
    title: 'Verplichtingen deployers',
    description: 'Verantwoordelijkheden gebruikers van AI-systemen',
    requirements: [
      'Gebruik conform intended purpose',
      'Input data monitoring en controle',
      'Monitoring van AI systeem operatie',
      'Human oversight implementatie',
      'Keeping van logs automatisch gegenereerd',
      'Data protection impact assessment indien GDPR vereist',
      'Cooperatie met providers en authorities'
    ]
  },

  'Art. 27': {
    title: 'Fundamental rights impact assessment',
    description: 'FRIA voor publieke instanties',
    requirements: [
      'Assessment voor deployment van high-risk systemen',
      'Proces beschrijving van deployment',
      'Assessment van impact op fundamental rights',
      'Mitigatie maatregelen',
      'Consultation proces met relevante stakeholders',
      'Assessment periodiek reviewen',
      'Public summary van assessment'
    ]
  },

  'Art. 43': {
    title: 'Conformity assessment',
    description: 'Procedures voor conformiteitsbeoordeling',
    requirements: [
      'Internal control conform Annex VI',
      'Quality assessment conform Annex VII voor specifieke systemen',
      'Involvement van notified body waar vereist',
      'Assessment van compliance met alle requirements',
      'Documentation van conformity assessment',
      'Issuance van EU Declaration of Conformity'
    ]
  },

  'Art. 47': {
    title: 'EU Declaration of Conformity',
    description: 'Verklaring van conformiteit',
    requirements: [
      'Declaration conform Annex V template',
      'Attestatie dat systeem voldoet aan AI Act',
      'Information over provider',
      'Information over systeem',
      'Information over conformity assessment procedure',
      'Signature en date van declaration',
      'Beschikbaar houden voor 10 jaar'
    ]
  },

  'Art. 48': {
    title: 'CE marking',
    description: 'CE markering voor markttoelating',
    requirements: [
      'CE marking conform EU regelgeving',
      'Marking voordat systeem op markt gebracht',
      'Marking visible, legible, indelible',
      'Proportionate size van marking',
      'Affixing op systeem of documentation',
      'Responsibility van provider voor correcte marking'
    ]
  },

  'Art. 49': {
    title: 'Registratie',
    description: 'Registratie in EU database',
    requirements: [
      'Registratie voordat op markt brengen',
      'Information over provider',
      'Information over systeem',
      'Intended purpose van systeem',
      'Risk management systeem information',
      'Data governance information',
      'Update van informatie bij wijzigingen'
    ]
  },

  'Art. 50': {
    title: 'Transparantieverplichtingen beperkt risico',
    description: 'Transparency voor limited risk systemen',
    requirements: [
      'Clear informatie dat interactie met AI systeem',
      'Clear labeling van AI-gegenereerde content',
      'Adequate disclosure voor synthetic content',
      'Clear informatie over emotion recognition gebruik',
      'Clear informatie over biometric categorisation',
      'Safeguards tegen misuse van synthetic content'
    ]
  },

  'Art. 53': {
    title: 'GPAI model verplichtingen',
    description: 'General Purpose AI model requirements',
    requirements: [
      'Technical documentation',
      'Information en documentatie voor downstream providers',
      'Policy om compliance met copyright law',
      'Publicly available summary van content voor training',
      'Cooperation met Commission en authorities',
      'Risk mitigation maatregelen'
    ]
  },

  'Art. 55': {
    title: 'GPAI systemic risk verplichtingen',
    description: 'Extra requirements voor systemic risk modellen',
    requirements: [
      'Model evaluation conform state-of-the-art',
      'Adversarial testing voor systemic risks',
      'Assessment en mitigation van systemic risks',
      'Tracking, documentation, reporting van serious incidents',
      'Cybersecurity safeguards',
      'Compliance met Commission requests voor information'
    ]
  },

  'Art. 72': {
    title: 'Post-market monitoring',
    description: 'Monitoring na marktintroductie',
    requirements: [
      'Post-market monitoring systeem opstellen',
      'Systematisch verzamelen en reviewen van experience data',
      'Proactive en systematic monitoring',
      'Proportion tot risks en impact van systeem',
      'Continuous monitoring gedurende lifecycle',
      'Update van risk assessment gebaseerd op monitoring data',
      'Corrective actions waar nodig'
    ]
  },

  'Art. 73': {
    title: 'Serious incident rapportage',
    description: 'Melding van ernstige incidenten',
    requirements: [
      'Immediately informeren van market surveillance authorities',
      'Report binnen 15 dagen na awareness van incident',
      'Information over aard van incident',
      'Information over affected personen',
      'Description van corrective maatregelen',
      'Assessment van causes van incident',
      'Follow-up information indien beschikbaar'
    ]
  }
} as const

export type ArticleId = keyof typeof articles

// Helper function to get requirements for specific articles
export function getArticleRequirements(articleIds: string[]): string[] {
  return articleIds.flatMap(id => {
    const article = articles[id as ArticleId]
    return article ? article.requirements : []
  })
}

// Helper function to get all applicable articles for a risk category
export function getApplicableArticles(
  riskCategory: string, 
  roles: string[], 
  isGPAI: boolean = false
): string[] {
  const baseArticles: string[] = []

  switch (riskCategory) {
    case 'PROHIBITED':
      baseArticles.push('Art. 5')
      break
      
    case 'HIGH_RISK':
      baseArticles.push(
        'Art. 6',
        'Art. 9', 'Art. 10', 'Art. 11', 'Art. 12', 'Art. 13', 'Art. 14', 'Art. 15', 'Art. 17',
        'Art. 43', 'Art. 47', 'Art. 48', 'Art. 49',
        'Art. 72', 'Art. 73'
      )
      
      if (roles.includes('importer')) baseArticles.push('Art. 16')
      if (roles.includes('deployer')) baseArticles.push('Art. 25')
      if (roles.includes('deployer') && roles.includes('public')) baseArticles.push('Art. 27')
      break
      
    case 'LIMITED_RISK':
      baseArticles.push('Art. 50')
      break
  }

  if (isGPAI) {
    baseArticles.push('Art. 53')
    // Art. 55 would be added based on compute threshold
  }

  return baseArticles
}