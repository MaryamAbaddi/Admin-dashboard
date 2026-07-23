import Section from "./Section";
import Field from "../atoms/Field";
import StatusPill from "../atoms/StatusPill";
import { theme } from "../../styles/theme";

function formatJod(amount) {
  return `JOD ${Number(amount).toLocaleString()}`;
}

// `dispute` starts out as the list-row summary (projectId, projectTitle,
// contractorName, ownerName, status, raisedDate) and gets swapped for the
// full detail object once it loads — detailLoaded distinguishes the two so
// the sections that only exist on the detail response don't render with
// missing data while that fetch is still in flight.
export default function DisputeDetailBody({ dispute, detailLoaded }) {
  return (
    <>
      <Section title="Dispute">
        <Field label="Status" value={<StatusPill status={dispute.status} />} />
        <Field label="Project" value={dispute.projectTitle} />
        <Field label="Raised" value={dispute.raisedDate} />
        <Field label="Contractor" value={dispute.contractorName} />
        <Field label="Project owner" value={dispute.ownerName} />
      </Section>

      {!detailLoaded ? (
        <Section title="Details">
          <p style={{ fontSize: 13, color: theme.muted, margin: 0 }}>Loading…</p>
        </Section>
      ) : (
        <>
          <Section title="Owner's dispute reason">
            <p style={{ fontSize: 13, color: "inherit", margin: "4px 0", lineHeight: 1.5 }}>
              {dispute.disputeReason}
            </p>
          </Section>

          <Section title="Project">
            <Field label="Sector" value={dispute.sector} />
            <Field label="Location" value={dispute.location} />
            <Field label="Contract value" value={formatJod(dispute.contractValueJod)} />
            <Field label="Timeline" value={dispute.timelineText} />
            <Field label="Milestones" value={dispute.milestones} />
          </Section>

          <Section title="Submitted work">
            <Field label="Submitted date" value={dispute.submittedDate || "—"} />
          </Section>

          {dispute.status === "Resolved" && (
            <Section title="Resolution">
              <Field label="Message sent" value={dispute.resolutionMessage} />
              <Field label="Resolved date" value={dispute.resolvedDate} />
            </Section>
          )}
        </>
      )}
    </>
  );
}
