import { LegalPageView, buildLegalMetadata } from "@/components/site/legal-page";
import { TERMS } from "@/data/legal";

export const metadata = buildLegalMetadata(TERMS);

export default function TermsPage() {
  return <LegalPageView page={TERMS} />;
}
