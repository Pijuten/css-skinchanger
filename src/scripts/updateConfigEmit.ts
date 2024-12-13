type Pair<T, U> = [T, U];

export function emitKeyValue(key: string, value: string):Pair<string, string>{
    return [key,value];
}