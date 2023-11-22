import Link from 'next/link';
import { Text } from '@xyflow/xy-ui';

const FooterHeading = (props: React.PropsWithChildren) => <div className="my-6 font-bold" {...props} />;

const FooterLink = ({
  isExternal = false,
  href,
  ...rest
}: React.PropsWithChildren & { isExternal?: boolean; href: string }) => (
  <div>{isExternal ? <a href={href} {...rest} /> : <Link href={href} {...rest} />}</div>
);

const categories = [
  {
    title: 'React Flow Pro',
    items: [
      { route: '/', title: 'Dashboard' },
      { route: '/signin', title: 'Sign In' },
      { route: '/signup', title: 'Sign Up' },
      { route: '/reset-password', title: 'Reset Password' },
    ],
  },
  {
    title: 'More Info',
    items: [
      { route: 'https://reactflow.dev/pro', title: 'Pricing' },
      { route: 'https://reactflow.dev/pro/examples', title: 'Pro Examples' },
      { route: 'https://reactflow.dev/pro/case-studies', title: 'Case Studies' },
      { route: 'https://reactflow.dev/pro/enterprise', title: 'Enterprise' },
    ],
  },
  {
    title: 'xyflow',
    items: [
      { route: 'https://xyflow.com/contact', title: 'Contact Us' },
      { route: 'https://xyflow.com/blog', title: 'Blog' },
      { route: 'https://xyflow.com/about', title: 'About' },
      { route: 'https://xyflow.com/open-source', title: 'Open Source' },
    ],
  },
  {
    title: 'Legal',
    items: [
      {
        title: 'Terms of Use',
        route: 'https://xyflow.com/terms-of-use',
      },
      {
        title: 'Ethical Standards',
        route: 'https://xyflow.com/ethical-standards',
      },
      {
        title: 'Privacy Policy',
        route: 'https://xyflow.com/privacy',
      },
      { title: 'Imprint', route: 'https://xyflow.com/imprint' },
    ],
  },
];

export default function Footer({
  message = {
    title: 'A project by the xyflow team',
    text: 'We are building and maintaining open source software for node-based UIs since 2019.',
  },
}) {
  return (
    <footer className="bg-white border-t border-gray-200 print:bg-transparent py-12 lg:py-18">
      <div className="mx-auto lg:flex text-black max-w-7xl px-4">
        <div className="lg:max-w-[300px] md:max-w-[600px] lg:mr-24 shrink-0">
          {message && (
            <>
              <Text variant="light" className="mb-2 text-gray-800">
                {message.title}
              </Text>
              <div className="font-black text-slate-500 text-3xl tracking-tight leading-none mb-6 lg:mb-10">
                {message.text}
              </div>
            </>
          )}
        </div>
        <div className="grow">
          <div className="flex flex-col grow h-[100%]">
            <div className="grid grid-cols-2 lg:grid-cols-4 grid-gap-4">
              {categories.map((category) => (
                <div key={category.title} className="mt-4 lg:mt-0">
                  <Text variant="light" className="text-light mb-2 text-gray-800 font-bold">
                    {category.title}
                  </Text>
                  {category.items.map((item) => (
                    <Link href={item.route} className="text-slate-500 block" key={item.title}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <Text variant="light" className="pt-6 text-sm mt-auto">
              <a href="mailto:info@xyflow.com">info@xyflow.com</a> — Copyright © {new Date().getFullYear()}{' '}
              <a href="https://webkid.io" target="_blank">
                webkid GmbH
              </a>
              . All rights reserved.
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
