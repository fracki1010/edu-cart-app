import { useForm } from "@tanstack/react-form";
import React from "react";

interface Field {
  name: string;
  label: string;
  type?: string;
}

interface AuthFormProps {
  onSubmit: (data: Record<string, string>) => Promise<void>;
  fields: Field[];
  submitLabel: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  fields,
  submitLabel,
}) => {
  const form = useForm({
    defaultValues: Object.fromEntries(fields.map((f) => [f.name, ""])),
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">{submitLabel}</h2>

      {fields.map((field) => (
        <form.Field key={field.name} name={field.name}>
          {(fieldApi) => (
            <div className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-gray-700 mb-1 font-medium"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type || "text"}
                value={fieldApi.state.value}
                onChange={(e) => fieldApi.handleChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          )}
        </form.Field>
      ))}

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition-all"
      >
        {submitLabel}
      </button>
    </form>
  );
};
