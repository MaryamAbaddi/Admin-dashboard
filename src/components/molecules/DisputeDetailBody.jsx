import Section from "./Section";
import Field from "../atoms/Field";
import StatusPill from "../atoms/StatusPill";

// NOTE: the "Submitted work" section mirrors submitted_work_model.dart —
// but the exact fields here (title, description, completionPercentage,
// milestone, submittedDate, attachments) are INFERRED, not copied from the
// real file. Adjust field names/labels below if the real model differs.
export default function DisputeDetailBody({ dispute }) {
  return (
    <>
      <Section title="Dispute">
        <Field label="Status" value={<StatusPill status={dispute.status} />} />
        <Field label="Project" value={dispute.project} />
        <Field label="Raised" value={dispute.raisedDate} />
        <Field label="Reason" value={dispute.reason} />
      </Section>

      <Section title="Description (from owner)">
        <p style={{ fontSize: 13, color: "inherit", margin: "4px 0 10px", lineHeight: 1.5 }}>
          {dispute.description}
        </p>
        {dispute.attachments.length === 0 ? (
          <Field label="Attachments" value="None" />
        ) : (
          dispute.attachments.map((a) => (
            <Field key={a.name} label="Attachment" value={a.name} />
          ))
        )}
      </Section>

      <Section title="Submitted work (context)">
        <Field label="Title" value={dispute.submittedWork.title} />
        <Field label="Milestone" value={dispute.submittedWork.milestone} />
        <Field label="Description" value={dispute.submittedWork.description} />
        <Field label="Completion" value={`${dispute.submittedWork.completionPercentage}%`} />
        <Field label="Submitted date" value={dispute.submittedWork.submittedDate} />
        {dispute.submittedWork.attachments.length === 0 ? (
          <Field label="Attachments" value="None" />
        ) : (
          dispute.submittedWork.attachments.map((a) => (
            <Field key={a.name} label="Attachment" value={a.name} />
          ))
        )}
      </Section>

      <Section title="Guarantee">
        <Field label="Type" value={dispute.guarantee.type} />
        <Field label="Amount" value={dispute.guarantee.amount} />
        <Field label="Validity" value={dispute.guarantee.validity} />
      </Section>

      <Section title="Contractor">
        <Field label="Name" value={dispute.contractor.name} />
        <Field label="Company" value={dispute.contractor.company} />
        <Field label="Email" value={dispute.contractor.email} />
        <Field label="Phone" value={dispute.contractor.phone} />
      </Section>

      <Section title="Project owner">
        <Field label="Name" value={dispute.owner.name} />
        <Field label="Company" value={dispute.owner.company} />
        <Field label="Email" value={dispute.owner.email} />
        <Field label="Phone" value={dispute.owner.phone} />
      </Section>

      {dispute.status === "Resolved" && (
        <Section title="Resolution">
          <Field label="Message sent" value={dispute.resolutionMessage} />
          <Field label="Resolved date" value={dispute.resolvedDate} />
        </Section>
      )}
    </>
  );
}
