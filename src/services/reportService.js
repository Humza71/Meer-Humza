import { postUtil, getUtil, deleteUtil } from "../utils/apiService";
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
        if (response.status === 202) {
          if (id === "") {
            resolve(response.data.data[0]);
          }
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
    getUtil("/api/clinic/get/technicians")
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.length > 0) {
            resolve(response.data.data);
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
    getUtil("/api/clinic/get/providers")
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.length > 0) {
            resolve(response.data.data);
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
    getUtil(`/api/get/report/${id}`)
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
    postUtil("/api/clinic/add/providers", provider)
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
    postUtil("/api/clinic/add/technicians", technician)
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
    getUtil(`/api/get/history-report/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.data);
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
    getUtil(`/api/get/posture-stability-report/${payload.reportId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.data);
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
    getUtil(`/api/get/vng-report/${payload.reportId}`)
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
    postUtil("/api/add/rotary-chair", data)
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
    getUtil(`/api/get/rotary-chair-report/${payload.reportId}`)
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
    vHIT: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/vHIT", data)
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
    getUtil(`/api/get/vHIT-report/${payload.reportId}`)
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
    vatVorteq: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/vatVorteq", data)
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
    getUtil(`/api/get/vatVorteq-report/${payload.reportId}`)
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
    getUtil(`/api/get/electrophys-report/${payload.reportId}`)
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
    audioMetry: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/audio-metry", data)
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
    getUtil(`/api/get/audio-metry-report/${payload.reportId}`)
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
    getUtil(`/api/get/screenings-report/${payload.reportId}`)
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
    testAndComments: payload.comments,
    // testAndComments: {
    //   ...payload,
    // },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/test-and-comments", data)
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
    getUtil(`/api/get/test-and-comments-report/${payload.reportId}`)
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

export function addImpressionPlan(payload) {
  // debugger;
  // const data = {
  //   reportId: payload.reportId,
  //   impressionPlan: {
  //     ...payload,
  //   },
  // };
  // debugger;

  return new Promise((resolve, reject) => {
    postUtil("/api/add/impression-and-plan", payload)
      .then((response) => {
        if (response.status === 202) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getImpressionPlanById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get/impression-and-plan-report/${payload.reportId}`)
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

export function getMacros(payload) {
  return new Promise((resolve, reject) => {
    getUtil("/api/get/macros")
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

export function getMacrosByName(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get/macro/${payload.name}`)
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

export function addFiles(payload) {
  const formData = new FormData();
  [...payload.files].forEach((image) => {
    formData.append("images", image);
  });
  return new Promise((resolve, reject) => {
    postUtil("/api/add/files", formData)
      .then((response) => {
        if (response.status === 202) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getFilesById(reportId) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get/files-report/${reportId}`)
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

// export function getTechnicianById(id) {
//   return new Promise((resolve, reject) => {
//     getUtil(`/api/get/technician/${id}`)
//       .then((response) => {
//         if (response.status === 200) {
//           resolve(response.data);
//         }
//         reject(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

// export function getProviderById(id) {
//   return new Promise((resolve, reject) => {
//     getUtil(`/api/get/provider/${id}`)
//       .then((response) => {
//         if (response.status === 200) {
//           resolve(response.data);
//         }
//         reject(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

export const deleteTechnician = async (id) => {
  return new Promise((resolve, reject) => {
    deleteUtil(`/api/clinic/delete/technician/${id}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteProvider = async (id) => {
  return new Promise((resolve, reject) => {
    deleteUtil(`/api/clinic/delete/provider/${id}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export function updateProv(payload) {
  const data = {
    providers: { name: payload.name },
  };

  return new Promise((resolve, reject) => {
    postUtil(`/api/clinic/edit/provider/${payload.id}`, data)
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

export function updateTech(payload) {
  const data = {
    technicians: { name: payload.name },
  };
  return new Promise((resolve, reject) => {
    postUtil(`/api/clinic/edit/technician/${payload.id}`, data)
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
