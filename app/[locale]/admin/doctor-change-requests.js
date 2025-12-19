import { getDoctorChangeRequests, updateDoctorChangeRequestStatus } from '../../api/doctor-change-requests';

export function useDoctorChangeRequests() {
  return getDoctorChangeRequests();
}

export function approveDoctorChangeRequest(id) {
  updateDoctorChangeRequestStatus(id, 'approved');
}

export function rejectDoctorChangeRequest(id) {
  updateDoctorChangeRequestStatus(id, 'rejected');
}
