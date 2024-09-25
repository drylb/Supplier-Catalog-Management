import { ISupplier } from '../types';

const initialSuppliers: ISupplier[] = [
  {
    name: 'ChemDiv, Inc.',
    country: 'United States',
    website: 'http://www.chemdiv.com/',
    catalog: [
      [
        'Molport ID',
        'Supplier',
        'SMILES',
        'Sell Unit',
        'Measure',
        'Price(USD)',
        'Direct Shipping Time(Days)',
        'Direct Shipping Price(USD)',
      ],
      ['Molport-000-000-999', 'ChemDiv, Inc.', 'Nc1cccnc1C(O)=O', '6', 'g', '35', '6', '100'],
    ],
  },
  {
    name: 'BIONET - Key Organics Ltd.',
    country: 'United Kingdom',
    website: 'http://www.keyorganics.net/',
    catalog: [
      [
        'Molport ID',
        'Supplier',
        'SMILES',
        'Sell Unit',
        'Measure',
        'Price(USD)',
        'Direct Shipping Time(Days)',
        'Direct Shipping Price(USD)',
      ],
      [
        'Molport-000-000-998',
        'BIONET - Key Organics Ltd.',
        'Nc1cccnc1C(O)=O',
        '6',
        'g',
        '35',
        '6',
        '100',
      ],
    ],
  },
  {
    name: 'AnalytiCon Discovery',
    country: 'Germany',
    website: 'http://www.ac-discovery.com/',
    catalog: [
      [
        'Molport ID',
        'Supplier',
        'SMILES',
        'Sell Unit',
        'Measure',
        'Price(USD)',
        'Direct Shipping Time(Days)',
        'Direct Shipping Price(USD)',
      ],
      [
        'Molport-000-000-997',
        'AnalytiCon Discovery',
        'Nc1cccnc1C(O)=O',
        '6',
        'g',
        '35',
        '6',
        '100',
      ],
    ],
  },
];

export default initialSuppliers;
