import React, { useEffect, useState } from 'react';
import MainCard from 'renderer/_TEMPLATE/ui-component/cards/MainCard';
import { useInsuranceService } from 'renderer/hooks';
import InsurancesList from './components/InsurancesList';
import { Insurance } from 'shared/database/entities';
import AddInsuranceButton from './components/AddInsuranceButton';
import { trans } from 'renderer/utils/localization';

// ==============================|| SAMPLE PAGE ||============================== //

const InsurancePage: React.FC = (): JSX.Element => {
  const { getAll } = useInsuranceService();
  const [insurances, setInsurances] = useState<Insurance[]>([]);

  const requestData = async () => {
    const data = await getAll();
    setInsurances([...data]);
  };

  useEffect(() => {
    requestData();
  }, []);

  return (
    <>
      <MainCard title={trans("health_Insurances")}>
        <InsurancesList insurances={insurances} onUpdate={requestData} />
      </MainCard>
      <AddInsuranceButton onFormSubmitted={requestData} />
    </>
  );
};

export default InsurancePage;
