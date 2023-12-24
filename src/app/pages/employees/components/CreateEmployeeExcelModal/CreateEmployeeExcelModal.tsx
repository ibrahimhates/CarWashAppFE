import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import * as XLSX from 'xlsx';
import HttpService from '../../../../services/HttpService';
import Cookies from 'js-cookie';
import DataTable from './DataTable';

export interface ExcelData {
    [key: string]: string | boolean;
}

interface EditableCellProps {
    value: string | boolean;
    onEdit: (editedValue: string | boolean) => void;
}

type Props = {
    show: boolean;
    handleClose: () => void;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const EditableCell: React.FC<EditableCellProps> = ({ value, onEdit }) => {
    const [editing, setEditing] = useState(false);
    const [editedValue, setEditedValue] = useState<string | boolean>(value);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue(e.target.value);
    };

    const handleBlur = () => {
        onEdit(editedValue);
        setEditing(false);
    };

    return editing ? (
        <input
            type='text'
            value={typeof editedValue === 'boolean' ? editedValue.toString() : editedValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus
        />
    ) : (
        <div onClick={() => setEditing(true)}>{value}</div>
    );
};

const CreateEmployeeExcelModal: React.FC<Props> = ({ show, handleClose }) => {
    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [excelData, setExcelData] = useState<Array<ExcelData> | null>(null);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setExcelFile(selectedFile);
            setExcelData(null);

            try {
                const arrayBuffer = await selectedFile.arrayBuffer();
                const data = new Uint8Array(arrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];
                const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
                const headerRow = parsedData[0];
                const formattedData = parsedData.slice(1).map((row) =>
                    row.reduce((acc: ExcelData, cell: boolean | string, index: number) => {
                        cell = typeof cell === 'number' ? `${cell}` : cell;
                        cell = typeof cell === 'string' ? cell.trim() : cell;
                        cell = cell === 'true' ? true : cell === 'false' ? false : cell;

                        acc[headerRow[index]] = cell;
                        return acc;
                    }, {})
                );
                setExcelData(formattedData);
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    };

    const handleCellEdit = (rowIndex: number, key: string, value: string | boolean) => {
        const updatedData = [...(excelData || [])];
        updatedData[rowIndex][key] = value;
        setExcelData(updatedData);
    };

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        console.log(excelData);
        setLoading(true);
        HttpService.post('Auth/registermultiple', excelData, Cookies.get('authToken'))
            .then((res) => {
                console.log(res);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const downloadExampleExcel = () => {
        const exampleData = [
            // Define your example data here in the same format as your excelData.
            // This is just a placeholder, you should replace it with actual data.
            { Name: 'John', Age: 30, Email: 'john@example.com' },
            { Name: 'Alice', Age: 25, Email: 'alice@example.com' },
            // Add more rows as needed
        ];

        const ws = XLSX.utils.json_to_sheet(exampleData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'ExampleSheet');
        XLSX.writeFile(wb, 'example.xlsx'); // This will trigger the download with the given file name.
    };

    const [fullscreen, setFullscreen] = useState(false);

    return createPortal(
        <Modal
            id='create_employee_excel_modal'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered'
            show={show}
            onHide={handleClose}
            backdrop={true}
            size='xl'
            scrollable={true}
            fullscreen={fullscreen ? true : undefined}
        >
            <div className='modal-header'>
                <h2>Excel İle Çalışan Ekle</h2>
                <div className=' p-3'>
                    <button
                        type='button'
                        className='btn btn-primary me-5'
                        onClick={downloadExampleExcel}
                    >
                        Örnek Excel İndir
                    </button>
                    <button type='button' className='btn btn-primary' onClick={() => setFullscreen(!fullscreen)}>
                        {fullscreen ? 'Tam Ekran Kapat' : 'Tam Ekran Aç'}
                    </button>
                </div>

            </div>
            <div className='modal-body'>
                <form className='form-group custom-form'>
                    <input type='file' className='form-control' required onChange={handleFile} />
                </form>

                {excelData?.length && (
                    <div className='border rounded p-4 mt-5'>
                        <div className='card-body py-3'>
                            {/* Add the download button here */}


                            <DataTable
                                excelData={excelData}
                                handleSave={handleSave}
                                title={'Çalışanlar'}
                                setExcelData={setExcelData}
                                inlineEditing={true}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className='modal-footer'>
                <button type='button' className='btn btn-danger' onClick={handleClose}>
                    İptal
                </button>



                <button type='button' className='btn btn-primary' disabled={loading} onClick={handleSave}>
                    {loading ? (
                        <span>
                            Oluşturuluyor... <i className="spinner-border spinner-border-sm ms-2"></i>
                        </span>
                    ) : (
                        'Oluştur'
                    )}
                </button>
            </div>
        </Modal>,
        modalsRoot
    );
};

export { CreateEmployeeExcelModal };
