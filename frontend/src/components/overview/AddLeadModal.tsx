import { useForm } from "react-hook-form";
import { useAddLeadMutation } from "../../store/apiSlice";
import { Input } from "../Input";
import { Button } from "../Button";
import { Select } from "../Select";
import {
  UserIcon,
  BuildingIcon,
  EmailIcon,
  CloseIcon,
  StatusIcon,
} from "../icons";

type LeadFormValues = {
  name: string;
  company: string;
  email: string;
  lead_status: "Active" | "Inactive";
};

export default function AddLeadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [addLead, { isLoading }] = useAddLeadMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LeadFormValues>({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      lead_status: "Active",
    },
    mode: "onChange",
  });

  if (!open) return null;

  const onSubmit = async (data: LeadFormValues) => {
    try {
      await addLead(data).unwrap();
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to add lead:", error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Add New Lead</h3>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-1">
            Fill in the lead information below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-1">
          {/* Name Field */}
          <Input
            label="Full Name"
            icon={<UserIcon className="w-5 h-5 text-gray-400" />}
            placeholder="Enter full name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            error={errors.name}
          />

          {/* Company Field */}
          <Input
            label="Company"
            icon={<BuildingIcon className="w-5 h-5 text-gray-400" />}
            placeholder="Enter company name"
            {...register("company", {
              required: "Company is required",
              minLength: {
                value: 2,
                message: "Company name must be at least 2 characters",
              },
            })}
            error={errors.company}
          />

          {/* Email Field */}
          <Input
            label="Email Address"
            type="email"
            icon={<EmailIcon className="w-5 h-5 text-gray-400" />}
            placeholder="Enter email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })}
            error={errors.email}
          />

          {/* Status Field */}
          <Select
            label="Lead Status"
            icon={<StatusIcon className="w-5 h-5 text-gray-400" />}
            options={statusOptions}
            {...register("lead_status")}
            error={errors.lead_status}
          />

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              disabled={!isValid || isLoading}
              className="flex-1"
            >
              Add Lead
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
