import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OtherNames() {
  const [otherNames, setOtherNames] = useState([
    {
      id: 1,
      type: "Maiden Name",
      firstName: "Rose",
      middleInitial: "M",
      lastName: "Smith",
      effectiveDate: "2019-01-01",
      expiryDate: "2024-01-01",
    },
  ]);

  const addOtherName = () => {
    const newId = Math.max(...otherNames.map((n) => n.id), 0) + 1;
    setOtherNames([
      ...otherNames,
      {
        id: newId,
        type: "",
        firstName: "",
        middleInitial: "",
        lastName: "",
        effectiveDate: "",
        expiryDate: "",
      },
    ]);
  };

  const deleteOtherName = (id: number) => {
    setOtherNames(otherNames.filter((n) => n.id !== id));
  };

  return (
    <div className="p-6 bg-white">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Other Names</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={addOtherName}
            className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Plus size={14} className="mr-2" />
            Add Name
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Type</TableHead>
              <TableHead className="text-xs">First Name</TableHead>
              <TableHead className="text-xs">Middle Initial</TableHead>
              <TableHead className="text-xs">Last Name</TableHead>
              <TableHead className="text-xs">Effective Date</TableHead>
              <TableHead className="text-xs">Expiry Date</TableHead>
              <TableHead className="text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {otherNames.map((name) => (
              <TableRow key={name.id}>
                <TableCell>
                  <Input
                    value={name.type}
                    className="h-7 text-xs border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={name.firstName}
                    className="h-7 text-xs border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={name.middleInitial}
                    className="h-7 text-xs border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={name.lastName}
                    className="h-7 text-xs border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="date"
                    value={name.effectiveDate}
                    className="h-7 text-xs border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="date"
                    value={name.expiryDate}
                    className="h-7 text-xs border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <Edit size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-600"
                      onClick={() => deleteOtherName(name.id)}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
