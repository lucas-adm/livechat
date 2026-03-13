import Image, { ImageProps } from 'next/image';

type Props = ImageProps & {
  size?: number;
};

export const Photo = ({ alt, size, ...rest }: Props) => (
  <figure
    style={{ width: size, height: size }}
    className="overflow-hidden select-none pointer-events-none relative rounded-full flex-none"
  >
    <Image
      alt={alt}
      width={size}
      height={size}
      className="w-full h-full object-cover object-center"
      {...rest}
    />
  </figure>
);
