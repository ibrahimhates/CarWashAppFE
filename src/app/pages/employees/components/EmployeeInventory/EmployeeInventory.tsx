// import React, { useState } from 'react';
// import AddInventoryModal from './AddInventoryModal';

// const EmployeeInventory= () => {
//   const [showCreateModal, setShowCreateModal] = useState(false);

//   return (
//     <div className={`card`}>
//       <div className='card-body py-3'>
//         <div className='table-responsive'>
//           <button className='btn btn-primary float-end mb-3' onClick={() => setShowCreateModal(true)}>
//             Yeni Envanter Ekle
//           </button>
//           <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
//             <thead>
//               <tr className='fw-bold text-muted'>
//                 <th className='min-w-150px'>Kategori</th>
//                 <th className='min-w-140px'>Seri Numarası</th>
//                 <th className='min-w-120px'>Veriliş Tarihi</th>
//                 <th className='min-w-120px'>İade Tarihi</th>
//                 <th className='min-w-120px'>Açıklama</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Elektronik</td>
//                 <td>SER123</td>
//                 <td>2023-08-28</td>
//                 <td>2023-09-05</td>
//                 <td>hp marka laptop</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <AddInventoryModal
//         show={showCreateModal}
//         handleClose={() => setShowCreateModal(false)}
//       />
//     </div>
//   );
// };

// export default EmployeeInventory;
import React, { useState, useEffect } from 'react';
import AddInventoryModal from './AddInventoryModal';
import HttpService from '../../../../services/HttpService'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// InventoryItem arayüzü
interface InventoryItem {
  inventoryCategoryId: string;
  categoryName: string;
  serialNumber: string;
  dateOfIssue: string;
  refundDate: string;
  description: string;
}

const EmployeeInventory = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const { id } = useParams();
  useEffect(() => {

    const fetchInventoryData = async () => {
      try {
        const response = await HttpService.get(`Inventory/All/${id}`, Cookies.get('authToken'));
        setInventoryData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Veriler çekilirken bir hata oluştu: ', error);
      }
    };

    fetchInventoryData();
  }, []);

  return (
    <div className={`card`}>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <button className='btn btn-primary float-end mb-3' onClick={() => setShowCreateModal(true)}>
            Yeni Envanter Ekle
          </button>
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-150px'>Kategori</th>
                <th className='min-w-140px'>Seri Numarası</th>
                <th className='min-w-120px'>Veriliş Tarihi</th>
                <th className='min-w-120px'>İade Tarihi</th>
                <th className='min-w-120px'>Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item.inventoryCategoryId}>
                  <td>{item.inventoryCategoryId}</td>{/*categoryName */}
                  <td>{item.serialNumber}</td>
                  <td>{item.dateOfIssue}</td>
                  <td>{item.refundDate}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddInventoryModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default EmployeeInventory;
