import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqProps {
  faqs: { question: string; answer: string }[];
  heading?: string;
}

export function Faq({ faqs, heading = "Frequently asked questions" }: FaqProps) {
  if (faqs.length === 0) return null;

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {heading}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.question} value={`faq-${i}`}>
            <AccordionTrigger className="text-left font-display text-base font-semibold hover:text-primary hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
