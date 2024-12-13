export function updateJson(jsonObj: Record<string, any>, key: string, value: any): Record<string, any> {
    return {
        ...jsonObj,
        [key]: value
    };
}