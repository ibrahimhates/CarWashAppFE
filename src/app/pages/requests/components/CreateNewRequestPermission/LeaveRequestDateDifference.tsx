import moment from 'moment';
import { useEffect, useState } from 'react';
import { IRequestPermissionData } from './CreateNewRequestPermissionModal';
import { useTranslation } from 'react-i18next';

interface LeaveRequestDateDifProps {
  requestData: IRequestPermissionData;
  updateRequestPermissionData: (fieldsToUpdate: Partial<IRequestPermissionData>) => void;
  setValid: (isValid: boolean) => void;
  isValid: boolean;
}



export default function LeaveRequestDateDifference({ setValid, isValid, requestData, updateRequestPermissionData }: LeaveRequestDateDifProps) {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [limit, setLimit] = useState('');

  const { t } = useTranslation();

  function calculateDaysBetween() {
    setValid(true)
    updateRequestPermissionData({ totalDays: 0 });
    if (startDate === '' || endDate === '')
      return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const current = new Date();

    const isBeforeToday = start > current;
    const isBeforeStartDay = start < end;

    if (!isBeforeStartDay || !isBeforeToday)
      return;
    setValid(false)

    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const daysBetween = Math.ceil(timeDiff / (1000 * 3600 * 24));

    updateRequestPermissionData({ totalDays: daysBetween });
  };

  const handleInput = (value: string) => {
    handleSetEndDate(value)
    setStartDate(value)
    updateRequestPermissionData({ startDate: value })
  }

  const handleSetEndDate = (value: string) => {
    const time = new Date(value).getTime();
    const newTime = (time) + (1000 * 3600 * 24);
    const newDate = new Date()
    newDate.setTime(newTime)
    setLimit(newDate.toString())
  }

  useEffect(() => {
    calculateDaysBetween();
  }, [startDate, endDate]);

  return (
    <div>
      <div className='col-md-12'>
        <div className='mb-5'>
          <label className='form-label'>{t("REQUESTPERMISSION.PAGE.CREATE.PERMISSION.STARTDATE")}</label>
          <input
            type='date'
            className='form-control'
            name='StartDate'
            value={moment(startDate).format('YYYY-MM-DD')}
            onChange={(e) => handleInput(e.target.value)}
          />
        </div>
      </div>
      <div className='col-md-12'>
        <div className='mb-5'>
          <label className='form-label'>{t("REQUESTPERMISSION.PAGE.CREATE.PERMISSION.ENDDATE")}</label>
          <input
            type='date'
            className='form-control'
            name='EndDate'
            value={moment(endDate).format('YYYY-MM-DD')}
            min={moment(limit).format('YYYY-MM-DD')}
            onChange={(e) => {
              setEndDate(e.target.value)
              updateRequestPermissionData({ endDate: e.target.value })
            }}
          />
        </div>
      </div>
    </div>
  );
}
