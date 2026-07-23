// Mock data standing in for real API responses.
// NOTE: the `submittedWork` shape below is INFERRED — it does not come from
// the actual submitted_work_model.dart file. Fields guessed: title,
// description, completionPercentage, milestone, submittedDate, attachments.
// Check this against the real model and adjust field names/types to match.

export const initialWhitelistRequests = [
  {
    id: "wl-1",
    email: "contact@newcontractorco.jo",
    requestedBy: "Newco Contracting LLC",
    requestedDate: "July 20, 2026",
    note: "Requested via onboarding form — new contractor, no prior account.",
    status: "Pending",
  },
  {
    id: "wl-2",
    email: "finance@zaytoonahgroup.jo",
    requestedBy: "Zaytoonah Group",
    requestedDate: "July 19, 2026",
    note: "Second contact for existing beneficiary account, needs own login.",
    status: "Pending",
  },
  {
    id: "wl-3",
    email: "ops@riversideholdings.jo",
    requestedBy: "Riverside Holdings",
    requestedDate: "July 17, 2026",
    note: "",
    status: "Pending",
  },
];

export const users = [
  {
    id: "u-1",
    name: "Ahmad Khalil",
    email: "ahmad.khalil@alfahad.jo",
    role: "Contractor",
    company: "Al-Fahad Contracting LLC",
    joinedDate: "May 2, 2026",
  },
  {
    id: "u-2",
    name: "Yousef Amer",
    email: "yousef.amer@alnoordev.jo",
    role: "Project Owner",
    company: "Al-Noor Development",
    joinedDate: "May 4, 2026",
  },
  {
    id: "u-3",
    name: "Salma Odeh",
    email: "salma.odeh@zamzambuilders.jo",
    role: "Contractor",
    company: "Zamzam Builders Co.",
    joinedDate: "June 1, 2026",
  },
  {
    id: "u-4",
    name: "Mazen Tal",
    email: "mazen.tal@riversideholdings.jo",
    role: "Project Owner",
    company: "Riverside Holdings",
    joinedDate: "June 3, 2026",
  },
];

export const initialDisputes = [
  {
    id: "disp-1",
    status: "Open",
    project: "Al-Noor Tower Construction",
    contractor: {
      name: "Ahmad Khalil",
      company: "Al-Fahad Contracting LLC",
      email: "ahmad.khalil@alfahad.jo",
      phone: "+962 79 123 4567",
    },
    owner: {
      name: "Yousef Amer",
      company: "Al-Noor Development",
      email: "yousef.amer@alnoordev.jo",
      phone: "+962 6 555 8814",
    },
    raisedDate: "July 18, 2026",
    reason: "Work not matching agreed specification",
    description:
      "The finishing work submitted for milestone 3 does not match the approved material spec sheet. Tiling in the lobby uses a different grade than what was agreed in the contract addendum.",
    attachments: [
      { name: "lobby-tiling-photo-1.jpg" },
      { name: "spec-sheet-addendum.pdf" },
    ],
    submittedWork: {
      title: "Milestone 3 — Lobby & Common Area Finishing",
      description:
        "Completed tiling, ceiling finishes, and lighting fixtures for the ground floor lobby and common areas.",
      completionPercentage: 100,
      milestone: "Milestone 3 of 5",
      submittedDate: "July 15, 2026",
      attachments: [
        { name: "milestone-3-report.pdf" },
        { name: "lobby-completion-photos.zip" },
      ],
    },
    guarantee: {
      type: "Performance Guarantee",
      amount: "JOD 23,800",
      validity: "Aug 1, 2026 – Oct 31, 2027",
    },
  },
  {
    id: "disp-2",
    status: "Under Review",
    project: "Riverside Complex Phase 2",
    contractor: {
      name: "Salma Odeh",
      company: "Zamzam Builders Co.",
      email: "salma.odeh@zamzambuilders.jo",
      phone: "+962 79 887 2201",
    },
    owner: {
      name: "Mazen Tal",
      company: "Riverside Holdings",
      email: "mazen.tal@riversideholdings.jo",
      phone: "+962 6 555 3390",
    },
    raisedDate: "July 16, 2026",
    reason: "Delayed submission, requesting penalty review",
    description:
      "Milestone 2 was submitted 9 days after the agreed deadline with no prior notice. Owner is requesting the bank review whether a penalty clause applies.",
    attachments: [{ name: "contract-timeline-clause-7.pdf" }],
    submittedWork: {
      title: "Milestone 2 — Structural Frame, Levels 1–4",
      description:
        "Structural concrete frame completed for levels 1 through 4, including column and slab work.",
      completionPercentage: 100,
      milestone: "Milestone 2 of 6",
      submittedDate: "July 14, 2026",
      attachments: [{ name: "structural-inspection-report.pdf" }],
    },
    guarantee: {
      type: "Advance Payment Guarantee",
      amount: "JOD 118,000",
      validity: "Aug 15, 2026 – Feb 28, 2028",
    },
  },
  {
    id: "disp-3",
    status: "Resolved",
    project: "Zaytoonah Business Park",
    contractor: {
      name: "Nour Saleh",
      company: "Horizon Engineering LLC",
      email: "nour.saleh@horizoneng.jo",
      phone: "+962 79 440 6612",
    },
    owner: {
      name: "Lina Haddad",
      company: "Zaytoonah Group",
      email: "procurement@zaytoonahgroup.jo",
      phone: "+962 6 555 2210",
    },
    raisedDate: "July 5, 2026",
    reason: "Missing documentation for MEP handover",
    description:
      "Owner flagged that as-built MEP drawings were not included in the milestone submission.",
    attachments: [],
    submittedWork: {
      title: "Milestone 1 — MEP Rough-in",
      description: "MEP rough-in complete for all floors, pending as-built documentation.",
      completionPercentage: 90,
      milestone: "Milestone 1 of 4",
      submittedDate: "July 2, 2026",
      attachments: [{ name: "mep-rough-in-photos.zip" }],
    },
    guarantee: {
      type: "Performance Guarantee",
      amount: "JOD 9,400",
      validity: "Aug 1, 2026 – Jun 30, 2027",
    },
    resolutionMessage:
      "Contractor confirmed as-built drawings will be submitted with the next milestone. No penalty applied.",
    resolvedDate: "July 8, 2026",
  },
];

export const initialAuditLog = [
  {
    id: "log-1",
    action: "Approved whitelist request",
    detail: "finance@zaytoonahgroup.jo",
    admin: "Admin — Maryam",
    timestamp: "July 20, 2026, 10:12 AM",
  },
  {
    id: "log-2",
    action: "Resolved dispute",
    detail: "disp-3 — Zaytoonah Business Park",
    admin: "Admin — Maryam",
    timestamp: "July 8, 2026, 3:41 PM",
  },
];
