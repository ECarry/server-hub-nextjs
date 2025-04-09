import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { DocumentsGetManyOutput } from "@/modules/products/types";
import { format } from "date-fns";

interface FilesAccordionProps {
  documents: DocumentsGetManyOutput;
}

export function FilesAccordion({ documents }: FilesAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {documents.map((document) => (
        <AccordionItem
          value="item-1"
          key={document.id}
          className="bg-muted py-4 pl-2 pr-4 border-l-4"
        >
          <AccordionTrigger>{document.name}</AccordionTrigger>
          <AccordionContent>
            <div>
              <div className="space-y-1">
                <h1 className="font-semibold">Update time</h1>
                <p className="text-muted-foreground text-sm">
                  {format(new Date(document.updatedAt), "d MMM, yyyy")}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
