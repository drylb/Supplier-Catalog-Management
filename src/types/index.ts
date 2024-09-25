export type CatalogRowType = (string | number | null)[];

export interface ISupplier {
  name: string;
  country: string;
  website: string;
  catalog: CatalogRowType[];
}
