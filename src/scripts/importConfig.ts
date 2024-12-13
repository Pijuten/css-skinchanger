import {
    writeTextFile,
    exists,
    readTextFile,
    mkdir,
    BaseDirectory,
} from '@tauri-apps/plugin-fs';

async function ensureDirectoryExists(): Promise<void> {
    const doesExist = await exists('config', {
        baseDir: BaseDirectory.AppConfig,
    });
    if (!doesExist) {
        await mkdir('config', {
            baseDir: BaseDirectory.AppConfig,
            recursive: true,
        });
    }
}

async function checkIfExist(): Promise<boolean> {
    return await exists('config/config.json', {
        baseDir: BaseDirectory.AppConfig,
    });
}

async function readConfig(): Promise<Record<string, any>> {
    await ensureDirectoryExists(); // Ensure the directory exists

    const doesExist = await checkIfExist(); // Check if the file exists
    if (!doesExist) {
        const contents:string="{}";
        await writeTextFile('config/config.json', contents, {
            baseDir: BaseDirectory.AppConfig,
        });

        return JSON.parse(contents); // Return the newly created JSON object
    } else {
        const configContents = await readTextFile('config/config.json', {
            baseDir: BaseDirectory.AppConfig,
        });
        return JSON.parse(configContents); // Return the parsed JSON object
    }
}

export const loadConfig: () => Promise<Record<string, any>> = async () => {
    return await readConfig(); // Call the corrected readConfig function
};
