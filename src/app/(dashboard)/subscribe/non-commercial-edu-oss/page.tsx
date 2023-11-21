import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardHeader } from '@xyflow/xy-ui';

import SignUp from './signup';

const SignUpEduPage = () => {
  return (
    <div className="max-w-2xl">
      <DashboardHeader
        title="Access Pro Examples for Non-Commercial Projects"
        description="We support educational and non-commercial open source projects by providing free access to our pro examples. Fill out the form below to get access for your project."
      />
      <Card className="max-w-xl">
        <CardHeader>
          <SignUp />
        </CardHeader>
      </Card>
    </div>
  );
};

export default SignUpEduPage;
