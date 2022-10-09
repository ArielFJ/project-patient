import React, { useEffect, useState } from 'react';
import MainCard from 'renderer/_TEMPLATE/ui-component/cards/MainCard';
import { useInsuranceService } from 'renderer/hooks';
import InsurancesList from './components/InsurancesList';
import { Insurance } from 'shared/database/entities';
import AddInsuranceButton from './components/AddInsuranceButton';

// ==============================|| SAMPLE PAGE ||============================== //

const InsurancePage: React.FC = (): JSX.Element => {
  const { getAll } = useInsuranceService();
  const [insurances, setInsurances] = useState<Insurance[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = await getAll();
      setInsurances([...data]);
    };

    init();
  }, []);

  return (
    <>
      <MainCard title="Insurances">
        <InsurancesList insurances={insurances} />
      </MainCard>
      <AddInsuranceButton onFormSubmitted={console.log} />
    </>
  );
};

export default InsurancePage;
