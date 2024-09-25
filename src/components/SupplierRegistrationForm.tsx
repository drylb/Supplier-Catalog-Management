import React, { useState, ChangeEvent, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Container, Form, Table } from 'react-bootstrap';
import { ISupplier, CatalogRowType } from '../types';
import { uniqueId } from 'lodash';
import initialSuppliers from '../state/initialSuppliers';

const SupplierRegistrationForm: React.FC = () => {
  const [suppliers, setSuppliers] = useState<ISupplier[]>(initialSuppliers);
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSupplierChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSupplier = event.target.value;
    setSelectedSupplier(newSupplier);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file && selectedSupplier) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer);
        const binaryString = data.reduce((acc, byte) => acc + String.fromCharCode(byte), '');

        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData: CatalogRowType[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log({ workbook, sheetName, sheet, jsonData });
        const updatedSuppliers = suppliers.map((supplier) =>
          supplier.name === selectedSupplier
            ? { ...supplier, catalog: [...jsonData, ...supplier.catalog.slice(1)] }
            : supplier
        );

        setSuppliers(updatedSuppliers);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const supplier = suppliers.find((sup) => sup.name === selectedSupplier);

  const renderCatalogTable = () => {
    if (!selectedSupplier) return <p>Please select a supplier to view their catalog.</p>;

    const catalogToDisplay = supplier?.catalog || [];

    if (catalogToDisplay.length === 0) {
      return <p>No catalog available for this supplier.</p>;
    }

    return (
      <Table striped="columns" bordered hover>
        <thead>
          <tr>
            {catalogToDisplay[0].map((header) => (
              <th key={uniqueId()}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {catalogToDisplay.slice(1).map((row) => (
            <tr key={uniqueId()}>
              {row.map((cell) => (
                <td key={uniqueId()}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Container>
      <h2 className="my-4">Supplier Catalog Management</h2>

      <Form.Group controlId="options" className="mb-3">
        <Form.Label>Select Supplier</Form.Label>
        <Form.Control
          name="options"
          as="select"
          value={selectedSupplier}
          onChange={handleSupplierChange}
        >
          <option value="">Select Supplier</option>
          {suppliers.map(({ name }) => (
            <option key={uniqueId()} value={name}>
              {name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="uploadCatalog" className="mb-3">
        <Form.Label>Upload Catalog</Form.Label>
        <Form.Control
          name="uploadCatalog"
          ref={fileInputRef}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
      </Form.Group>

      <h4>Catalog Data for: {supplier?.name ?? 'Not Selected'}</h4>
      {supplier?.country && <p>Supplier Country: {supplier?.country}</p>}
      {supplier?.website && (
        <p>
          Supplier Website: <a href={supplier?.website}>{supplier?.website}</a>
        </p>
      )}

      {renderCatalogTable()}
    </Container>
  );
};

export default SupplierRegistrationForm;
