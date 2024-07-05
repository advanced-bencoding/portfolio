export interface MyInfo {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    summary?: string;
    mobileNumber: string;
    address: string;
    urls: UrlInfo[];
}

export interface UrlInfo {
    label: string;
    url: string;
}
