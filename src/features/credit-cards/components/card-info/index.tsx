import { BadgeCheck, HelpCircle } from "lucide-react";

interface Props {
  title: string;
  detail: string;
  showHelpIcon?: boolean;
  isEligible?: boolean;
}

export const CardInfo = ({
  title,
  detail,
  showHelpIcon = false,
  isEligible = false,
}: Props) => {
  return (
    <div
      className={`  rounded-lg p-4 ${
        isEligible ? "bg-green-100/40" : "bg-gray-200/30"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {isEligible && <BadgeCheck className="w-4 h-4 text-green-800" />}
        <div className=" font-bold text-gray-900">{title}</div>
        {showHelpIcon && <HelpCircle className="w-4 h-4 text-gray-400" />}
      </div>
      <div className="text-sm text-gray-600">{detail}</div>
    </div>
  );
};
