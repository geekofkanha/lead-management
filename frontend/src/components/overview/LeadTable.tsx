import { useState } from "react";
import { Lead } from "../../types/Lead";
import LeadRow from "./LeadRow";
import { UsersIcon } from "../icons";

type SortConfig = {
  key: keyof Lead;
  direction: "asc" | "desc";
};

export default function LeadTable({ leads }: { leads: Lead[] }) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    const aVal = a[key] ?? "";
    const bVal = b[key] ?? "";

    if (typeof aVal === "string" && typeof bVal === "string") {
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  const handleSort = (key: keyof Lead) => {
    if (sortConfig?.key === key) {
      // toggle direction
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  const renderSortIndicator = (key: keyof Lead) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Contact{renderSortIndicator("name")}
            </th>
            <th
              className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("company")}
            >
              Company{renderSortIndicator("company")}
            </th>
            <th
              className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("email")}
            >
              Email{renderSortIndicator("email")}
            </th>
            <th
              className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("lead_status")}
            >
              Status{renderSortIndicator("lead_status")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedLeads.map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {leads.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <UsersIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No leads found
          </h3>
          <p className="text-gray-600">
            Get started by adding your first lead to the system.
          </p>
        </div>
      )}
    </div>
  );
}
