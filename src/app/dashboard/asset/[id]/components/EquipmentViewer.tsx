import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EquipmentChildren {
  id?: string;
  serial_number?: string;
  part_number?: string | null;
  name?: string;
  revision?: string | null;
  main_equipment?: boolean;
  children?: EquipmentChildren[];
}

interface EquipmentRowProps {
  equipment: EquipmentChildren ;
  depth: number;
  index: number;
}

const EquipmentRow: React.FC<EquipmentRowProps> = ({ equipment, depth, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = equipment.children && equipment.children.length > 0;

  const toggleExpanded = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };



  const getSubAssembly = () => {
    if (hasChildren) return 'List SubAssy';
    if (equipment.main_equipment) return 'Assembly Measurements';
    return '';
  };

  return (
    <>
      <tr className="border-b border-gray-300 hover:bg-gray-50">
        <td className="p-2 border-r border-gray-300">
          <div className="flex items-center" style={{ paddingLeft: `${depth * 20}px` }}>
            {hasChildren ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpanded}
                className="h-4 w-4 p-0 mr-2"
              >
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </Button>
            ) : (
              <div className="w-4 mr-2" />
            )}
            <div className="text-sm">
              <div className="font-medium">{equipment.part_number || 'N/A'} -- {equipment.name}</div>
            </div>

          </div>
        </td>
        <td className="p-2 text-center border-r border-gray-300 bg-gray-100 font-medium">
          {equipment.revision || 'N/A'}
        </td>
        <td className="p-2 text-center border-r border-gray-300 font-medium">
          <button
            type="button"
            className="text-blue-600 underline cursor-pointer"
            onClick={() => console.log("Serial number clicked:", equipment.serial_number)}
          >
            {equipment.serial_number || 'N/A'}
          </button>
        </td>

        <td className="p-2 border-r border-gray-300">
          <div className="flex items-center justify-between">
            <span className="text-blue-600 underline cursor-pointer text-sm">
              {getSubAssembly()}
            </span>

          </div>
        </td>
      </tr>
      {isExpanded && hasChildren && (
        <>
          {equipment.children.map((child, childIndex) => (
            <EquipmentRow
              key={child.id}
              equipment={child}
              depth={depth + 1}
              index={childIndex}
            />
          ))}
        </>
      )}
    </>
  );
};

interface EquipmentViewerProps {
  equipmentData: EquipmentChildren;
}

const EquipmentViewer: React.FC<EquipmentViewerProps> = ({ equipmentData }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-0 w-full h-full">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left font-medium border-r border-gray-300 text-sm">Component / Module / Sub-Assembly</th>
                <th className="p-2 text-left font-medium border-r border-gray-300 text-sm">Revision</th>
                <th className="p-2 text-left font-medium border-r border-gray-300 text-sm">SN/TN/PN</th>
                <th className="p-2 text-left font-medium border-r border-gray-300 text-sm">Measurements</th>
                <th className="p-2 text-left font-medium text-sm">SubAssembly</th>
              </tr>
            </thead>
            <tbody>
              <EquipmentRow equipment={equipmentData} depth={0} index={0} />
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentViewer;
