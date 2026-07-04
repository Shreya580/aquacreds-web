// Domain model for AquaCreds — kept close to the original app's shape.

export type Role = "user" | "verifier" | "admin";

export type ProjectStatus =
  | "pending" // submitted by user, awaiting verifier
  | "verified" // approved by verifier, awaiting admin
  | "verifier-rejected" // rejected by verifier
  | "approved" // approved by admin (credits about to issue)
  | "admin-rejected" // rejected by admin
  | "issued"; // carbon credits minted to the user

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  org?: string;
  walletBalance: number; // AQC carbon-credit tokens owned
};

export type Project = {
  id: string;

  // Organization (wizard step 1)
  orgName: string;
  regNo: string;
  year: string;
  fullName: string;
  email: string;
  mobile: string;
  designation: string;
  address: string;
  state: string;
  district: string;
  pincode: string;

  // Plantation (step 2)
  title: string;
  ecosystem: "Mangrove" | "Seagrass" | "Salt marsh";
  plantationDate: string;
  area: string; // hectares
  species: string;
  saplings: string;
  seedSource: string;

  // Geotag / media (step 3)
  imageUri?: string;
  latitude?: number;
  longitude?: number;

  // System
  ownerId: string;
  status: ProjectStatus;
  listed: boolean; // listed on marketplace
  credits: number; // AQC issued for this project
  pricePerCredit: number; // marketplace price
  verifierComment?: string;
  adminComment?: string;
  createdAt: string;
};

export type CreditTx = {
  id: string;
  type: "issued" | "buy" | "sell";
  projectTitle: string;
  amount: number; // credits
  value: number; // total price
  date: string;
};
