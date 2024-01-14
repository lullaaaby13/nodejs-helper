const INDEX_NOT_FOUND = -1;
const EMPTY = '';

export const substringBefore = (value: string, separator: string): string => {
    if (!value || separator === null || separator === undefined) {
        return value;
    }
    if (separator.length === 0) {
        return EMPTY;
    }
    const index = value.indexOf(separator);
    if (index === INDEX_NOT_FOUND) {
        return value;
    }
    return value.substring(0, index);
}

export const substringAfter = (value: string, separator: string): string => {
    if (!value) {
        return value;
    }
    const index = value.indexOf(separator);
    if (index === INDEX_NOT_FOUND) {
        return EMPTY;
    }
    return value.substring(index + separator.length);
}

export const substringBeforeLast = (value: string, separator: string): string => {
    if (!value || !separator) {
        return value;
    }
    const index = value.lastIndexOf(separator);
    if (index === INDEX_NOT_FOUND) {
        return value;
    }
    return value.substring(0, index);
}

export const substringAfterLast = (value: string, separator: string): string => {
    if (!value) {
        return value;
    }
    if (!separator) {
        return EMPTY;
    }
    const index = value.lastIndexOf(separator);
    if (index === INDEX_NOT_FOUND || index === value.length - separator.length) {
        return EMPTY;
    }
    return value.substring(index + separator.length);
}

export const substringBetween = (value: string, open: string, close: string): string => {
    if (!value || !open || !close) {
        return EMPTY;
    }

    const start = value.indexOf(open);
    if (start !== INDEX_NOT_FOUND) {
        const end = value.indexOf(close, start + open.length);
        if (end !== INDEX_NOT_FOUND) {
            return value.substring(start + open.length, end);
        }
    }
    return EMPTY;
}