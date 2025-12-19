export async function GET() {
  // Mock patient data; replace with DB/service integration.
  const patient = {
    fullName: "أحمد محمد علي",
    age: 42,
    gender: "male",
    patientId: "PAT-000123",
    healthStatus: "attention",
    avatarUrl: "/icons/patient-placeholder.png",
    lastLogin: new Date().toISOString(),
  };

  return Response.json(patient, { status: 200 });
}
