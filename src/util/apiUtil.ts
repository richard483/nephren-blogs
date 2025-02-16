export function normalizedPath(path: string): string {
    if (!path) {
        return "";
    }
    return encodeURIComponent(path.trim());
}

export function denormalizedPath(path: string): string {
    if (!path) {
        return "";
    }
    try {
        return decodeURIComponent(path);
    } catch {
        return path;
    }
}
