const initialState = {
  loading: null,
  newReport: {
    firstName: "",
    lastName: "",
    dob: null,
    gender: "",
    encounterDate: null,
    physician_id: "",
    technician_id: "",
    files: [],
  },
  providers: [],
  technicians: [],
  completed: false,
  history: {
    hpi: {},
    auralSymptom: {},
    healthCondition: {},
  },
  posturalStability: {
    gsoTest: {},
    cdpTest: {
      soTest: {},
      mcTest: {},
      adTest: {},
    },
  },
  vng: {
    oculuMotors: {},
    gazeDenied: {
      center: {},
      right: {},
      left: {},
      up: {},
    },
    gazeEnabled: {
      center: {},
      right: {},
      left: {},
      up: {},
    },
    highFrequecy: {
      seated: {},
      lateralRight: {},
      lateralLeft: {},
    },
    positionDenied: {
      supine: {},
      headRight: {},
      headLeft: {},
      bodyRight: {},
      bodyLeft: {},
    },
    positionEnabled: {
      supine: {},
      headRight: {},
      headLeft: {},
      bodyRight: {},
      bodyLeft: {},
    },
    hallPick: {
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
    abr: {
      right: {},
      left: {},
    },
    eco: {
      right: {},
      left: {},
    },
    ovemp: {
      right: {},
      left: {},
    },
    cvemp: {
      right: {},
      left: {},
    },
  },
  audiometry: {
    otoscopy: {
      rightEar: {},
      leftEar: {},
    },
    ai: {
      rightEar: {},
      leftEar: {},
    },
    oe: {
      rightEar: {},
      leftEar: {},
    },
    audiogram: {
      rightEar: {},
      leftEar: {},
    },
  },
  screenings: {
    vast: {
      right: {},
      left: {},
    },
    cervical: {
      right: {},
      left: {},
    },
    actuity: {
      horizontal: {},
      vertical: {},
    },
    impulse: {
      right: {},
      left: {},
    },
  },
  comments: {},
};

export default initialState;
