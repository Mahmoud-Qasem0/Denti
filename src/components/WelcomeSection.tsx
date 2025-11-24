import { FC, JSX, ReactNode } from "react";

interface WelcomeSectionProps {
  user?: string;
  badge: string;
  title: string;
  desc: string;
  icon: ReactNode;
  badgeIcon?: ReactNode;
}

const WelcomeSection: FC<WelcomeSectionProps> = ({
  user,
  title,
  badge,
  desc,
  icon,
  badgeIcon,
}): JSX.Element => {
  return (
    <div className="mb-12 flex items-center justify-between bg-linear-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          {badgeIcon ? (
            badgeIcon
          ) : (
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          )}
          <span className="text-sm font-medium text-primary">{badge}</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {title} {user ? user : ""}
          </h1>
          <p className="text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="w-32 h-32 bg-linear-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
