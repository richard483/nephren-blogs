export function normalizedPath(path: string): string {
    return path.replace(/ /g, '%20');
}
