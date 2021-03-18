const initialState = {
  loading: null,
  newReport: {
    firstName: "",
    lastName: "",
    dob: null,
    gender: "",
    encounterDate: null,
    providerId: "",
    technicianId: "",
    files: [],
  },
  providers: [],
  technicians: [],
  completed: false,
  history: {
    presentIllness: {},
    auralSymptom: {},
    healthCondition: {},
  },
  posturalStability: {
    gsPerformanceTest: {},
    computerizedDynamicPosturography: {
      sensoryOrganizationTest: {},
      motorControlTest: {},
      adaptationTestt: {},
    },
  },
  vng: {
    oculoMotors: {},
    gazeVisionDenied: {
      center: {},
      right: {},
      left: {},
      up: {},
    },
    gazeVisionEnabled: {
      center: {},
      right: {},
      left: {},
      up: {},
    },
    highFrequencyHeadshake: {
      seated: {},
      lateralRight: {},
      lateralLeft: {},
    },
    positionalsVisionDenied: {
      supine: {},
      headRight: {},
      headLeft: {},
      bodyRight: {},
      bodyLeft: {},
    },
    positionalsVisionEnabled: {
      supine: {},
      headRight: {},
      headLeft: {},
      bodyRight: {},
      bodyLeft: {},
    },
    hallPike: {
      left: {},
      right: {},
    },
    calorics: {
      right: {},
      left: {},
    },
  },
  rotaryChair: {},
  vHit: {
    lateral: {},
    ralp: {},
    larp: {},
    notes: "",
  },
  vatVorteq: {
    lateral: {},
    vertical: {},
    notes: "",
  },
  electrophys: {
    auditoryBrainstemResponse: {
      right: {},
      left: {},
    },
    electroCochleoGraphy: {
      right: {},
      left: {},
    },
    ocularVestibularEvokedMyogenicPotential: {
      right: {},
      left: {},
    },
    cervicalVestibularEvokedMyogenicPotential: {
      right: {},
      left: {},
    },
  },
  audiometry: {
    otoscopy: {
      rightEar: {},
      leftEar: {},
    },
    acousticImmittance: {
      rightEar: {},
      leftEar: {},
    },
    otoacousticEmissions: {
      rightEar: {},
      leftEar: {},
    },
    audioGram: {
      rightEar: {},
      leftEar: {},
    },
  },
  screenings: {
    vertebralArteryScreeningTest: {
      right: {},
      left: {},
    },
    cervicalDizzinessScreeningTest: {
      right: {},
      left: {},
    },
    aibComputerizedDynamicVisualAcuityTest: {
      horizontal: {},
      vertical: {},
    },
    headImpulseTest: {
      right: {},
      left: {},
    },
  },
  comments: {},
  impression: {
    impressionAndPlan: {
      overAllImpression: "",
      macro: [],
    },
  },
  macros: [],
  selectedMacros: [],
  // normality: "",
};

export default initialState;
