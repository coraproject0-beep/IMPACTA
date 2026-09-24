import { DriverProfile } from "@/types/driver";

export const SYNTHETIC_DRIVER_PROFILE: DriverProfile = {
  fullName: "Matteo Bianchi",
  fiscalCode: "BNCMTT84M15H501Z",
  licenseNumber: "RM9482014L",
  phone: "+39 06 8492 1102",
  email: "matteo.bianchi@demo-driver.it",
  vehicle: {
    role: "VEHICLE_A",
    plate: "GF492XP",
    make: "Volkswagen",
    model: "Golf VIII 1.5 eTSI",
    year: 2022,
    color: "Deep Black Pearl",
    vin: "WVWZZZCDZNW082914",
    damageDescription: "Front-right bumper and headlight deformation",
    impactZone: "Front-Right",
    drivable: true,
  },
  policy: {
    insurerName: "Aura Mutua Assicurazioni",
    policyNumber: "AUR-8921-00412",
    coverageType: "KASKO_FULL",
    validUntil: "2027-03-31",
    agencyCode: "AG-RM-04",
    policyholderMatch: true,
  },
};
