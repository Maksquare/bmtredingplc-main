"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import {
  HardDrive,
  Upload,
  Search,
  Filter,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  FileText,
  FileCode,
  Image as ImageIcon,
  FolderOpen,
  Plus,
  X,
  AlertCircle,
  Eye,
  Layers,
} from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { MediaAsset } from "@/types";

type FolderFilter = "all" | "products" | "gallery" | "specs" | "brand" | "general";

function formatBytes(bytes?: number): string {
  if (!bytes || bytes === 0) return "—";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export default function MediaAdminPage() {
  const { media, addMediaAsset, deleteMediaAsset } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState<FolderFilter>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadFolder, setUploadFolder] = useState<MediaAsset["folder"]>("products");
  const [urlInput, setUrlInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Copy feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Preview modal
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);

  const filteredMedia = media.filter((item) => {
    const matchesSearch =
      item.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.file_url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = activeFolder === "all" || item.folder === activeFolder;
    return matchesSearch && matchesFolder;
  });

  const totalBytes = media.reduce((acc, item) => acc + (item.file_size_bytes || 0), 0);
  const imageCount = media.filter((m) => m.mime_type?.startsWith("image")).length;
  const docCount = media.filter((m) => m.mime_type?.includes("pdf")).length;

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    if (uploadMode === "file") {
      if (!selectedFile) {
        setUploadError("Please select a file to upload.");
        return;
      }

      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("folder", uploadFolder);

        const res = await fetch("/api/uploads", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Upload failed");
        }

        if (data.asset) {
          addMediaAsset(data.asset);
        }
        setIsUploadModalOpen(false);
        setSelectedFile(null);
      } catch (err: any) {
        console.warn("Server upload failed, creating local asset:", err);
        // Fallback: create object URL or direct entry
        const fallbackAsset: Omit<MediaAsset, "id" | "created_at"> = {
          file_name: selectedFile.name,
          file_url: URL.createObjectURL(selectedFile),
          file_size_bytes: selectedFile.size,
          mime_type: selectedFile.type,
          folder: uploadFolder,
        };
        addMediaAsset(fallbackAsset);
        setIsUploadModalOpen(false);
        setSelectedFile(null);
      } finally {
        setIsUploading(false);
      }
    } else {
      // Remote URL Mode
      if (!urlInput.trim()) {
        setUploadError("Please enter a valid asset URL.");
        return;
      }

      const fileName = nameInput.trim() || urlInput.split("/").pop() || "asset";
      const isPdf = urlInput.toLowerCase().endsWith(".pdf");

      addMediaAsset({
        file_name: fileName,
        file_url: urlInput.trim(),
        file_size_bytes: isPdf ? 512000 : 1200000,
        mime_type: isPdf ? "application/pdf" : "image/jpeg",
        folder: uploadFolder,
      });

      setIsUploadModalOpen(false);
      setUrlInput("");
      setNameInput("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
            Media & Asset Library
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Store and manage product photographs, BS 1088 spec sheet PDFs, jobsite gallery images, and vector assets.
          </p>
        </div>
        <button
          onClick={() => {
            setUploadError(null);
            setIsUploadModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#C8832A] text-white text-sm font-semibold hover:bg-[#B37220] transition-colors shadow-sm active:scale-95"
        >
          <Upload className="w-4 h-4" />
          Upload Asset
        </button>
      </div>

      {/* KPI Overview Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-xs">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Total Files</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{media.length}</p>
          <p className="text-xs text-neutral-400 mt-0.5">Stored in library</p>
        </div>
        <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-xs">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Total Storage</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{formatBytes(totalBytes)}</p>
          <p className="text-xs text-neutral-400 mt-0.5">Optimized CDN & Local</p>
        </div>
        <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-xs">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Image Assets</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{imageCount}</p>
          <p className="text-xs text-neutral-400 mt-0.5">WEBP, JPG, PNG</p>
        </div>
        <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-xs">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">PDF & Specs</p>
          <p className="text-2xl font-bold text-[#C8832A] mt-1">{docCount}</p>
          <p className="text-xs text-neutral-400 mt-0.5">Certificates & Datasheets</p>
        </div>
      </div>

      {/* Search & Folder Filters */}
      <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by filename or asset URL..."
              className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
            />
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs text-neutral-500 hidden sm:inline">View:</span>
            <div className="inline-flex rounded-lg border border-neutral-200 p-0.5 bg-neutral-100">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-neutral-900 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  viewMode === "table"
                    ? "bg-white text-neutral-900 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Folder Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-neutral-500 font-medium whitespace-nowrap flex items-center gap-1 mr-1">
            <FolderOpen className="w-3.5 h-3.5 text-neutral-400" /> Folder:
          </span>
          {[
            { id: "all", label: "All Assets", count: media.length },
            { id: "products", label: "Products", count: media.filter((m) => m.folder === "products").length },
            { id: "gallery", label: "Jobsite Gallery", count: media.filter((m) => m.folder === "gallery").length },
            { id: "specs", label: "Spec Sheets & PDFs", count: media.filter((m) => m.folder === "specs").length },
            { id: "brand", label: "Brand & Logos", count: media.filter((m) => m.folder === "brand").length },
            { id: "general", label: "General", count: media.filter((m) => m.folder === "general").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFolder(tab.id as FolderFilter)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeFolder === tab.id
                  ? "bg-[#C8832A] text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeFolder === tab.id ? "bg-black/20 text-white" : "bg-neutral-200 text-neutral-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Media Content Display */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-xl border border-neutral-200">
          <HardDrive className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-neutral-900">No media assets found</h3>
          <p className="text-sm text-neutral-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No files match "${searchQuery}". Try clearing search filters.`
              : "No assets found in this folder. Upload photos or spec sheet PDFs to get started."}
          </p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Upload File
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((asset) => {
            const isImage = asset.mime_type?.startsWith("image");
            const isPdf = asset.mime_type?.includes("pdf") || asset.file_name.toLowerCase().endsWith(".pdf");

            return (
              <div
                key={asset.id}
                className="group relative bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-4/3 w-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                  {isImage ? (
                    <img
                      src={asset.file_url}
                      alt={asset.file_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=600&auto=format&fit=crop";
                      }}
                    />
                  ) : isPdf ? (
                    <div className="flex flex-col items-center justify-center gap-2 text-rose-600 p-4">
                      <FileText className="w-12 h-12" />
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        PDF Spec Sheet
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-neutral-400 p-4">
                      <FileCode className="w-12 h-12" />
                      <span className="text-xs uppercase">{asset.mime_type || "Asset"}</span>
                    </div>
                  )}

                  {/* Folder Tag Badge */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white">
                    {asset.folder}
                  </span>

                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      onClick={() => setPreviewAsset(asset)}
                      title="Preview Asset"
                      className="p-2 rounded-lg bg-white/90 text-neutral-800 hover:bg-white hover:text-black transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={asset.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in new tab"
                      className="p-2 rounded-lg bg-white/90 text-neutral-800 hover:bg-white hover:text-black transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* File Details & Quick Actions */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      className="text-xs font-semibold text-neutral-900 truncate"
                      title={asset.file_name}
                    >
                      {asset.file_name}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-1">
                      <span>{formatBytes(asset.file_size_bytes)}</span>
                      <span>{new Date(asset.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-1">
                    <button
                      onClick={() => handleCopyUrl(asset.file_url, asset.id)}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                        copiedId === asset.id
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
                      }`}
                    >
                      {copiedId === asset.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete asset "${asset.file_name}" from library?`)) {
                          deleteMediaAsset(asset.id);
                        }
                      }}
                      title="Delete asset"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">File Name</th>
                  <th className="py-3 px-4">Folder</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredMedia.map((asset) => {
                  const isImage = asset.mime_type?.startsWith("image");
                  return (
                    <tr key={asset.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-2 px-4">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                          {isImage ? (
                            <img
                              src={asset.file_url}
                              alt={asset.file_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FileText className="w-5 h-5 text-rose-500" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-neutral-900 truncate max-w-xs">{asset.file_name}</p>
                        <p className="text-[11px] text-neutral-400 truncate max-w-xs">{asset.file_url}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 border border-neutral-200">
                          {asset.folder}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-600">{formatBytes(asset.file_size_bytes)}</td>
                      <td className="py-3 px-4 text-neutral-500">
                        {new Date(asset.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopyUrl(asset.file_url, asset.id)}
                            className={`p-1.5 rounded-lg border text-xs transition-colors ${
                              copiedId === asset.id
                                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                            }`}
                            title="Copy public URL"
                          >
                            {copiedId === asset.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <a
                            href={asset.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors"
                            title="View asset in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => {
                              if (confirm(`Delete asset "${asset.file_name}" from library?`)) {
                                deleteMediaAsset(asset.id);
                              }
                            }}
                            className="p-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-lg font-bold text-neutral-900 font-display">Add Asset to Media Library</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Mode Selector */}
            <div className="grid grid-cols-2 p-1 bg-neutral-100 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setUploadMode("file")}
                className={`py-1.5 rounded-md transition-colors ${
                  uploadMode === "file" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
                }`}
              >
                Local File Upload
              </button>
              <button
                type="button"
                onClick={() => setUploadMode("url")}
                className={`py-1.5 rounded-md transition-colors ${
                  uploadMode === "url" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
                }`}
              >
                Register Public URL
              </button>
            </div>

            <form onSubmit={handleFileUpload} className="space-y-4">
              {/* Destination Folder */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Destination Folder
                </label>
                <select
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value as MediaAsset["folder"])}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                >
                  <option value="products">Products (Plywood & Timber specs)</option>
                  <option value="gallery">Project Gallery (Jobsite photos)</option>
                  <option value="specs">Spec Sheets & Certificates (PDF)</option>
                  <option value="brand">Brand Assets & Logos</option>
                  <option value="general">General Assets</option>
                </select>
              </div>

              {uploadMode === "file" ? (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Select File
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-[#C8832A] transition-colors bg-neutral-50/50">
                    <input
                      type="file"
                      id="media-file-input"
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="media-file-input"
                      className="cursor-pointer flex flex-col items-center justify-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-[#C8832A]" />
                      <span className="text-sm font-semibold text-neutral-800">
                        {selectedFile ? selectedFile.name : "Click to select or drag and drop"}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {selectedFile
                          ? `${formatBytes(selectedFile.size)} • ${selectedFile.type || "file"}`
                          : "Supports JPG, PNG, WEBP, AVIF, SVG, PDF up to 25MB"}
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      File Display Name
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. proform-dynea-18mm-site-pour.jpg"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Asset URL
                    </label>
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/... or CDN link"
                      required
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 rounded-lg bg-[#C8832A] text-white text-sm font-semibold hover:bg-[#B37220] transition-colors disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Save to Media Library"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="truncate pr-4">
                <h3 className="text-base font-bold text-neutral-900 truncate">{previewAsset.file_name}</h3>
                <p className="text-xs text-neutral-500">
                  {formatBytes(previewAsset.file_size_bytes)} • Folder: {previewAsset.folder}
                </p>
              </div>
              <button
                onClick={() => setPreviewAsset(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-16/10 w-full bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center">
              {previewAsset.mime_type?.startsWith("image") ? (
                <img
                  src={previewAsset.file_url}
                  alt={previewAsset.file_name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-6 space-y-3">
                  <FileText className="w-16 h-16 text-rose-500 mx-auto" />
                  <p className="text-sm font-semibold text-neutral-800">PDF Technical Document</p>
                  <a
                    href={previewAsset.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open PDF in Full Tab
                  </a>
                </div>
              )}
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between gap-3 text-xs">
              <span className="font-mono text-neutral-600 truncate flex-1">{previewAsset.file_url}</span>
              <button
                onClick={() => handleCopyUrl(previewAsset.file_url, previewAsset.id)}
                className="px-3 py-1.5 rounded-md bg-white border border-neutral-300 font-medium text-neutral-700 hover:bg-neutral-100 shrink-0"
              >
                {copiedId === previewAsset.id ? "Copied!" : "Copy URL"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

