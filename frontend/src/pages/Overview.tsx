import { useState } from "react";
import { useGetLeadsQuery } from "../store/apiSlice";
import LeadTable from "../components/overview/LeadTable";
import AddLeadModal from "../components/overview/AddLeadModal";
import {
  PlusIcon,
  FilterIcon,
  RefreshIcon,
  InactiveIcon,
} from "../components/icons";
import { Select } from "../components/Select";
import { Button } from "../components/Button";

export default function Overview() {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [showAdd, setShowAdd] = useState(false);

  const { data: leads, isLoading, isError, refetch } = useGetLeadsQuery(status);

  const statusOptions = [
    { value: "", label: "All Leads" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leads Overview</h1>
            <p className="text-gray-600 mt-2">
              Manage and track your sales leads effectively.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="flex items-center gap-2"
            >
              <RefreshIcon className="w-4 h-4" />
              Refresh
            </Button>
            <Button
              onClick={() => setShowAdd(true)}
              className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              <PlusIcon className="w-5 h-5" />
              Add New
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">All Leads</h2>
              <p className="text-gray-600 text-sm mt-1">
                {leads?.length || 0} leads found
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <div className="flex items-center gap-2 text-gray-600">
                <FilterIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              <Select
                options={statusOptions}
                value={status || ""}
                onChange={(e) => setStatus(e.target.value || undefined)}
                className="min-w-[150px]"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
              <span>Loading leads...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="bg-red-50 rounded-full p-3 mb-4">
              <InactiveIcon className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Failed to load leads
            </h3>
            <p className="text-gray-600 mb-4">
              There was an error loading your leads. Please try again.
            </p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshIcon className="w-4 h-4" />
              Retry
            </Button>
          </div>
        )}

        {/* Table */}
        {!isLoading && !isError && leads && <LeadTable leads={leads} />}
      </div>

      <AddLeadModal open={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}

