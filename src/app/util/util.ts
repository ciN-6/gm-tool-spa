export function transformIntoKey(name: string | undefined): string {
    if (!name) return "";
    let newName = name.toLowerCase().replaceAll(" ", "-");
    return newName
}