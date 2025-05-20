import type AnamnesysForm from "~/types/anamnesys";

export default interface FormFieldConfig {
    name: keyof AnamnesysForm;
    value: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
    options?: string[];
    required?: boolean;
    placeholder?: string;
    validation?: (value: string | boolean) => boolean; // Validation function returning error message or null
}