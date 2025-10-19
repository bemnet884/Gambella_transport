// components/forms/vehicle/SubmissionSummary.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { VehicleFormData } from "@/zod";
import { CheckCircle, Download, Printer, Share2, Car, User, IdCard, Building } from "lucide-react";

interface SubmissionSummaryProps {
  data: VehicleFormData;
}

export default function SubmissionSummary({ data }: SubmissionSummaryProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vehicle-registration-${data.registration.plateNumber || 'data'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-green-600">✅ Form Submitted Successfully!</h1>
        <p className="text-gray-600 text-lg">
          Your vehicle registration has been received and is being processed.
        </p>
        <Badge variant="secondary" className="text-sm">
          Reference: {data.registration.plateNumber || data.description.chassisNumber}
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={handlePrint} variant="outline" className="gap-2">
          <Printer className="h-4 w-4" />
          Print Summary
        </Button>
        <Button onClick={handleDownload} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download Data
        </Button>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button onClick={() => window.location.reload()} className="gap-2">
          <Car className="h-4 w-4" />
          Register Another Vehicle
        </Button>
      </div>

      <Separator />

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Vehicle Information */}
        <Card>
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Vehicle Information
            </CardTitle>
            <CardDescription>Basic vehicle details and specifications</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Type:</span>
                <p className="text-muted-foreground">{data.description.vehicleType}</p>
              </div>
              <div>
                <span className="font-semibold">Make & Model:</span>
                <p className="text-muted-foreground">{data.description.make} {data.description.model}</p>
              </div>
              <div>
                <span className="font-semibold">Year:</span>
                <p className="text-muted-foreground">{data.description.manufacturedYear}</p>
              </div>
              <div>
                <span className="font-semibold">Color:</span>
                <p className="text-muted-foreground">{data.description.color}</p>
              </div>
              <div>
                <span className="font-semibold">Chassis No:</span>
                <p className="text-muted-foreground font-mono">{data.description.chassisNumber}</p>
              </div>
              <div>
                <span className="font-semibold">Engine No:</span>
                <p className="text-muted-foreground font-mono">{data.description.engineNumber}</p>
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Body Type:</span>
                <p className="text-muted-foreground">{data.description.bodyType}</p>
              </div>
            </div>

            {/* Engine Specifications */}
            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Engine Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Capacity:</span>
                  <p className="text-muted-foreground">{data.description.engineCapacity} cc</p>
                </div>
                <div>
                  <span className="font-medium">Fuel Type:</span>
                  <p className="text-muted-foreground">{data.description.fuelType}</p>
                </div>
                <div>
                  <span className="font-medium">Cylinders:</span>
                  <p className="text-muted-foreground">{data.description.numberOfCylinders}</p>
                </div>
                <div>
                  <span className="font-medium">Horse Power:</span>
                  <p className="text-muted-foreground">{data.description.brakeHorsePower} BHP</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Details */}
        <Card>
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2">
              <IdCard className="h-5 w-5" />
              Registration Details
            </CardTitle>
            <CardDescription>Official registration information</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="text-center p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border">
              <div className="text-2xl font-bold text-gray-900 tracking-wider">
                {data.registration.plateNumber}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                License Plate Number
              </div>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">Office Code:</span>
                <span className="font-mono">{data.registration.officeCode}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">Code Number:</span>
                <span className="font-mono">{data.registration.codeNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owner Information */}
        <Card>
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Owner Information
            </CardTitle>
            <CardDescription>Vehicle owner details</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="text-center">
              <div className="text-xl font-semibold">{data.owner.name}</div>
              <Badge variant="outline" className="mt-1">
                Special Reg: {data.owner.specialRegNumber}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Region:</span>
                <span>{data.owner.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">City:</span>
                <span>{data.owner.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Kebele:</span>
                <span>{data.owner.kebele}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">House No:</span>
                <span>{data.owner.houseNo}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Possessor Information */}
        <Card>
          <CardHeader className="bg-amber-50">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Possessor Information
            </CardTitle>
            <CardDescription>Current vehicle possessor</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="text-center">
              <div className="text-xl font-semibold">{data.possessor.name}</div>
              <Badge variant="outline" className="mt-1">
                Special Reg: {data.possessor.specialRegNumber}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Region:</span>
                <span>{data.possessor.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">City:</span>
                <span>{data.possessor.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Kebele:</span>
                <span>{data.possessor.kebele}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">House No:</span>
                <span>{data.possessor.houseNo}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Details */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold">Gross Weight</div>
              <div className="text-muted-foreground">{data.description.grossVehicleWeight} kg</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold">Tare Weight</div>
              <div className="text-muted-foreground">{data.description.tareWeight} kg</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold">Payload</div>
              <div className="text-muted-foreground">{data.description.payLoad} kg</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold">Axles</div>
              <div className="text-muted-foreground">{data.description.numberOfAxles}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Next Steps</CardTitle>
          <CardDescription className="text-blue-700">
            What to expect after submission
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <div className="font-semibold">Verification Process</div>
                <div className="text-muted-foreground">Your submission will be reviewed within 2-3 business days</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <div className="font-semibold">Document Collection</div>
                <div className="text-muted-foreground">You'll receive a notification when your documents are ready for collection</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <div className="font-semibold">Plate Issuance</div>
                <div className="text-muted-foreground">License plates will be issued upon completion of all verifications</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}