export type commonProps = {
  alt: string;
  layout: "fill" | "fixed";
  width: number;
  height: number | undefined;
//   objectFit: 'ObjectFit' | undefined;
  priority: boolean | undefined;
  onError: (e: any) => void;
};
