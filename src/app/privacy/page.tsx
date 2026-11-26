import { LegalPageView, buildLegalMetadata } from "@/components/site/legal-page";
import { PRIVACY } from "@/data/legal";

export const metadata = buildLegalMetadata(PRIVACY);

export default function PrivacyPage() {
  return <LegalPageView page={PRIVACY} />;
}
