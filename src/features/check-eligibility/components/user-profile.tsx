import { useEligibility } from "../context/eligibility-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Briefcase, DollarSign } from "lucide-react";

export const UserProfile = () => {
  const { state } = useEligibility();
  const { userDetails } = state;

  if (!userDetails) {
    return null;
  }

  const formatDateOfBirth = () => {
    const { day, month, year } = userDetails.dateOfBirth;
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const calculateAge = () => {
    const { day, month, year } = userDetails.dateOfBirth;
    const birthDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Your Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Personal Details
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium">
                  {userDetails.title} {userDetails.firstName}{" "}
                  {userDetails.lastName}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Date of Birth</div>
                <div className="font-medium">
                  {formatDateOfBirth()} ({calculateAge()} years old)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{userDetails.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Phone className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Mobile</div>
                <div className="font-medium">{userDetails.mobile}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Address & Employment
            </h3>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                <MapPin className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Address</div>
                <div className="font-medium">
                  {userDetails.houseNumber} {userDetails.address}
                </div>
                <div className="text-sm text-gray-600">
                  {userDetails.postcode}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Employment Status</div>
                <div className="font-medium">
                  <Badge variant="outline" className="mt-1">
                    {userDetails.employmentStatus}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Annual Income</div>
                <div className="font-medium">
                  £{userDetails.annualIncome.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
