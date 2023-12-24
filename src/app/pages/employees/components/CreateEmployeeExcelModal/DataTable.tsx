import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  InputAdornment,
  TableSortLabel,
  TableContainer,
  TablePagination, 
} from '@mui/material';
import { Height, Search } from '@mui/icons-material';
import { ExcelData } from './CreateEmployeeExcelModal';
import { KTSVG } from '../../../../../_metronic/helpers';

interface DataTableProps {
  excelData: ExcelData[];
  handleSave: () => void;
  title: string;
  setExcelData: (excelData: ExcelData[]) => void;
  inlineEditing?: boolean; 
}

const DataTable: React.FC<DataTableProps> = ({
  excelData,
  handleSave,
  title,
  setExcelData,
  inlineEditing = false, 
}) => {
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (key: string) => {
    if (key === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const handleCellEditLocal = (rowIndex: number, key: string, value: string) => {
    const updatedData = excelData.map((row, index) =>
      index === rowIndex ? { ...row, [key]: value } : row
    );
    setExcelData(updatedData);
  };

  const handleEditClick = (rowIndex: number, key: string) => {
    // Düzenleme işlemini başlatmak için çağrılır
    // Burada istediğiniz düzenleme işlemlerini gerçekleştirebilirsiniz
  };

  const sortedData = excelData.slice().sort((a, b) => {
    const aValue = String(a[sortBy]);
    const bValue = String(b[sortBy]);
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const filteredData = sortedData.filter((row) => {
    const searchValue = searchText.toLowerCase();
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchValue)
    );
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageData = filteredData.slice(startIndex, endIndex);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px',
        }}
      >
        <h2>{title}</h2>
        <TextField
          label="Ara"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(excelData[0]).map((key) => (
                <TableCell key={key}>
                  <TableSortLabel
                    active={key === sortBy}
                    direction={key === sortBy ? sortDirection : 'asc'}
                    onClick={() => handleSort(key)}
                  >
                    {key}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.keys(row).map((key) => (
                  <TableCell key={key}>
                    {inlineEditing ? (
                      <EditableTextField
                        value={String(row[key])}
                        onSave={(value) => handleCellEditLocal(rowIndex, key, value)}
                      />
                    ) : (
                      <span onClick={() => inlineEditing && handleEditClick(rowIndex, key)}>
                        {row[key]}
                      </span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 2, 5, 10]} 
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

interface EditableTextFieldProps {
  value: string;
  onSave: (value: string) => void;
}

const EditableTextField: React.FC<EditableTextFieldProps> = ({ value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedValue(value);
  };

  const handleSaveClick = () => {
    onSave(editedValue);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <div className='form-control form-control-sm form-control-solid d-flex justify-content-between align-items-center'>
            <input
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onClick={handleEditClick}
              style={{ border: 'none', backgroundColor: '#f5f8fa' }}
              onFocus={(e) => {
                e.target.style.outline = 'none';
              }}
            />
            <span onClick={handleSaveClick}>
              <KTSVG path={"/media/icons/duotune/arrows/arr085.svg"} className='svg-icon-2' />
            </span>
          </div>
        </>
      ) : (
        <>
          <span onClick={handleEditClick}>{value}</span>
        </>
      )}
    </div>
  );
};

export default DataTable;
