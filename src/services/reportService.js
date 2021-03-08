import { postUtil, getUtil } from "../utils/apiService";
export function createReport(payload, onSuccess) {
  let data = {};
  const { id = "" } = payload || {};
  data = payload.id
    ? {
        reportId: payload.id,
        patientDemographics: {
          ...payload,
        },
      }
    : {
        patientDemographics: {
          ...payload,
        },
      };

  return new Promise((resolve, reject) => {
    postUtil("/api/add/patient-demographics", data)
      .then((response) => {
        if (response.status === 200) {
          if (id === "") {
            onSuccess();
          }
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function getTechnicians() {
  return new Promise((resolve, reject) => {
    getUtil("/api/get/technician")
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.length > 0) {
            resolve(response.data.data[0].technicians);
          } else {
            resolve([]);
          }
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getProviders() {
  return new Promise((resolve, reject) => {
    getUtil("/api/get-providers")
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.length > 0) {
            resolve(response.data.data[0].providers);
          } else {
            resolve([]);
          }
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getReport({ id }) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get-report/${id}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function saveProvider(payload) {
  const provider = {
    providers: {
      name: payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/provider", provider)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function saveTechnician(payload) {
  const technician = {
    technicians: {
      name: payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/technician", technician)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function patientHistory(payload) {
  // const provider = {
  //   providers: {
  //     name: payload,
  //   },
  // };
  const data = {
    reportId: payload.reportId,
    history: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/history", data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getHistoryById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get-history-report/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.data.history);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function posturalStability(payload) {
  const data = {
    reportId: payload.reportId,
    postureStability: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/posture-stability", data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getPosturalStabilityById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get-posture-stability-report/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data.data.postureStability);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addVng(payload) {
  const data = {
    reportId: payload.reportId,
    vng: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/vng", data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getVngById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get-vng-report/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addRotaryChair(payload) {
  const data = {
    reportId: payload.reportId,
    rotaryChair: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/rotaryChair", data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getRotaryChairById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/add/rotaryChair/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addVHit(payload) {
  const data = {
    reportId: payload.reportId,
    VHit: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/VHit", data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getVHitById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/add/VHit/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addVat(payload) {
  const data = {
    reportId: payload.reportId,
    Vat: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/Vat", data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getVatById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/add/Vat/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addElectrophys(payload) {
  const data = {
    reportId: payload.reportId,
    electrophys: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/electrophys", data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getElectrophysById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/add/electrophys/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addAudiometry(payload) {
  const data = {
    reportId: payload.reportId,
    audiometry: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/audiometry", data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAudiometryById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/add/audiometry/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addScreenings(payload) {
  const data = {
    reportId: payload.reportId,
    screenings: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/screenings", data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getScreeningsById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/add/screenings/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addTestComments(payload) {
  const data = {
    reportId: payload.reportId,
    testComments: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/testComments", data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getTestCommentsById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/add/testComments/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
