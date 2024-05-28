export const VALIDATION_UTILITIES = {
    isUndefinedOrEmpty: (str?: string): boolean =>
        str === undefined || str.length === 0,
    isInvalidIsoString: (str?: string): boolean => {
        // check if undefined
        if (str === undefined) return true;

        // check if not iso string with regex
        const iso8601Regex =
            /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))$/;
        if (!iso8601Regex.test(str)) {
            return true;
        }

        // check to ensure the string can be parsed into a valid date
        try {
            const date = new Date(str);
            return date.toISOString() !== str;
        } catch (_) {
            return true;
        }
    },
};
