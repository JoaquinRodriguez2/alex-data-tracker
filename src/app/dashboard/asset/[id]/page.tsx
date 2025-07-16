"use client";
import React, { useEffect, useState } from "react";
import { useEditableState } from "@/utils/EditableState";
import { useGetEquipmentData } from "./hooks/useGetEquipmentData";
import AssetForm from "./ui/Form";
import { EquipmentDetails } from "./types";
import { useGetListOfTemplates } from "./hooks/useGetListOfTemplates";
import { useGetAssetChildren } from "./hooks/useGetAssetChildren";
import { AssetTable } from "./ui/AssetTable";
import { getParentIdByChildId } from "./calls/getParentRelationByChildId";
import { useRouter } from "next/navigation"; // Or use react-router-dom if not Next.js
import { EquipmentTreeDialog } from "./test/TreeHierarchyView";

export default function AssetPage({ params }: { params: Promise<{ id: string }> }) {
    const { isEditable, setIsEditable } = useEditableState(true);
    const { id } = React.use(params);
    const { templates, loading: templateListLoading, error: templateListError } = useGetListOfTemplates("");
    const { children} = useGetAssetChildren(id);
    const [parentEq, setParentEq] = React.useState<string | null>(null);
    const router = useRouter();
    const [hierarchyOpen, setHierarchyOpen] = useState(false);


    const {
    equipmentDetails,
    isLoading: loading,
  } = useGetEquipmentData(id);


    const goToParentById = (parentId: string) => {
        router.push(`/asset/${parentId}`);
    }
    return (
        <div className="m-10 p-5 rounded-lg bg-white shadow-md">
            <EquipmentTreeDialog
                open={hierarchyOpen}
                onOpenChange={setHierarchyOpen}
                equipmentId={id}
            />
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="text-gray-500">Loading...</span>
                </div>
            ) : (
                <>
                  <div className="flex justify-end mb-4">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      onClick={() => setHierarchyOpen(true)}
                    >
                      Ver Jerarquía
                    </button>
                  </div>
                  <AssetForm
                      isEditable={isEditable}
                      setIsEditable={setIsEditable}
                      equipmentDetails={equipmentDetails as EquipmentDetails}
                      listOfTemplates={templates.map(t => ({
                        value: String(t.value),
                        label: t.label
                      }))}
                      isTemplatesListLoading={templateListLoading}
                      isTemplatesListError={templateListError ? true : false}
                      parentEq={null}
                  />
                  <div className="pt-5">
                      <AssetTable
                          data={children}
                          editing={!isEditable}
                          onEdit={(id, field, value) => {
                              console.log("Edit action", id, field, value);
                              // Implement your edit logic here
                          }}
                      />
                  </div>
                </>
            )}
        </div>
    );
}
