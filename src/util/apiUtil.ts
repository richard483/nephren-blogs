export function normalizedPath(path: string): string {
    return path.replace(/ /g, '%20');
}

export function denormalizedPath(path: string): string {
    return path.replace(/%20/g, ' ');
}
