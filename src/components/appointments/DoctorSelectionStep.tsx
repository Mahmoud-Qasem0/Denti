import { useAvailabeDoctors } from "@/hooks/use-doctors";
import { FC, JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DoctorCardsLoading from "./DoctorCardsLoading";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface DoctorSelectionStepProps {
  selectedDentistId: string | null;
  onContinue: () => void;
  onSelectedDentist: (dentistId: string) => void;
}

const DoctorSelectionStep: FC<DoctorSelectionStepProps> = ({
  selectedDentistId,
  onContinue,
  onSelectedDentist,
}): JSX.Element => {
  const { data: dentists = [], isLoading } = useAvailabeDoctors();

  if (isLoading)
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Choose Your Dentist</h2>
        <DoctorCardsLoading />
      </div>
    );

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold">Choose Your Dentist</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dentists.map((dentist) => (
          <Card
            key={dentist.id}
            className={`cursor-pointer transition-all shadow-lg ${
              selectedDentistId !== null && selectedDentistId === dentist.id
                ? "ring-4 ring-primary"
                : ""
            }`}
            onClick={() => onSelectedDentist(dentist.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-6">
                <Image
                  className="w-16 h-16 rounded-full object-cover"
                  src={dentist.imageUrl!}
                  alt="Dentist Image"
                  width={70}
                  height={70}
                />
                <div className="flex-1">
                  <CardTitle className="text-lg">{dentist.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {dentist.speciality || "General Dentistry"}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="size-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({dentist.appointmentCount} appointments)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="w-4 h-4" />
                <span>Denti</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="w-4 h-4" />
                <span>{dentist.phone}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {dentist.bio ||
                  "Experienced dental professional providing quality care."}
              </p>
              <Badge variant="secondary">Licensed Professional</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedDentistId && (
        <div className="flex justify-end mt-4">
          <Button onClick={onContinue}>Continue to Time Selection</Button>
        </div>
      )}
    </div>
  );
};

export default DoctorSelectionStep;
