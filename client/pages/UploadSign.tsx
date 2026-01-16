import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

function FormField({
  label,
  isMandatory,
  children,
  className,
}: {
  label: string;
  isMandatory?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-4 items-start", className)}>
      <label className="w-40 flex-shrink-0 font-medium text-gray-700 text-sm pt-2">
        {label}
        {isMandatory && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-gray-900 pb-3 border-b border-gray-300">
        {title}
      </h3>
    </div>
  );
}

interface SignRecord {
  id: string;
  name: string;
  signature: string;
  signatureFile?: File;
}

export default function UploadSign() {
  const [signs, setSigns] = useState<SignRecord[]>([]);
  const [selectedSign, setSelectedSign] = useState<SignRecord | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formState, setFormState] = useState<Partial<SignRecord>>({
    name: "",
    signature: "",
    signatureFile: undefined,
  });

  const [fileError, setFileError] = useState("");

  const handleSelectSign = (sign: SignRecord) => {
    setSelectedSign(sign);
    setFormState({
      name: sign.name,
      signature: sign.signature,
      signatureFile: sign.signatureFile,
    });
    setFileError("");
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setSelectedSign(null);
    setFormState({
      name: "",
      signature: "",
      signatureFile: undefined,
    });
    setFileError("");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target.files?.[0];

    if (file) {
      const allowedFormats = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/x-jpe",
      ];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const allowedExtensions = ["gif", "jpg", "jpeg", "jpe", "png"];

      if (
        !allowedFormats.includes(file.type) &&
        !allowedExtensions.includes(fileExtension || "")
      ) {
        setFileError(
          "Please choose file with the format .gif, .jpg, .jpeg, .jpe or .png only.",
        );
        return;
      }

      setFormState({
        ...formState,
        signature: file.name,
        signatureFile: file,
      });
    }
  };

  const handleUploadSign = () => {
    if (!formState.name || !formState.signatureFile) {
      return;
    }

    setIsUploading(true);

    if (selectedSign) {
      // Update existing sign
      setSigns(
        signs.map((s) =>
          s.id === selectedSign.id
            ? {
                ...s,
                name: formState.name,
                signature: formState.signature,
                signatureFile: formState.signatureFile,
              }
            : s,
        ),
      );
    } else {
      // Add new sign
      const newSign: SignRecord = {
        id: Date.now().toString(),
        name: formState.name || "",
        signature: formState.signature || "",
        signatureFile: formState.signatureFile,
      };
      setSigns([...signs, newSign]);
    }

    setTimeout(() => {
      setIsUploading(false);
      setIsAddingNew(false);
      setSelectedSign(null);
      setFormState({
        name: "",
        signature: "",
        signatureFile: undefined,
      });
      setFileError("");
    }, 1000);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setSelectedSign(null);
    setFormState({
      name: "",
      signature: "",
      signatureFile: undefined,
    });
    setFileError("");
  };

  const handleDeleteSign = (id: string) => {
    setSigns(signs.filter((s) => s.id !== id));
    if (selectedSign?.id === id) {
      handleCancel();
    }
  };

  const isFormVisible = isAddingNew || selectedSign;

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-8 max-w-6xl">
          {/* Sign List Table Section */}
          <div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Name
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Signature
                    </th>
                    <th className="text-center text-sm font-semibold text-gray-900 px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {signs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-6 text-center text-gray-500 text-sm"
                      >
                        No signatures added
                      </td>
                    </tr>
                  ) : (
                    signs.map((sign) => (
                      <tr
                        key={sign.id}
                        className={cn(
                          "border-b border-gray-200 hover:bg-gray-50 cursor-pointer",
                          selectedSign?.id === sign.id && "bg-blue-50",
                        )}
                        onClick={() => handleSelectSign(sign)}
                      >
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {sign.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {sign.signature}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSign(sign.id);
                            }}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add New Button */}
          {!isFormVisible && (
            <div className="flex justify-end">
              <Button
                onClick={handleAddNew}
                className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
              >
                Add
              </Button>
            </div>
          )}

          {/* Upload Sign Form Section */}
          {isFormVisible && (
            <div>
              <SectionHeader title="Upload Sign" />

              <div className="mb-6">
                <FormField label="Name" isMandatory>
                  <Input
                    placeholder="Enter name"
                    value={formState.name || ""}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                  />
                </FormField>
              </div>

              <div className="mb-6">
                <FormField label="Select Signature" isMandatory>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        id="signature-file"
                        accept=".gif,.jpg,.jpeg,.jpe,.png"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <label htmlFor="signature-file">
                        <Button
                          asChild
                          className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
                        >
                          <span>Choose File</span>
                        </Button>
                      </label>
                      {formState.signature && (
                        <span className="text-sm text-gray-700">
                          {formState.signature}
                        </span>
                      )}
                    </div>
                    {fileError && (
                      <div className="text-sm text-red-600">{fileError}</div>
                    )}
                    <div className="text-xs text-gray-500">
                      Please choose file with the format .gif, .jpg, .jpeg,
                      .jpe or .png only.
                    </div>
                  </div>
                </FormField>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {isFormVisible && (
            <div className="mt-12 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex justify-end gap-3">
                <Button variant="cancel" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={handleUploadSign}
                  disabled={
                    isUploading || !formState.name || !formState.signatureFile
                  }
                  className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
                >
                  {isUploading ? "Uploading..." : "Upload Sign"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
