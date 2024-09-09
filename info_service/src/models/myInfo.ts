import joi from "joi";

export interface MyInfo {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    summary?: string;
    mobileNumber: string;
    address: string;
    urls: UrlInfo[];
    skills: string[];
    hobbies: string[];
}

export interface UrlInfo {
    label: string;
    url: string;
}

const UrlInfoSchema = joi.object({
    label: joi.string().required(),
    url: joi.string().uri().required(),
});

export const MyInfoSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    dateOfBirth: joi.string().isoDate().required(),
    summary: joi.string(),
    mobileNumber: joi
        .string()
        .pattern(/^(?:\+91|91)?[6-9]\d{9}$/, "Indian phone number")
        .required()
        .messages({
            "string.pattern.name":
                '"mobileNumber" must be a valid Indian phone number',
            "any.required": '"mobileNumber" is a required field',
        }),
    address: joi.string().required(),
    urls: joi.array().items(UrlInfoSchema).required(),
    skills: joi.array<string>().required(),
    hobbies: joi.array<string>().required(),
});
