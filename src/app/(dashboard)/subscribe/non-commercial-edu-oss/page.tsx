import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardHeader } from '@xyflow/xy-ui';

import SignUp from './signup';

const SignUpEduPage = () => {
  return (
    <div className="max-w-2xl">
      <DashboardHeader
        title="Access Pro Examples for non-commercial Projects"
        description="We want to support educational and non-commercial open source projects by providing free access to our paid examples. To get access for your project, please fill out the form below."
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
