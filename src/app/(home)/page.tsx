"use client";

import {
  Activity,
  Mail,
  MapPin,
  Phone,
  User,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import data from "../../../MOCK_DATA.json";
import { SearchBar } from "@/components/SearchBar";
import { SortAgeAndName } from "@/components/Sort";
import { FilterMedical } from "@/components/FilterMedical";
import { Pagination } from "@/components/Pagination";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"name" | "age" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const itemsPerPage = 20;

  // Array of unique medical issues
  const medicalIssues = Array.from(
    new Set(data.map((item) => item.medical_issue))
  );

  // Filter and sort patients
  const filteredProjects = data
    .filter((item) => {
      const matchesSearch =
        item.patient_name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        (item.contact?.[0]?.email?.toLowerCase() || "").startsWith(
          searchTerm.toLowerCase()
        );

      const matchesIssue =
        selectedIssues.length === 0 ||
        selectedIssues.includes(item.medical_issue);

      return matchesSearch && matchesIssue;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.patient_name.localeCompare(b.patient_name);
      } else if (sortBy === "age") {
        comparison = a.age - b.age;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Calculate pagination using filtered results
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedIssues]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field as "name" | "age");
      setSortOrder("asc");
    }
  };

  const handleIssueFilter = (issue: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue]
    );
  };

  const clearAllFilters = () => {
    setSelectedIssues([]);
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Patient Directory
            </h1>
            <p className="text-sm text-gray-500">
              {filteredProjects.length} patients found
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Active Filters: {selectedIssues.length}</span>
            </div>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name or email..."
            />

            <SortAgeAndName
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              options={[
                { value: "name", label: "Name" },
                { value: "age", label: "Age" },
              ]}
            />
          </div>

          <FilterMedical
            options={medicalIssues}
            selected={selectedIssues}
            onToggle={handleIssueFilter}
            onClearAll={clearAllFilters}
            label="Filter by Medical Issue:"
          />
        </div>
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {paginatedProjects.map((item) => (
          <div
            key={item.patient_id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="bg-blue-50 p-4 flex items-center space-x-4">
              {item.photo_url ? (
                <img
                  src={item.photo_url}
                  alt={item.patient_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <div>
                <h3 className="font-medium text-gray-900">
                  {item.patient_name}
                </h3>
                <p className="text-sm text-gray-500">ID. - {item.patient_id}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Activity className="h-4 w-4 mr-2 text-red-500" />
                <span className="font-medium">{item.medical_issue}</span>
              </div>

              <div className="text-sm text-gray-500 mb-1">
                <div className="flex items-start mt-3">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                  <span>{item.contact[0].address || "N/A"}</span>
                </div>

                <div className="flex items-center mt-2">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
                  <span>{item.contact[0].number || "N/A"}</span>
                </div>

                <div className="flex items-center mt-2">
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
                  <span className="truncate">
                    {item.contact[0].email || "N/A"}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center">
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  Age: {item.age}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* No results */}
      {paginatedProjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">
            No patients match your search criteria
          </p>
        </div>
      )}
    </div>
  );
}
