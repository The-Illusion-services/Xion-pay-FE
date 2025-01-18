import { Label } from "@/src/components/ui/label";
import Milestone from "../milestone";
import { Input } from "@/src/components/illusion-ui/input/input";

export default function MilestoneForm({
  index,
  register,
  formState,
}: {
  index: number;
  register: any;
  formState: any;
}) {
  return (
    <div className="flex" key={index}>
      <Milestone />
      <div className="w-full">
        <div className="grid w-full items-center gap-y-6">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor={`milestone${index + 1}Title`}>
              Milestone {index + 1}
            </Label>
            <Input
              id={`milestone${index + 1}Title`}
              placeholder="Milestone title"
              className=""
              {...register(`milestone${index + 1}Title`)}
            />
            {formState.errors[`milestone${index + 1}Title`]?.message && (
              <p className="text-red-500 text-xs">
                {formState.errors[
                  `milestone${index + 1}Title`
                ]?.message?.toString() || (index + 1 === 2 ? formState.errors.milestone2Amount.message : null )}

              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor={`milestone${index + 1}Amount`}>Amount</Label>

            <Input
              id={`milestone${index + 1}Amount`}
              placeholder="Amount"
              {...register(`milestone${index + 1}Amount`)}
            />
            {formState.errors[`milestone${index + 1}Amount`]?.message && (
              <p className="text-red-500 text-xs">
                {formState.errors[
                  `milestone${index + 1}Amount`
                ]?.message?.toString() || (index + 1 === 2 ? formState.errors.milestone2Title.message : null )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
