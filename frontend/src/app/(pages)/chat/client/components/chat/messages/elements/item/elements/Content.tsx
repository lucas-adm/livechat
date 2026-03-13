import Linkify from 'linkify-react';

type Props = Omit<React.HTMLAttributes<HTMLParagraphElement>, 'content'> & {
  content: string | null;
};

export const Content = ({ content, ...rest }: Props) => {
  if (content)
    return (
      <p
        className="break-all whitespace-pre-line text-xs text-indigo-200"
        {...rest}
      >
        <Linkify
          options={{
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'underline text-indigo-600',
          }}
        >
          {content}
        </Linkify>
      </p>
    );

  return (
    <p className="italic font-medium text-xs text-indigo-200" {...rest}>
      Apagada
    </p>
  );
};
