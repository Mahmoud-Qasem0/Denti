import Image from "next/image";
import { FC, JSX } from "react";

const ToothIcon: FC = (): JSX.Element => {
  return (
    <div className="lg:flex hidden items-center justify-center size-32 bg-linear-to-br from-primary/20 to-primary/10 rounded-full ">
      <Image
        src="/logo.png"
        alt="DentWise"
        width={64}
        height={64}
        className="w-16 h-16"
      />
    </div>
  );
};
export default ToothIcon;
