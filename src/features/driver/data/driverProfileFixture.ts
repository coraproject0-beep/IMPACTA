import { DriverProfile } from "@/types/driver";

export const SYNTHETIC_DRIVER_PROFILE: DriverProfile = {
  fullName: "John Miller",
  fiscalCode: "MLLJHN84M15H501Z",
  licenseNumber: "RM9482014L",
  phone: "+39 06 8492 1102",
  email: "john.miller@impacta-demo.eu",
  vehicle: {
    role: "VEHICLE_A",
    plate: "AB 123 CD",
    make: "Volkswagen",
    model: "Polo",
    year: 2023,
    color: "Deep Black Pearl",
    vin: "WVWZZZAWZPW082914",
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
