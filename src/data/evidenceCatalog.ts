import catalog from './evidenceCatalog.json';

/** One clinically reviewed reference from the canonical evidence catalog. */
export interface EvidencePaper {
  topic: string;
  title: string;
  year: number;
  journal_or_source: string;
  evidence_type: string;
  pmid: string | null;
  pmcid: string | null;
  doi: string | null;
  access_url: string;
  open_access: string;
  clinical_use: string;
  library_tags: string[];
}

/** The clinically reviewed papers database (20 references, 2020+, PubMed-linked). */
export const EVIDENCE_PAPERS = catalog.papers as EvidencePaper[];
