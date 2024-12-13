import { writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
export async function  writeToConfig(config: Record<string, any>){
    await writeTextFile('config/config.json', JSON.stringify(config,null,2), {
        baseDir: BaseDirectory.AppConfig,
      });
}