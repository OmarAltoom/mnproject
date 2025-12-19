// Simple in-memory mock API for doctor change requests (frontend only)
let requests = [];

export function addDoctorChangeRequest(request) {
  requests.push({ ...request, id: Date.now(), status: "pending" });
}

export function getDoctorChangeRequests() {
  return requests;
}

export function updateDoctorChangeRequestStatus(id, status) {
  requests = requests.map(r => r.id === id ? { ...r, status } : r);
}
