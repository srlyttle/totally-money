import { HelpCircle } from "lucide-react";

interface FooterMessageProps {
  title: string;
  description: string;
  showIcon?: boolean;
}

export const FooterMessage = ({
  title,
  description,
  showIcon = true,
}: FooterMessageProps) => {
  return (
    <div className="flex items-start gap-3 p-2">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          {showIcon && (
            <HelpCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
          )}
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
