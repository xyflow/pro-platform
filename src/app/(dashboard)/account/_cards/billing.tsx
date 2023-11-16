import { Card, CardHeader, CardDescription, CardTitle, CardFooter, Button, Input, InputLabel } from '@xyflow/xy-ui';
import CustomerPortalButton from '@/components/CustomerPortalButton';

function BillingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Subscription</CardTitle>
        <CardDescription>
          We use Stripe to manage your subscription. Please open the customer portal to get access to your billing{' '}
        </CardDescription>
      </CardHeader>
      <CardFooter className="bg-muted">
        <CustomerPortalButton variant="react">Open Customer Portal</CustomerPortalButton>
      </CardFooter>
    </Card>
  );
}

export default BillingCard;
