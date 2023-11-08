export interface NavLinkProps {
  route: string;
  children: React.ReactNode;
  color?: string;
  large?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<Element>;
  onMouseEnter?: React.MouseEventHandler<Element>;
  onMouseLeave?: React.MouseEventHandler<Element>;
}
