interface VishnuLogoProps {
  className?: string;
  size?: number;
}

export const VishnuLogo = ({ className = "", size = 24 }: VishnuLogoProps) => {
  return (
    <img 
      src={`${import.meta.env.BASE_URL}ChatGPT_Image_Nov_8__2025__05_56_08_PM-removebg-preview.png`}
      alt="Vishnu AI Logo"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
};
