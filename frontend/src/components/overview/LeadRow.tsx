import { Lead } from "../../types/Lead";
import { CheckCircleIcon, ClockIcon, InactiveIcon } from "../icons";

export default function LeadRow({ lead }: { lead: Lead }) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Active":
        return {
          icon: CheckCircleIcon,
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-green-200",
        };
      case "Pending":
        return {
          icon: ClockIcon,
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
          borderColor: "border-yellow-200",
        };
      default:
        return {
          icon: InactiveIcon,
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-gray-200",
        };
    }
  };

  const statusConfig = getStatusConfig(lead.lead_status);
  const StatusIcon = statusConfig.icon;

  return (
    <tr className="hover:bg-gray-50/80 transition-all duration-200 group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform duration-200">
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {lead.name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-medium">{lead.company}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <a
          href={`mailto:${lead.email}`}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-1 group/link"
        >
          {lead.email}
          <svg
            className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor} transition-all duration-200 group-hover:scale-105`}
        >
          <StatusIcon className="w-3 h-3" />
          {lead.lead_status}
        </div>
      </td>
    </tr>
  );
}
