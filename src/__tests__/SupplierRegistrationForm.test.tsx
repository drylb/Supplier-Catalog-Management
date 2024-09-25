import { render, screen, fireEvent } from '@testing-library/react';
import SupplierRegistrationForm from '../components/SupplierRegistrationForm';

describe('SupplierRegistrationForm', () => {
  it('renders the component with initial state', () => {
    render(<SupplierRegistrationForm />);

    const [label, option] = screen.getAllByText(/Select Supplier/i);
    expect(label).toBeInTheDocument();
    expect(option).toBeInTheDocument();

    expect(screen.getByLabelText(/Upload Catalog/i)).toBeInTheDocument();

    expect(screen.getByText(/Supplier Catalog Management/i)).toBeInTheDocument();
  });

  it('updates the supplier when a selection is made', () => {
    render(<SupplierRegistrationForm />);

    const supplierDropdown = screen.getByLabelText(/Select Supplier/i);

    fireEvent.change(supplierDropdown, { target: { value: 'ChemDiv, Inc.' } });

    expect(supplierDropdown).toHaveValue('ChemDiv, Inc.');
    expect(screen.getByText(/Catalog Data for: ChemDiv, Inc./i)).toBeInTheDocument();
  });

  it('renders the catalog table for the selected supplier', () => {
    render(<SupplierRegistrationForm />);

    const supplierDropdown = screen.getByLabelText(/Select Supplier/i);

    fireEvent.change(supplierDropdown, { target: { value: 'ChemDiv, Inc.' } });

    expect(screen.getByText(/Molport ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Sell Unit/i)).toBeInTheDocument();
    expect(screen.getByText(/SMILES/i)).toBeInTheDocument();
    expect(screen.getByText(/Molport-000-000-299/i)).toBeInTheDocument();
  });
});
