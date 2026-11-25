"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  Eye,
  X,
  Layers,
  Star,
  Download,
  AlertCircle,
  AlertTriangle,
  ExternalLink,
  Upload,
  Loader2,
  Check,
  Image as ImageIcon,
  RotateCw,
  FileSpreadsheet,
} from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Product, ProductSpecs } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";

export default function AdminProductsPage({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    undoDeletedProduct,
    undoDeleteProduct,
    media,
    addMediaAsset,
    currentRole,
  } = useAdminData();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Import / Export State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [skuError, setSkuError] = useState<string>("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Image Upload & Gallery State
  const [imageTab, setImageTab] = useState<"upload" | "media" | "url">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category_id: categories[0]?.id || "",
    short_description: "",
    description: "",
    thickness: "18mm",
    standard_size: "1220mm × 2440mm (4ft × 8ft)",
    grade: "Structural & Signature Furniture Grade",
    glue_type: "High-Bond Structural Adhesive",
    core_species: "Cross-Laminated Dense Hardwood",
    surface_finish: "Calibrated Smooth Sanded Face",
    density: "680 – 720 kg/m³",
    moisture_content: "8% – 12%",
    formaldehyde_emission: "E0 / CARB Phase 2",
    applications: "High-Rise Concrete Formwork, Structural Slabs",
    imageUrl: "/images/products/plywood-18mm-special.jpg",
    is_featured: false,
    status: "published" as Product["status"],
  });

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      category_id: categories[0]?.id || "",
      short_description: "",
      description: "",
      thickness: "18mm, 21mm",
      standard_size: "1220mm × 2440mm (4ft × 8ft)",
      grade: "Structural & Signature Furniture Grade",
      glue_type: "High-Bond Structural Adhesive",
      core_species: "Cross-Laminated Dense Hardwood",
      surface_finish: "Calibrated Smooth Sanded Face",
      density: "680 – 720 kg/m³",
      moisture_content: "8% – 12%",
      formaldehyde_emission: "E0 / CARB Phase 2",
      applications: "Concrete Formwork, Heavy Civil Bridge Decks",
      imageUrl: "",
      is_featured: false,
      status: "published",
    });
    setGalleryImages([]);
    setImageTab("upload");
    setUploadError(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      category_id: product.category_id,
      short_description: product.short_description,
      description: product.description,
      thickness: product.specs.thickness,
      standard_size: product.specs.standard_size,
      grade: product.specs.grade,
      glue_type: product.specs.glue_type,
      core_species: product.specs.core_species,
      surface_finish: product.specs.surface_finish,
      density: product.specs.density || "",
      moisture_content: product.specs.moisture_content || "",
      formaldehyde_emission: product.specs.formaldehyde_emission || "",
      applications: product.applications.join(", "),
      imageUrl: product.images[0] || "",
      is_featured: product.is_featured,
      status: product.status,
    });
    setGalleryImages(product.images ? product.images.slice(1) : []);
    setImageTab(product.images[0]?.startsWith("/api/uploads") ? "upload" : "upload");
    setUploadError(null);
    setIsModalOpen(true);
  };

  // Image File Upload Handler
  const handleImageUpload = async (file: File, isSecondaryAngle: boolean = false) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (JPG, PNG, WEBP, AVIF, SVG).");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setUploadError("Image size exceeds 25MB limit.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "products");

      const res = await fetch("/api/uploads", {
        method: "POST",
        body,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      if (data.asset) {
        addMediaAsset(data.asset);
        if (isSecondaryAngle) {
          setGalleryImages((prev) => [...prev, data.asset.file_url]);
        } else {
          setFormData((prev) => ({ ...prev, imageUrl: data.asset.file_url }));
        }
      }
    } catch (err: unknown) {
      console.warn("Server upload failed, using object URL fallback:", err);
      const fallbackUrl = URL.createObjectURL(file);
      addMediaAsset({
        file_name: file.name,
        file_url: fallbackUrl,
        file_size_bytes: file.size,
        mime_type: file.type,
        folder: "products",
      });
      if (isSecondaryAngle) {
        setGalleryImages((prev) => [...prev, fallbackUrl]);
      } else {
        setFormData((prev) => ({ ...prev, imageUrl: fallbackUrl }));
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Submit Handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSkuError("");

    const duplicate = products.find(
      (p) =>
        p.id !== editingProduct?.id &&
        p.name.trim().toLowerCase() === formData.name.trim().toLowerCase()
    );
    if (duplicate) {
      setSkuError(`Duplicate specification title: A product named "${formData.name}" already exists in the catalog.`);
      return;
    }

    const categoryObj = categories.find((c) => c.id === formData.category_id);
    const generatedSlug =
      formData.slug.trim() ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const specs: ProductSpecs = {
      thickness: formData.thickness,
      standard_size: formData.standard_size,
      grade: formData.grade,
      glue_type: formData.glue_type,
      core_species: formData.core_species,
      surface_finish: formData.surface_finish,
      density: formData.density,
      moisture_content: formData.moisture_content,
      formaldehyde_emission: formData.formaldehyde_emission,
    };

    const appsArray = formData.applications
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    const allImages = [formData.imageUrl.trim(), ...galleryImages].filter(Boolean);
    const finalImages =
      allImages.length > 0
        ? allImages
        : ["/images/products/plywood-18mm-special.jpg"];

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        slug: generatedSlug,
        category_id: formData.category_id,
        category_name: categoryObj?.name || "",
        short_description: formData.short_description,
        description: formData.description,
        specs,
        applications: appsArray,
        images: finalImages,
        is_featured: formData.is_featured,
        status: formData.status,
      });
    } else {
      addProduct({
        name: formData.name,
        slug: generatedSlug,
        category_id: formData.category_id,
        category_name: categoryObj?.name || "",
        short_description: formData.short_description,
        description: formData.description,
        specs,
        applications: appsArray,
        images: finalImages,
        is_featured: formData.is_featured,
        status: formData.status,
      });
    }

    setIsModalOpen(false);
  };

  // Bulk Actions
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    selectedIds.forEach((id) => deleteProduct(id));
    setSelectedIds([]);
  };

  const handleBulkStatusChange = (status: Product["status"]) => {
    selectedIds.forEach((id) => updateProduct(id, { status }));
    setSelectedIds([]);
  };

  // Import / Export Simulation
  const handleStartImport = () => {
    setIsImporting(true);
    setImportProgress(10);
    setImportErrors([]);

    const timer = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 90) {
          clearInterval(timer);
          setIsImporting(false);
          setImportErrors([
            "Row 4 (Plywood 16mm): Missing wood core description - default hardwood core applied.",
            "Row 9 (Safarian 06mm): Stock count cannot be negative (-450) - reset to 0 sheets.",
          ]);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const csvContent =
        "data:text/csv;charset=utf-8," +
        ["ID,Name,Category,Grade,Thickness,Stock"]
          .concat(
            products.map(
              (p) =>
                `"${p.id}","${p.name}","${p.category_name}","${p.specs.grade}","${p.specs.thickness}","${p.stock_quantity || 0}"`
            )
          )
          .join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `bmtradingplc_products_export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 800);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specs.grade.toLowerCase().includes(search.toLowerCase()) ||
      p.specs.thickness.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "all" || p.category_id === selectedCategory;

    const matchStatus =
      selectedStatus === "all" || p.status === selectedStatus;

    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader
        title="Products & Specifications CMS"
        subtitle={`Managing ${products.length} industrial timber and engineered plywood products`}
        onOpenSidebar={onOpenSidebar || (() => {})}
        action={
          <Button
            variant="amber"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleOpenCreate}
            className="font-bold text-xs"
          >
            New Product Spec
          </Button>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
        {/* Undo Deleted Product Notification Banner */}
        {undoDeletedProduct && (
          <div className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-3 rounded-2xl flex items-center justify-between shadow-xs animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <RotateCw className="w-4 h-4 text-amber-700 animate-spin" />
              <span>
                Specification &ldquo;<strong>{undoDeletedProduct.name}</strong>&rdquo; was deleted from inventory.
              </span>
            </div>
            <button
              type="button"
              onClick={undoDeleteProduct}
              className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Undo Delete (10s)
            </button>
          </div>
        )}

        {/* Controls Toolbar: Search, Filters, Import/Export */}
        <div className="bg-white rounded-2xl border border-cream-border/90 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, thickness (e.g. Safarian, 18mm Plywood)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle focus:bg-white focus:border-amber-oak focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 px-3 text-xs bg-cream-surface/80 rounded-xl border border-cream-border text-charcoal font-semibold focus:outline-none"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 px-3 text-xs bg-cream-surface/80 rounded-xl border border-cream-border text-charcoal font-semibold focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            {/* Import / Export Buttons */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsImportModalOpen(true)}
              className="text-xs h-10 px-3"
              leftIcon={<Upload className="w-3.5 h-3.5" />}
            >
              Import CSV
            </Button>

            <Button
              variant="outline"
              size="sm"
              isLoading={isExporting}
              loadingText="Exporting..."
              onClick={handleExportCSV}
              className="text-xs h-10 px-3"
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Bulk Action Bar when rows are selected */}
        {selectedIds.length > 0 && (
          <div className="bg-[#0B241B] text-white p-3 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="w-6 h-6 rounded-lg bg-amber-oak text-white flex items-center justify-center text-xs">
                {selectedIds.length}
              </span>
              <span>products selected for bulk operations</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleBulkStatusChange("published")}
                className="text-xs py-1 h-8"
              >
                Publish All
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleBulkStatusChange("draft")}
                className="text-xs py-1 h-8"
              >
                Archive to Draft
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleBulkDelete}
                className="text-xs py-1 h-8"
              >
                Delete Selected
              </Button>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="text-xs text-white/70 hover:text-white underline ml-1"
              >
                Deselect
              </button>
            </div>
          </div>
        )}

        {/* Products Table / Cards List */}
        <div className="bg-white rounded-2xl border border-cream-border/90 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B241B] text-white uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-3 w-8">
                    <input
                      type="checkbox"
                      checked={filteredProducts.length > 0 && selectedIds.length === filteredProducts.length}
                      onChange={handleToggleSelectAll}
                      className="accent-amber-oak rounded"
                      aria-label="Select all products"
                    />
                  </th>
                  <th className="py-3.5 px-4 font-bold">Product Specification</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Thickness & Grade</th>
                  <th className="py-3.5 px-4 font-bold">Glue Bond</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-border/60">
                {filteredProducts.map((p) => {
                  const cat = categories.find((c) => c.id === p.category_id);
                  const img = p.images[0] || "/images/products/plywood-18mm-special.jpg";
                  const isSelected = selectedIds.includes(p.id);

                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-cream-surface/30 transition-colors ${
                        isSelected ? "bg-amber-50/40" : ""
                      }`}
                    >
                      <td className="py-3.5 px-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOne(p.id)}
                          className="accent-amber-oak rounded"
                          aria-label={`Select ${p.name}`}
                        />
                      </td>
                      {/* Product Name & Thumbnail */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-charcoal shrink-0 border border-cream-border/70">
                            <Image
                              src={img}
                              alt={p.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="font-display font-bold text-sm text-charcoal block truncate">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-charcoal-muted truncate block">
                              Slug: /{p.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-charcoal truncate block">
                          {cat?.name || p.category_name || "General Plywood"}
                        </span>
                      </td>

                      {/* Thickness & Grade */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <span className="font-bold text-charcoal block">
                            {p.specs.thickness.split(",")[0]}
                          </span>
                          <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                            {p.specs.grade}
                          </span>
                        </div>
                      </td>

                      {/* Glue Bond */}
                      <td className="py-3.5 px-4">
                        <span className="text-charcoal-muted font-medium truncate block max-w-[140px]">
                          {p.specs.glue_type}
                        </span>
                      </td>

                      {/* Status & Featured */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            type="button"
                            onClick={() =>
                              updateProduct(p.id, {
                                status: p.status === "published" ? "draft" : "published",
                              })
                            }
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                              p.status === "published"
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
                            }`}
                          >
                            {p.status}
                          </button>

                          {p.is_featured && (
                            <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-amber-600" />
                              <span>Featured</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/products/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-charcoal-subtle hover:text-charcoal hover:bg-cream-surface transition-colors"
                            title="Preview Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
                            title="Edit Specification"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete specification "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                            title="Delete"
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

            {filteredProducts.length === 0 && (
              <div className="p-8">
                <EmptyState
                  title="No Products Match Criteria"
                  description={
                    search || selectedCategory !== "all" || selectedStatus !== "all"
                      ? "Try clearing filters or search queries to view all inventory."
                      : "No products exist yet in the database. Add your first certified timber panel specification."
                  }
                  primaryAction={{
                    label: "Add New Product",
                    onClick: handleOpenCreate,
                    icon: <Plus className="w-4 h-4 mr-1" />,
                  }}
                  secondaryAction={
                    search || selectedCategory !== "all" || selectedStatus !== "all"
                      ? {
                          label: "Reset Filters",
                          onClick: () => {
                            setSearch("");
                            setSelectedCategory("all");
                            setSelectedStatus("all");
                          },
                        }
                      : undefined
                  }
                  compact
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create / Edit Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="4xl"
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-cream-border">
            <h3 className="font-display text-lg font-bold text-charcoal">
              {editingProduct ? `Edit: ${editingProduct.name}` : "Create New Timber Specification"}
            </h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="text-charcoal-subtle hover:text-charcoal p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Product Name */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g. Plywood (16mm / 18mm Special Product)"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            {/* Category Selector */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Product Category *</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Short Description */}
            <div className="md:col-span-2 space-y-1">
              <label className="font-bold text-charcoal block">Short Description</label>
              <input
                type="text"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Brief summary for product card..."
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            {/* Thickness Range */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Thickness Range</label>
              <input
                type="text"
                value={formData.thickness}
                onChange={(e) => setFormData({ ...formData, thickness: e.target.value })}
                placeholder="e.g. 18mm, 21mm (Calibrated)"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            {/* Standard Size */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Standard Dimensions</label>
              <input
                type="text"
                value={formData.standard_size}
                onChange={(e) => setFormData({ ...formData, standard_size: e.target.value })}
                placeholder="1220mm × 2440mm (4ft × 8ft)"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            {/* Grade Standard */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Grading Standard</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="Commercial & Structural Furniture Grade"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            {/* Glue Adhesive */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Adhesive / Glue Type</label>
              <input
                type="text"
                value={formData.glue_type}
                onChange={(e) => setFormData({ ...formData, glue_type: e.target.value })}
                placeholder="WBP Phenolic (72-hr Boil Test)"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            {/* Core Species */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Core Species & Quality</label>
              <input
                type="text"
                value={formData.core_species}
                onChange={(e) => setFormData({ ...formData, core_species: e.target.value })}
                placeholder="100% Solid Gurjan / Keruing (Zero Voids)"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            {/* Surface Finish */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Surface Finish</label>
              <input
                type="text"
                value={formData.surface_finish}
                onChange={(e) => setFormData({ ...formData, surface_finish: e.target.value })}
                placeholder="Calibrated Smooth Sanded Face"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            {/* Product Image Upload & Media Management */}
            <div className="md:col-span-2 space-y-3 p-4 rounded-xl bg-cream-surface/60 border border-cream-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="font-bold text-charcoal text-xs flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-oak" />
                    <span>Product Photography & Specification Imagery *</span>
                  </label>
                  <p className="text-[11px] text-charcoal-muted">
                    Upload timber surface photos, core cross-sections, or choose from your media library.
                  </p>
                </div>

                {/* Mode Selector Tabs */}
                <div className="inline-flex rounded-lg border border-cream-border p-0.5 bg-white shadow-2xs self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setImageTab("upload")}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors ${
                      imageTab === "upload"
                        ? "bg-[#0B241B] text-white shadow-xs"
                        : "text-charcoal-subtle hover:text-charcoal"
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab("media")}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors ${
                      imageTab === "media"
                        ? "bg-[#0B241B] text-white shadow-xs"
                        : "text-charcoal-subtle hover:text-charcoal"
                    }`}
                  >
                    Media Library ({media.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab("url")}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors ${
                      imageTab === "url"
                        ? "bg-[#0B241B] text-white shadow-xs"
                        : "text-charcoal-subtle hover:text-charcoal"
                    }`}
                  >
                    Direct URL
                  </button>
                </div>
              </div>

              {uploadError && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* TAB 1: File Upload Dropzone */}
              {imageTab === "upload" && (
                <div className="space-y-3">
                  {formData.imageUrl ? (
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-cream-border shadow-xs">
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-charcoal border border-cream-border shrink-0">
                        <img
                          src={formData.imageUrl}
                          alt="Primary preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-charcoal truncate">Primary Catalog Photograph</p>
                        <p className="text-[11px] text-charcoal-muted truncate font-mono">{formData.imageUrl}</p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1">
                          <Check className="w-3 h-3" /> Ready for catalog
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <label className="cursor-pointer px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-cream-surface hover:bg-cream-border text-charcoal border border-cream-border transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isUploading}
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(e.target.files[0], false);
                              }
                            }}
                          />
                          Change
                        </label>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: "" })}
                          className="p-1.5 rounded-lg text-charcoal-subtle hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Remove image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-amber-oak/40 hover:border-amber-oak rounded-xl p-5 text-center bg-white/70 transition-colors">
                      <input
                        type="file"
                        id="product-file-upload"
                        accept="image/*"
                        disabled={isUploading}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0], false);
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="product-file-upload"
                        className="cursor-pointer flex flex-col items-center justify-center gap-2 select-none"
                      >
                        {isUploading ? (
                          <div className="flex flex-col items-center gap-2 text-amber-oak py-2">
                            <Loader2 className="w-8 h-8 animate-spin" />
                            <span className="text-xs font-bold">Uploading specification image to server...</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-oak flex items-center justify-center">
                              <Upload className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-charcoal block">
                                Click to browse or drag &amp; drop product photo
                              </span>
                              <span className="text-[11px] text-charcoal-muted">
                                Supports JPG, PNG, WEBP, AVIF up to 25MB (saved to /api/uploads/products)
                              </span>
                            </div>
                          </>
                        )}
                      </label>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Media Library Picker */}
              {imageTab === "media" && (
                <div className="space-y-2 bg-white rounded-xl p-3 border border-cream-border">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-charcoal uppercase tracking-wider">
                      Select From Media Library ({media.length} files available)
                    </span>
                    {formData.imageUrl && (
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Image Selected
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1 scrollbar-thin">
                    {media.map((asset) => {
                      const isSelected = formData.imageUrl === asset.file_url;
                      return (
                        <button
                          key={asset.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: asset.file_url })}
                          className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                            isSelected
                              ? "border-[#C8832A] ring-2 ring-[#C8832A]/30 scale-[1.02]"
                              : "border-cream-border hover:border-amber-oak opacity-80 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={asset.file_url}
                            alt={asset.file_name}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-[#C8832A] text-white p-0.5 rounded-full shadow-xs">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: Direct URL */}
              {imageTab === "url" && (
                <div className="space-y-2">
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/images/products/plywood-18mm-special.jpg or CDN link"
                    className="w-full h-10 px-3 bg-white rounded-xl border border-cream-border text-charcoal font-medium focus:border-amber-oak focus:outline-none text-xs"
                  />
                  {formData.imageUrl && (
                    <div className="flex items-center gap-2 pt-1">
                      <div className="w-12 h-10 rounded-md overflow-hidden bg-charcoal border border-cream-border shrink-0">
                        <img src={formData.imageUrl} alt="preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] text-charcoal-muted truncate font-mono">{formData.imageUrl}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Secondary Gallery Angles Support */}
              <div className="pt-2 border-t border-cream-border/70 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-charcoal uppercase tracking-wider block">
                      Secondary Angles &amp; Cross-Sections ({galleryImages.length})
                    </span>
                    <span className="text-[10px] text-charcoal-muted">
                      Displayed on the product detail page photo rail
                    </span>
                  </div>
                  <label className="cursor-pointer text-[11px] font-bold text-amber-oak hover:underline flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Angle Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0], true);
                        }
                      }}
                    />
                  </label>
                </div>

                {galleryImages.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {galleryImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative shrink-0 w-20 aspect-[16/10] rounded-lg overflow-hidden border border-cream-border group"
                      >
                        <img src={imgUrl} alt={`Angle ${idx + 2}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0.5 left-0.5 text-[8px] font-bold text-white bg-black/70 px-1 rounded">
                          Angle {idx + 2}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGalleryImages((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove angle"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Applications List */}
            <div className="md:col-span-2 space-y-1">
              <label className="font-bold text-charcoal block">Applications (comma-separated)</label>
              <input
                type="text"
                value={formData.applications}
                onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                placeholder="Civil Formwork, Bridge Decks, Marine Boatbuilding"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            {/* Status & Featured Toggles */}
            <div className="md:col-span-2 flex items-center justify-between p-3 rounded-xl bg-cream-surface/80 border border-cream-border">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-charcoal">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span>Flagship Spec (Feature on Homepage)</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="font-bold text-charcoal text-xs">Publish State:</span>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Product["status"] })}
                  className="h-8 px-2.5 text-xs bg-white rounded-lg border border-cream-border font-bold text-charcoal"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            {/* Duplicate SKU / Name Warning Alert */}
            {skuError && (
              <div className="md:col-span-2 p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{skuError}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-cream-border flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="amber" size="sm" className="font-bold">
              {editingProduct ? "Save Specification" : "Add to Inventory"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* CSV Import Modal with Progress & Row-by-Row Error Log */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Plywood Specifications (CSV / Excel)"
        maxWidth="lg"
      >
        <div className="space-y-5 text-xs">
          <p className="text-charcoal-muted leading-relaxed">
            Batch-upload product specifications into Addis Ababa central catalog. Download our standardized CSV template with calibrated thickness and WBP glue columns.
          </p>

          <div className="p-4 rounded-2xl border-2 border-dashed border-cream-border bg-cream-surface/40 text-center space-y-3">
            <Upload className="w-8 h-8 text-amber-oak mx-auto" />
            <div>
              <span className="font-bold text-sm text-charcoal block">
                Drag &amp; drop your contractor inventory sheet (.csv, .xlsx)
              </span>
              <span className="text-[11px] text-charcoal-subtle">
                Supports up to 5,000 product rows per batch
              </span>
            </div>

            <Button
              variant="dark"
              size="sm"
              isLoading={isImporting}
              loadingText={`Validating Rows (${importProgress}%)...`}
              onClick={handleStartImport}
              className="text-xs font-bold"
            >
              Start Simulated CSV Validation
            </Button>
          </div>

          {/* Progress Bar */}
          {importProgress > 0 && (
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-charcoal text-[11px]">
                <span>Validation &amp; Ingestion Progress</span>
                <span>{importProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-cream-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-forest transition-all duration-300 rounded-full"
                  style={{ width: `${importProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Row-by-Row Partial Errors List */}
          {importErrors.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Partial Validation Diagnostics ({importErrors.length} notices)</span>
              </div>
              <ul className="space-y-1 text-amber-800 text-[11px]">
                {importErrors.map((err, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span>•</span>
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
              <span className="text-[10px] text-amber-700 block mt-1">
                All other 7 specification rows passed validation and are ready to import.
              </span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-3 border-t border-cream-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsImportModalOpen(false);
                setImportProgress(0);
                setImportErrors([]);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

