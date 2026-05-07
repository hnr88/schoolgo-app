import type { LlmsTxtInput } from "@/modules/seo/types/seo.types";

export function generateLlmsTxt(input: LlmsTxtInput): string {
  const lines: string[] = [];

  lines.push(`# ${input.name}`);
  lines.push("");
  lines.push(`> ${input.summary}`);
  lines.push("");

  if (input.description) {
    lines.push(input.description);
    lines.push("");
  }

  for (const section of input.sections) {
    lines.push(`## ${section.heading}`);
    lines.push("");
    for (const link of section.links) {
      const desc = link.description ? `: ${link.description}` : "";
      lines.push(`- [${link.title}](${link.url})${desc}`);
    }
    lines.push("");
  }

  if (input.optionalSections && input.optionalSections.length > 0) {
    lines.push("## Optional");
    lines.push("");
    for (const section of input.optionalSections) {
      lines.push(`### ${section.heading}`);
      lines.push("");
      for (const link of section.links) {
        const desc = link.description ? `: ${link.description}` : "";
        lines.push(`- [${link.title}](${link.url})${desc}`);
      }
      lines.push("");
    }
  }

  return lines.join("\n");
}
