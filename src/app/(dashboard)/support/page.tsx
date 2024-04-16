import DashboardHeader from '@/components/DashboardHeader';
import SubscriptionFeature from '@/components/SubscriptionFeature';
import { SubscriptionPlan } from '@/types';

const SupportPage = () => {
  return (
    <div>
      <DashboardHeader
        title="Support"
        description="The xyflow team is based in Europe and offers individual support for subscribers to the Professional and Enterprise plans. You can expect an answer from us within 24 hours during working days."
      />
      <div className="text-muted-foreground max-w-2xl">
        <div className="text-xl font-black mb-2">How to quickly get support for your problem</div>
        <ul className="list-disc leading-7 pl-4">
          <li>
            If possible, please include a codesandbox that we can access and that reproduces your issue. You can use our
            codesandbox starters (JS, TS).
          </li>
          <li>
            The best way to contact us is via email. This channel is only available for Professional and Enterprise
            subscribers.
          </li>
          <li>
            Please write the email from the account that you are subscribed with or reference it so that we can check
            your subscription status.
          </li>
        </ul>
      </div>
      <div className="flex-1 space-y-7 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          <SubscriptionFeature
            title="Discord"
            description="Free for all support from the community. Please use the email support if you are a Professional or Enterprise subscriber."
            plans={[
              SubscriptionPlan.FREE,
              SubscriptionPlan.STARTER,
              SubscriptionPlan.PRO,
              SubscriptionPlan.ENTERPRISE,
              SubscriptionPlan.STUDENT,
              SubscriptionPlan.OSS,
            ]}
            button={{ label: 'Launch Discord', href: 'https://discord.gg/RVmnytFmGW' }}
          />
          <SubscriptionFeature
            title="Email"
            description="Subscribers to the Professional and Enterprise plan have one hour of individual support included."
            plans={[SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
            button={{ label: 'Contact Support', href: 'mailto:support@xyflow.com' }}
          />
          <SubscriptionFeature
            title="Video Call"
            description="Enterprise subscribers can schedule a video call with our team to get 1:1 support."
            plans={[SubscriptionPlan.ENTERPRISE]}
            button={{ label: 'Schedule Call', href: 'https://cal.com/team/react-flow' }}
          />
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
