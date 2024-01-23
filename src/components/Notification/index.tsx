import { Button, cn } from '@xyflow/xy-ui';

type NotificationProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  button?: { label: string; href: string };
} & React.HTMLAttributes<HTMLDivElement>;

const blue = 'bg-blue-50 text-blue-500 border-none';
const blueBtn = 'bg-blue-500 hover:bg-blue-600';

// @todo maybe move this into ui package
export default function Notification({ title, description, button, className, ...rest }: NotificationProps) {
  return (
    <div
      className={cn(
        'bg-pink-50 text-react p-5 rounded-3xl flex justify-between items-center',
        // blue,
        className
      )}
      {...rest}
    >
      <div>
        {title && <div className="font-black">{title}</div>}
        {description && <div>{description}</div>}
      </div>
      {button && (
        <a href={button.href}>
          <Button variant="react">{button.label}</Button>
        </a>
      )}
    </div>
  );
}
