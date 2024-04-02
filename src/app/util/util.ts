export function transformIntoKey(name: string): string {
    let newName = name.toLowerCase().replaceAll(" ", "-");
    return newName
}